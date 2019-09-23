// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

function imagechecker(req,res,next) {
    console.log("masuk ke checker")
    console.log(req.body)
    let bad_content = false
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './keyfile.json'
    });
    console.log(req.file)
    const file = req.file.buffer
    console.log(file)
    client.safeSearchDetection(file)
    .then(results=>{
        const detections = results[0].safeSearchAnnotation;
        const parameter = ['adult','medical','spoof','violence','racy']
        for(let i =0; i < parameter.length; i++){
            //console.log(`${parameter[i]} : ${detections[parameter[i]]}`)
            if(detections[parameter[i]] == "LIKELY" || detections[parameter[i]]== "VERY_LIKELY"){
                bad_content = true
            }
        }
        if(bad_content){
            next({httpStatus: 400, message: 'Sorry your content probably unapropriate content'})
        } else{
            next()
        }
    }).catch(next)
  }

  module.exports = imagechecker




