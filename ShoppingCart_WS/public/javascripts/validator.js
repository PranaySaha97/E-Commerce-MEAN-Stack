let validator ={}

validator.validateEmailId= function ( emailId ){
    let pattern = new RegExp ( /^[A-z0-9.-_]+@[A-z0-9.-_]+\.[A-z]{2,5}$/ )
    if( !pattern.test( emailId ) ){
        let err = new Error ( "Incorrect Email Format" )
        err.status = 406
        throw err
    }
}

validator.validatePassword = function ( pass ){
    let pattern = new RegExp ( /^[A-z0-9./\-@#]+$/ )
    if( !pattern.test( pass ) ){
        let err = new Error ( "Incorrect Password Format." )
        err.status = 406
        throw err
    }
}

module.exports = validator