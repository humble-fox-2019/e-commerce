const transcations = require('../models/transaction')
const cart = require('../models/cart')
const product = require('../models/product')

class transactionsController {
    static createTransaction(req,res,next){
        let {id} = req.decode
        let total_price = req.body.total_price
        let cartId = req.body.CartId
        transcations.create({
            UserId: id,
            CartId:cartId,
            total_price
        }).then(data => {
            console.log("<<<<<<<< berhasil buat transaksi")
            return cart.updateMany({
                UserId:id, checkout_status:true
            }).then(data =>{
                console.log(data, "harusnya berhasil update")
                res.status(200).json({
                    data
                })
            }).catch(next)
            res.status(201).json({
                data
            })
        }).catch(next)
    }

    static updateTransaction(req,res,next){
        console.log("masuk ke controller untuk update")
        console.log(req.body)
        let {id} = req.params
        console.log(id)
        let updatedData = {}
        req.body.send_status  && (updatedData.send_status = req.body.send_status)
        req.body.arrived_status  && (updatedData.arrived_status = req.body.arrived_status)
        transcations.findByIdAndUpdate(id, updatedData,{
            new: true,
        }).then(data => {
            let userId = req.decode.id
            console.log(userId,"<<<<<<<<, ini untuk dapat data lagi")
            return transcations.find({UserId: userId}).sort({
                createdAt: -1
            }).populate({
                path : "CartId",
                populate : {
                    path : "productId",
                    select : "name price"
                }
            }).then(data =>{
                console.log(data,"<<<<<<<<<<<< ini di controller habis update")
                res.status(200).json({
                    data
                })
            }).catch(next)
            // console.log(data)
            res.status(200).json({
                data
            })
        }).catch(next)
    }

    static getTransactionOne(req,res,next){
        let {id} = req.decode
        transcations.find({UserId: id}).sort({
            createdAt: -1
        }).populate({
            path : "CartId",
            populate : {
                path : "productId",
                select : "name price"
            }
        })
        .then(data => {
            console.log(data,"<<<<<<<<<<<< ini di controller transaction")
            res.status(200).json({
                data
            })
        }).catch(next)
    }

    static getTransactions(req,res,next){
        transcations.find().sort({
            createdAt: -1
        })
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(next)
    }
}

module.exports = transactionsController



