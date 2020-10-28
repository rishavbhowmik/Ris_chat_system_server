const chat_driver = require('../chat_system_bk_driver/index')
const server = require('http').createServer();
const io_server = require('socket.io')
//const mongodb = require('mongodb')
//const mongodb_config = require('../configs/mongodb_config.json')

main()
async function main(){
    /*const {USER_COL} = await new Promise((resolve, reject)=>{
        mongodb.MongoClient.connect(mongodb_config.URI, (err, mongo_client)=>{
            if(err) { reject(err); return}
            resolve({USER_COL:mongo_client.db('ums').collection('user')})
        })
    })*/

    //socket.io server
    const io = new io_server(server)
    io.on('connect', require('./sock_routes/index'))
    server.listen(8080)
}