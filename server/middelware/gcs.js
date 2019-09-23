'use strict'
const { Storage } = require('@google-cloud/storage')
const fileType = require('file-type');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const accepted_extensions = ['png','jpg','jpeg'];
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
            next()
        })
    })

    stream.end(req.file.buffer)
}

const Multer = require('multer'),
    multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
})

function validate_format(req, res, next) {
    // For MemoryStorage, validate the format using `req.file.buffer`
    // For DiskStorage, validate the format using `fs.readFile(req.file.path)` from Node.js File System Module
    if(!req.file){
        return next()
    }
    let mime = fileType(req.file.buffer);

    // if can't be determined or format not accepted
    if(!mime || !accepted_extensions.includes(mime.ext)){
        return next(new Error('The uploaded file is not in ' + accepted_extensions.join(", ") + ' format!'));
    }
    
    next();
}
const { product } = require('../models')
const urlToFileName = require('../helpers/urlFileName')
async function deleteFile(req,res,next) {
    product.findById(req.params.id)
    .then(data=>{
        let filename =  data.image
        filename = urlToFileName(filename)
        return storage
        .bucket(CLOUD_BUCKET)
        .file(filename)
        .delete()
    })
    .then(_=>{
        next()
    })
    .catch(next)

}

async function deleteForEdit(req,res,next){
    if(!req.file){
        return next()
    }
    product.findById(req.params.id)
    .then(data=>{
        let filename =  data.image
        filename = urlToFileName(filename)
        return storage
        .bucket(CLOUD_BUCKET)
        .file(filename)
        .delete()
    })
    .then(_=>{
        next()
    })
    .catch(next)
}


module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer ,
    validate_format,
    deleteFile,
    deleteForEdit
}