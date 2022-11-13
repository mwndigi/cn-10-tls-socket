const tls = require('tls');
const fs = require('fs');

const port = 1337;
const host = '127.0.0.1'

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

var server = tls.createServer(options, (socket) => {
    socket.write("I am the server sending you a message. Yo back")
    socket.on('data', (data) => {
        console.log('Received: %s [it is %d bytes long]',
            data.toString().replace(/(\n)/gm,""),
            data.length)
    })
    socket.on('end', () => {
        console.log('End Of Transmission')
    })
})

server.listen(port, host, () => {
    console.log("I'm listening at %s, on port %s", host, port)
})

server.on('error', function(error) {
    console.error(error)
    server.destroy()
})
