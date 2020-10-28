const UserSession = require('./UserSession')

const sock_routes = (socket) => {
    const user = new UserSession()
    socket.on('verify', (data)=>{
        user.verify_user(data.user_token)
        console.log(user)
    })
    socket.on('send', (data)=>{
        
    })

    socket.emit('connected','')
}

module.exports = sock_routes