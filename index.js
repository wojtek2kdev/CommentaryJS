const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

class Server {

	constructor({
		onCommentSent,
		onCommentWriting,
		onCommentUpate,
		onReactionSent,
		onReactionUpdate
		commentsFetchCallback,
	}, port=8081){
		this.port = process.env.PORT || 8081;
		server.listen(port);

		onCommentsFetch(commentsFetchCallback);

		app.get('/commentary', (req, res) => {
			io.on('connection', (socket) => {
				socket.on('writing', async (data) => await onCommentWriting(io, socket, data));
				socket.on('sent', async (data) => await onCommendSent(io, socket, data));
				socket.on('update', async (data) => await onCommentUpdate(io, socket, data));
			});
		});

	}

	onCommentsFetch(callback) {
		app.get('/commentary/channels/:id', async (req, res) => {
			res.body = await callback(req.params.id); 
		});
	};

}

module.exports = Server;

