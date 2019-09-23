const { User , product , transaction} = require('../models')
const { ObjectId } = require('mongodb')
class cart_controller {
    static addCart(req,res,next){
        product.findById(req.body.id)
        .then(productItem=>{
            if(req.body.qty > productItem.stock ){
                return next({
                    status : 400,
                    message : 'Stock Sudah Habis'
                })
                // res.status(300).json({
                //     message : 'Stock Sudah Habis'
                // })
            }else{
                product.updateOne({
                    _id : req.body.id
                },{
                    stock : productItem.stock - req.body.qty
                })
                .then(respons=>{
                    return  User.findOne({
                        _id : req.decode.data._id
                    })
                })
               .then(data=>{
                    let temp = data.cartList
                    let kondisi = false
                    temp = data.cartList.map(el=>{
                        if(el.Product._id == req.body.id){
                            el.quantity += req.body.qty
                            kondisi = true
                        }
                        return el
                    })
                    if(!kondisi){
                        temp.push({
                            Product : ObjectId(req.body.id),
                            quantity : req.body.qty
                        })
                    }
                    return User.updateOne({
                        _id : req.decode.data._id
                    },{
                        cartList : temp
                    })
                })
                .then(data=>{
                    // console.log(data)
                    res.json(data)
                })
                .catch(err=>{
                    next(err)
                })
            }
        })
        .catch(err=>{
            next(err)
            // console.log(err , ' ==================')
        })
        // console.log(req.body , ' ini body ================,.,.,.,.,.,.')
        
    }

    static getCart (req,res,next){
        User.findById(req.decode.data._id).populate('cartList.Product')
        .then(data=>{
            // console.log(data.cartList)
            console.log(data)
            res.json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static deleteCart (req,res,next){
        let temp = []
        let qtyBaru;
        let tempId;
        User.findById(req.decode.data._id).populate('cartList.Product')
        .then(data =>{
            console.log(data.cartList , ' resultsss')
            tempId = req.params.id
            data.cartList.forEach(el=>{
                if(el.Product._id == req.params.id){
                    qtyBaru = el.quantity +  el.Product.stock
                }
                else {
                    temp.push(el)
                }
            })
            // temp = data.cartList.filter( el => el.Product._id != req.params.id )
            console.log(JSON.stringify(temp , null , 2) , ' =-=-=-=0000 ini result')
            console.log(qtyBaru , ' ini qty baru yappppppp!!!')
            
            console.log(req.params)
            return User.updateOne({
                _id : req.decode.data._id
            },{
              cartList : temp  
            })
        })
        .then(data2=>{
            return product.updateOne({
                _id : tempId
            },{
                stock : qtyBaru
            })
        })
        .then(data3=>{
            console.log('berhasil')
            res.json(data3)
        })
        .catch( err =>{
            next(err)
        })
    }

    static CheckOut(req,res,next){
       let productList = []
       let UserProfile;
       console.log(req.body)
       console.log(req.decode.data._id)
       User.findById(req.decode.data._id).populate('cartList.Product')
       .then(data1=>{
            productList = data1.cartList
            data1.cartList = []
            UserProfile = data1
            return transaction.create({
                ProductList : productList,
                User : UserProfile,
                totalHarga : req.body.totalHarga,
                alamat : req.body.alamat,
                status : 'first'
            })
            // console.log(data1)
            // console.log(productList , ' ini product list =======')
            // console.log(UserProfile , ' ini User Profile')
       })
       .then(data2=>{
           console.log(data2, ' berhasil add ke transaction' )
           return User.updateOne({
               _id : req.decode.data._id
           },{
               cartList : []
           })
       })
       .then(data3=>{
            res.status(201).json({
                message : 'sukses masuk ke transaksi'
            })
       }) 
       .catch(err=>{
            next(err)
       })
    }

    static editQty (req,res,next){
        let kondisi = false
        let StockLama;
        let newData;
        let newQty;
        User.findById(req.decode.data._id).populate('cartList.Product')
        .then(data=>{
            console.log(data.cartList , ' {}{}{}{}{}{}{}{')
            data.cartList.forEach(el=>{
                if(el.Product._id == req.params.id){
                    StockLama = Number(el.Product.stock + el.quantity)
                    if(req.body.qty > Number( el.Product.stock + el.quantity) || req.body.qty < 1){
                        next({
                            status : 400,
                            message : 'Melebihi Stock Atau Qty tidak boleh dibawah 1'
                        })
                        kondisi = true
                    }else {
                        el.quantity = req.body.qty
                    }
                }
            })
            if(!kondisi){
                newQty = req.body.qty
                newData = data
                return User.updateOne({
                    _id : req.decode.data._id
                },{
                    cartList : data.cartList
                })
            }
        })
        .then(data=>{
           return product.updateOne({
                _id : req.params.id
            },{
                stock : StockLama - req.body.qty
            },{
                runValidators : true
            })
        })
        .then(data=>{
            if(!kondisi){
                res.json({
                    message : 'Sukses Edit Qty',
                    newQty : req.body.qty,
                    newData
                })
            }
        })
        .catch(next)
    }
}

module.exports = cart_controller