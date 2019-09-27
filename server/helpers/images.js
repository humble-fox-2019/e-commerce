require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;

const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT,
	keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = (filename) => {
	return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
};
const sendUploadToGCS = (req, res, next) => {
	console.log(5);
	if (!req.file) {
		console.log('here, 6');
		return next();
	}
	const gcsname = Date.now() + req.file.originalname;
	const file = bucket.file(gcsname);
	console.log(6, '<<<<');
	const stream = file.createWriteStream({
		metadata: {
			contentType: req.file.mimetype
		}
	});
console.log(7);
	stream.on('error', (err) => {
		req.file.cloudStorageError = err;
		console.log(err);
		next(err);
	});

	stream.on('finish', () => {
		console.log(8);
		req.file.cloudStorageObject = gcsname;
		// console.log(6);
		file.makePublic().then(() => {
			req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
			req.body.fileName = gcsname;
			req.body.image = getPublicUrl(gcsname);
			next();
		});
	});
	stream.end(req.file.buffer);
};

const Multer = require('multer'),
multer = Multer({
	storage: Multer.MemoryStorage,
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	fileFilter: function(req, file, cb) {
		console.log(4);
			if (file.mimetype !== 'image/jpeg') {
				req.fileValidationError = 'goes wrong on the mimetype';
				return cb(null, false, new Error('goes wrong on the mimetype'));
			}
			cb(null, true);
		}
	});

module.exports = {
	getPublicUrl,
	sendUploadToGCS,
	multer
};
