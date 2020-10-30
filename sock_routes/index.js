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
        const req_id = data.req_id;
        if (typeof user.get_user_id() != 'string') return
        user.send_msg(data)
        .then((message_id)=>{
            socket.emit('msg_sent', {req_id, message_id})
        })
    })
    socket.on('get_messages_bothway_pleanty', data =>{
        const req_id = data.req_id;
        user.get_messages_bothway_pleanty()
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_pleanty', {req_id, results})
        })
    })
    socket.on('get_messages_bothway_time_after', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_time_after(data.time_in_sec)//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_time_after', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_bothway_post_id', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_post_id(data.id_onwards)//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_post_id', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_bothway_range_id', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_range_id(data.id_onwards, data.id_untill)//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_range_id', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_bothway_pleanty_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_pleanty_of_sender(data.sender_id)//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_pleanty_of_sender', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_bothway_post_id_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_post_id_of_sender(data.sender_id, data.id_onwards )//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_post_id_of_sender', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_bothway_range_id_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_bothway_range_id_of_sender(data.sender_id, data.id_onwards, data.id_untill )//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_bothway_range_id_of_sender', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_oneway_pleanty_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_oneway_pleanty_of_sender(data.sender_id)//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_oneway_pleanty_of_sender', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_oneway_post_id_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_oneway_post_id_of_sender(data.sender_id, data.id_onwards )//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_oneway_post_id_of_sender', {req_id, results}) //rec
        })
    })
    socket.on('get_messages_oneway_range_id_of_sender', data =>{//rec
        const req_id = data.req_id;
        user.get_messages_oneway_range_id_of_sender(data.sender_id, data.id_onwards, data.id_untill )//rec + argc
        .then(results => {
            results.map((message_row)=>{
                //message_row.data = new MessageObject(message_row.data)
                message_row.data = message_row.data.get_all_lines()
                return message_row
            })
            socket.emit('get_messages_oneway_range_id_of_sender', {req_id, results}) //rec
        })
    })


    socket.emit('connected','')
}

module.exports = sock_routes