const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
Mongoose.set( 'useCreateIndex', true )
const url = "mongodb://localhost:27017/Shopping_DB";



const sellerSchema = Schema( {
    's_Id': String,
    'pDiscount': Number,
    'pQuantity': Number,
    'pShippingCharges': Number
} )

const productSchema = Schema( {
    '_id': {type: String, match: /[1-9][0-9]{3}/, required: [true, 'id is required.']},
    'pName': {type: String, required: [true, 'Product Name is required.']},
    'pDescription': {type: String, required: [true, 'Product Descirption is required.']},
    'pRating': {type: Number, required: [true, 'Rating is required.']},
    'pCategory': {type: String, required: [true, 'Category is required.']},
    'price': {type: Number, required: [true, 'Price is required.']},
    'color': {type: String, required: [true, 'Color is required.']},
    'image': {type: String, required: [true, 'Image Name is required.']},
    'specification': {type: String},
    'dateFirstAvailable': {type: String, required: [true, 'Date is required.']},
    'dateLastAvailable': {type: String, required: [true, 'Date is required.']},
    'pSeller': { type: sellerSchema}
}, { collection: "Products" } )


const customerSchema = Schema( {
    '_id': {type: String, match: /^U[1-9][0-9]{3}/, required: [true, 'id is required.']},
    'Name': {type: String, required: [true, 'Customer Name is required.']},
    'Pass': {type: String, required: [true, 'Password is required.']},
    'PhoneNo': {type: Number, match: /^[6-9][0-9]{9}$/, required: [true, 'Phone Number is required.']},
    Email: {type: String, match: /^[A-z0-9_.-]+@[A-z0-9_.-]+.[A-z]{2,5}$/, required: [true, 'Email ID is required.']},
    'Orders': {type: [], default: []}
}, { collection: "Customers" } );

let collection = {};

collection.getCustomersCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'Customers', customerSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getProductsCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'Products', productSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}


module.exports = collection;