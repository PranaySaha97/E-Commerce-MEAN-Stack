let express= require('express')
let routing= express.Router()
let dbsetup= require('../public/javascripts/dbSetup')
let shoppingDb= require('../public/javascripts/user_service')

routing.get('/setupDb', (req, res, next) => {
    dbsetup.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

routing.get('/fetchCustomer/:email', (req, res, next)=>{
    let email= req.params.email
    shoppingDb.getCustCred(email).then((custDet)=>{
        res.json(custDet)
    }).catch((err) => next(err))

})

routing.get('/fetchProduct/:category', (req, res, next)=>{
    let category= req.params.category
    shoppingDb.getProdDashboard(category).then((prodDet)=>{
        res.json(prodDet)
    }).catch((err) => next(err))

})

routing.get('/getProducts', (req, res, next)=>{
    shoppingDb.getAllProds().then((data)=>{
        res.json(data)
    }).catch((err) => next(err))
})

routing.get('/getProduct/:pid', (req, res, next) => {
    let pid = req.params.pid;
    shoppingDb.getOneProd(pid).then((data)=>{
        res.json(data)
    }).catch((err) => next(err))
})

routing.get('/getOrders/:name', (req, res, next)=>{
    let name= req.params.name
    shoppingDb.getOrders(name).then((data)=>{
        res.json(data)
    }).catch((err)=> next(err))
})

routing.get('/getCategory', (req, res, next) => {
    shoppingDb.getCat().then((data) => {
        res.json(data)
    }).catch((err) => next(err))
})

routing.put('/addOrder/:name', (req, res, next)=>{
    let name= req.params.name
    let data= req.body
    shoppingDb.addOrder(name, data).then((data)=>{
        if(data) res.send("Order Successfull.")
        else res.send("Cannot place the order.")
    }).catch((err) => next(err))
})

routing.put('/updateQuantity/:pid', (req, res, next) => {
    let pid= req.params.pid;
    let val= req.body.data;
    shoppingDb.updateQuantity(pid, val).then((result)=>{
        if(result) res.send("Quantity Updated.")
        else res.send("Cannot update quantity.")
    }).catch((err) => next(err))
})

module.exports= routing;
