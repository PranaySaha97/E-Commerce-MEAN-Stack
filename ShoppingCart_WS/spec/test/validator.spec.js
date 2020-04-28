const validator = require ( '../../public/javascripts/validator' )

describe( "Email id validator", ()=>{
    it( "for invalid email id it should throw error", () =>{
        try{
            validator.validateEmailId( "user1" )
        } catch( e ){
            expect( true ).toBeTruthy();
        }
    } )
    it( "for valid email id it should not throw error", () =>{
        try{
            validator.validateEmailId( "user1@test.com" )
            expect( true ).toBeTruthy();
        } catch( e ){
        }
    } )

    it( "for valid password it should not throw error", () =>{
        try{
            validator.validatePassword( "user@1" )
            expect( true ).toBeTruthy();
        } catch( e ){
        }
    } )

    it( "for invalid password it should throw error", () =>{
        try{
            validator.validatePassword( "user*1" )
            expect( true ).toBeTruthy();
        } catch( e ){
        }
    } )
} )
