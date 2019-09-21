const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;

const storage = new Storage({
    projectId: process.env.CLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(CLOUD_BUCKET)
const url = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
};
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const gcsname = Date.now() + req.file.originalname.replace(/\s/g,'')
    
    const file = bucket.file(gcsname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });
    stream.on('error', (err) => {
        console.log('image upload error')
        req.file.cloudStorageError = err
        next(err);
    });
    stream.on('finish', () => {
        console.log('image uploaded')
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.url = url(gcsname)
            next();
        });
    });
    stream.end(req.file.buffer);
}

const deleteFile = ( url ) => {
    if ( !url.includes ('storage.google') ) {
        return
    }
    let deleteFile = url;
    let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/posterpedia\/)/, '')

    storage
    .bucket(CLOUD_BUCKET)
    .file( filename )
    .delete()
    .then( () => {
        console.log("File Deleted")
    })
    .catch( err => {
        console.log( err );
        console.log( "Delete file failed")
    })
}
const Multer = require('multer'),
multer = Multer({
    fileFilter: function (req, file, next) {
        if ( !file ) {
            next(null, true);
        }
        if( file.mimetype === "image/png" | file.mimetype === "image/jpg" || file.mimetype === 'image/jpeg' ) {
            next(null, true);
        } else {
            next({ status : 400 , message : "Invalid Image Type"});
        }
    },
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10485760
    }
});

module.exports = {
    url,
    sendUploadToGCS,
    multer,
    deleteFile
}