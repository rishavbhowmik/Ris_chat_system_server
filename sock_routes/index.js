const message = require('../../chat_system_bk_driver/operations/message')
const UserSession = require('./UserSession')

const sock_routes = (socket) => {
    const user = new UserSession()
    socket.on('verify', (data)=>{
        if(!user.verify_user(data.user_token)){
            socket.close(); return;
        }
        console.log(user)
        socket.emit('ready', '')
    })
    socket.on('send_msg', (data)=>{
        if (typeof user.get_user_id() != 'string') return
        user.send_msg(data)
        .then((message_id)=>{
            socket.emit('msg_sent', {message_id})
        })
    })
    socket.on('get_pleanty_bothways', data =>{
        
    })

    socket.emit('connected','')
}

module.exports = sock_routes