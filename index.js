const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Commentary = {};

const init = (ctx, port=8081) => {
	Commentary = ctx;
	server.listen(port);
	io.on('connection', function (socket) {
		socket.on('writing', async (data) => await Commentary.onCommentWriting(io, socket, data));
		socket.on('sent', async (data) => await Commentary.onCommendSent(io, socket, data));
		socket.on('update', async (data) => await Commentary.onCommentUpdate(io, socket, data));
	});
};


const onCommentsFetch = (callback) => {
	app.get('/commentary/channels/:id', async (req, res) => {
		res.body = await callback(req.params.id); 
	});
};

module.exports = {
	init,
	onCommentsFetch,
};


