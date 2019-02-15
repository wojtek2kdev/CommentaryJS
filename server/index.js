const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

class Server {

	constructor({
		onCommentSent,
		onCommentWriting,
		onCommentUpate,
		onReactionSent,
		onReactionUpdate,
	}, {
		commentsFetchCallback,
		authCallback,
		forbiddenCallback,
	}, {
		commentValidator,
		reactionValidator,
	}, port=8081, channels){

		this.forbiddenCallback = forbiddenCallback;
		this.authCallback = authCallback;

		this.port = process.PORT || 8081;
		server.listen(this.port);

		this.onCommentsFetch(commentsFetchCallback);

		channels = channels.map(channelId => {
			const channel = io.of(`/commentary/channel/${channelId}`)
				.on('connection', (socket) => {
						socket.on('comment_sent', async (data) => {
							await onAuthenticatedConnection(
								socket,
								data, 
								() => await onCommentSent(channel, socket, data),
							);
						});
						socket.on('comment_update', async (data) => {
							await onAuthenticatedConnection(
								socket,
								data, 
								() => await onCommentUpdate(channel, socket, data),
							);
						});
						socket.on('comment_writing', async (data) => {
							await onAuthenticatedConnection(
								socket,
								data, 
								() => await onCommentWriting(channel, socket, data),
							);
						});	
						socket.on('reaction_sent', async (data) => {
							await onAuthenticatedConnection(
								socket,
								data, 
								(validation) => {
									if(validation(socket, data, reactionValidator)) await onReactionSent(channel, socket, data);
								}
							);
						});
						socket.on('reaction_update', async (data) => {
							await onAuthenticatedConnection(
								socket,
								data, 
								(validation) => {
									if(validation(socket, data, reactionValidator)) await onReactionUpdate(channel, socket, data);
								}
							);
						});
					});

					return {
							id: channelId, 
							channel
					};

				});
		
	}

	async onAuthenticatedConnection(socket, data, action){
		if(await this.authCallback(data)){
			await action(validation);
		} else {
			await this.forbiddenCallback(socket);
		}
	}

	async validation(socket, data, validator){
	  return validator(socket, data, (errorMessage) => this.forbiddenCallback(socket, errorMessage));
	}

	onCommentsFetch(callback) {
		app.get('/commentary/channels/:id', async (req, res) => {
			res.body = await callback(req.params.id); 
		});
	};

}


module.exports = Server;

