const JWT = require('jsonwebtoken')
const private_config =  require('../../configs/private.json')

class UserSession{
    #connected = true
    #_id = null
    constructor(){

    }
    verify_user( user_token ){
        //const user = JWT.verify(user_token, private_config.USER_TOKEN_KEY)
        const user = user_token; //TEMP //DESTORY THIS LATER, IF I DONT
        console.log(user);
        this.#_id  = user._id;
    }
    get_user_id(){
        return this.#_id
    }
}

module.exports = UserSession

//unit tests
//const us = new UserSession()
//us.verify_user({_id:'12345678'})