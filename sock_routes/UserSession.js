const JWT = require('jsonwebtoken')
const private_config =  require('../../configs/private.json')
const chat_driver = require('../../chat_system_bk_driver/index')

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
        return this.get_user_id()
    }
    get_user_id(){
        return this.#_id
    }
    async send_msg(data){
        const sender_id  = this.#_id
        const reciver_id = data.reciver_id
        const message = new chat_driver.MessageObject()
        data.lines.forEach(line => {
            message.add_line(line.header, line.data)
        });
        const message_id = await chat_driver.SendMessage.send_message(sender_id, reciver_id, message)
        return message_id
    }
    async get_pleanty_bothways(){
        if(typeof this.#_id != 'string') throw Error('User Undefined')
        const messages = await chat_driver.GetMessage.get_messages_bothway_pleanty(this.#_id, 10)
        return messages.map((message_row)=>{
            message_row.data = new MessageObject(message_row.data)
            return message_row
        })
    }
}

module.exports = UserSession

//unit tests
//const us = new UserSession()
//us.verify_user({_id:'12345678'})