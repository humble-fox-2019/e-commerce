const { transaction } = require('../models')
class transaction_controller {
    static getTransaction (req,res){
        transaction.find().populate('User').populate('ProductList.Product')
        .then(data=>{
            // console.log(req.decode.data.email , ' ini pentinG!!!!!!!!!!!!!!!!!!');
            // console.log(data)
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static konfirmasiTrx (req,res){
        transaction.updateOne({
            _id : req.params.id
        },{
            status : 'second'
        })
        .then(data=>{``
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static konfirmasiUser (req,res){
        transaction.updateOne({
            _id : req.params.id
        },{
            status : 'third'
        })
        .then(data=>{``
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getTrxUser (req,res){
        transaction.find({
            User : req.decode.data._id
        }).populate('ProductList.Product')
        .then(data=>{
            console.log(data[0].ProductList , ' ini penting juga YA !!!!')
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getOneTrx (req,res){
        transaction.findOne({
            _id : req.params.id
        }).populate('User').populate('ProductList.Product')
        .then(data=>{
            console.log(data , ' ini penting juga YA !!!! / =-=-=-=2-3=2302=302=032=032=302=30=')
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = transaction_controller

// [
//     {
//       _id: 5d8762dd250b76218c40a653,
//       Product: {
//         _id: 5d83432f0476cc203250b9cd,
//         name: 'Bola Basket Polos',
//         price: 100000,
//         stock: 15,
//         image: 'https://storage.googleapis.com/sultanrh32/1568883503107ball-basket.jpeg',
//         __v: 0
//       },
//       quantity: 3
//     },
//     {
//       _id: 5d876421cfe9d426ac964eee,
//       Product: {
//         _id: 5d831b860476cc203250b9bf,
//         name: 'Bola Basket Tarmak',
//         price: 50000,
//         stock: 14,
//         image: 'https://storage.googleapis.com/sultanrh32/1568873329569bola-basket1.jpg',
//         __v: 0
//       },
//       quantity: 1
//     }
//   ]