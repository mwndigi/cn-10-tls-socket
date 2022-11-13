const tls = require('tls');
const fs = require('fs');

const port = 1337;
const host = '127.0.0.1'

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    rejectUnauthorized: false
}

var client = tls.connect(port, host, options, () => {
    if (client.authorized) {
        console.log("Connection authorized by a Certificate Authority.")
    } else {
        console.log("Connection not authorized: " + client.authorizationError)
    }
    client.write("I am the client sending you a message. Yo")
})

client.on("data", (data) => {
    console.log('Received: %s [it is %d bytes long]',
        data.toString().replace(/(\n)/gm,""),
        data.length)
    client.end()
})

client.on('close', () => {
    console.log("Connection closed")
})

client.on('error', (error) => {
    console.error(error)
    client.destroy()
})
