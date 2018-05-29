
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const favicon = require('serve-favicon')
const path = require('path')
const _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'))

const PythonShell = require('python-shell')
const pathRead = './MFRC522-python/Read.py'
const pathWrite = './MFRC522-python/Write.py'
//const readShell = new PythonShell('./MFRC522-python/Read.py')

//app.use(express.static(__dirname + '/config'));

//INITIAL index.html RENDER
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

//SOCKET - connection ESTABLISHED
io.on('connection', socket => {
	console.log('user connected')
	socket.on('startReading', () => {
		let readShell = new PythonShell(pathRead);
		let messages = [];
		console.log('BE - start readshell')
		readShell.on('message', message => {
			messages.push(message.trim())
			if(messages.length > 1){
				io.emit('read', messages)
			}
		})
	})
	socket.on('startWriting', message => {
		console.log('BE - input message: ', message)
		//let writeShell = new PythonShell(pathWrite);
		let options = {
			mode: 'text',
			args: [message]
		}
		console.log('BE - writeshell');
		PythonShell.run(pathWrite, options, (err, res) => {
			if (err) throw err;
			console.log('results:', res)
		})
		//writeShell.send(message);
		//writeShell.on('message', messageShell => {
		//	console.log('BE-writeshell-message:', messageShell)
		//})
	})
})

//PYTHON SHELL - READ
//readShell.on('message', message => {
//	io.emit('read', message);
//})

//SERVER LISTEN ON PORT 3000
server.listen(3000, () => {
	console.log('BE - server listetning on port 3000')
})
