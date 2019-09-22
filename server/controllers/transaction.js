const Transaction = require('../models/transaction')
class TransactionController {
    static getAll( req ,res ,next ) {
        Transaction.find().sort('status').populate('userId')
        .then ( transactions => {
            res.status(200).json( transactions )
        })
        .catch(next)
    }
    static getAllByUserId ( req ,res ,next ) {
        const userId = req.params.id 
        Transaction.find({ userId }).populate('userId').populate('cartId')
        .then ( transactions => {
            res.status(200).json( transactions )
        })
        .catch(next)
    }
    static updateStatus ( req, res , next ) {
        const transactionId = req.params.id
        const { status } = req.body;
        Transaction.findOneAndUpdate({ _id : transactionId } , { status } , {runValidators: true})
        .then( previousUpdated => {
            res.status(200).json({ message : "status updated" , previousUpdated })
        })
        .catch( next )
    }
    static create ( req ,res ,next ) {
        const { product , userId , status } = req.body
        Transaction.create({
            product,
            userId,
            status
        })
        .then( transaction => {
            res.status(201).json({ transaction })
        })
        .catch( next )
    }
}


module.exports = TransactionController