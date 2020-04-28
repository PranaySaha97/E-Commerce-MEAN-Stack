const dbModel= require( './connection' )
const validator= require( './validator' )

const ShoppingDB = {}

ShoppingDB.generateId = () => {
    return dbModel.getCustomersCollection().then( ( model ) => {
        return model.distinct( "Orders.orderID" ).then( ( ids ) => {
            let oId = Math.max( ...ids );
            return oId + 1;
        } )
    } )
}

ShoppingDB.getCustCred= ( email ) =>{
    validator.validateEmailId( email );
    return dbModel.getCustomersCollection().then( ( customers )=>{
        return customers.findOne( {"Email": email},{'_id': 0, 'Pass': 1, 'Name': 1} ).then( ( data )=>{
            if( !data ) {
                let err= new Error( 'Unable to fetch customer details.' )
                err.status= 400;
                throw err
            }
            else return data
        } )
    } )
}

ShoppingDB.getProdDashboard= ( category )=>{
    return dbModel.getProductsCollection().then( ( products )=>{
        return products.find( {"pCategory": category} ).then( ( data )=>{
            if( data.length==0 || !data ) {
                let err= new Error( 'Unable to fetch product details.' )
                err.status= 400
                throw err
            }
            else return data
        } )
    } )
}   

ShoppingDB.getAllProds= ()=>{
    return dbModel.getProductsCollection().then( ( products )=>{
        return products.find().then( ( data )=>{
            if( !data || data.length==0 ){
                let err= new Error( 'Unable to fetch product details.' )
                err.status= 400
                throw err
            } else return data
        } )
    } )

}

ShoppingDB.getOneProd = ( pid )=>{
    return dbModel.getProductsCollection().then( ( products )=>{
        return products.findOne( {'_id': pid} ).then( ( data )=>{
            if( !data ){
                let err= new Error( 'Unable to fetch product details.' )
                err.status= 400
                throw err
            } else return data
        } )
    } )

}
ShoppingDB.getOrders= ( name )=>{
    return dbModel.getCustomersCollection().then( ( customers )=>{
        return customers.findOne( {'Name': name},{'Orders': 1, '_id': 0} ).then( ( data )=>{
            if( data ) return data
            else{
                let err= new Error( 'Unable to fetch order details.' )
                err.status= 400
                throw err
            }
        } )
    } )
}

ShoppingDB.getCat= ()=>{
    return dbModel.getProductsCollection().then( ( products ) =>{
        return products.distinct( 'pCategory' ).then( ( data ) =>{
            if( !data || data.length==0 ){
                let err= new Error( 'Unable to fetch categories.' )
                err.status= 400
                throw err
            } else{
                return data
            }
        } )
    } )
}


ShoppingDB.addOrder= ( name, data ) =>{
    let today= new Date()
    data.orderDate= today
    return ShoppingDB.generateId().then( ( id ) => {
        data.orderID= id;
        return dbModel.getCustomersCollection().then( ( customers )=>{
            return customers.updateOne( {'Name': name},{$push: {'Orders': data}} ).then( ( data )=>{
                if( data.nModified==1 ) return true
                else{
                    let err= new Error( 'Orders cannot be added.' )
                    err.status= 400
                    throw err
                }
            } )
        } )
    } )
    
}

ShoppingDB.updateQuantity= ( pId, data ) =>{
    return dbModel.getProductsCollection().then( ( products )=>{
        return products.updateOne( {'_id': pId},{$inc: {'pSeller.pQuantity': ( -1*parseInt( data ) )}} ).then( ( data )=>{
            if( data.nModified==1 ) return true
            else{
                let err= new Error( 'Quantity cannot be updated.' )
                err.status= 400
                throw err
            }
        } )
    } )
}

module.exports= ShoppingDB;
