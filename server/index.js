const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Server = ({
		onCommentSent,
		onCommentWriting,
		onCommentUpate,
		onReactionSent,
		onReactionUpdate,
		commentsFetchCallback,
		authCallback,
		forbiddenCallback,
		commentValidator,
		reactionValidator,
}, port=8081, channels) => {

    const events = [
      {
        name: 'comment_sent',
        action: onCommentSent,
        validator: commentValidator,
      },
      {
        name: 'comment_update',
        action: onCommentUpdate,
        validator: commentValidator,
      },
      {
        name: 'comment_writing',
        action: onCommentWriting,
        validator: () => true,
      },
      {
        name: 'reaction_sent',
        action: onReactionSent,
        validator: reactionValidator,
      },
      {
        name: 'reaction_update',
        action: onReactionUpdate,
        validator: reactionValidator,
      },
    ];
    
		server.listen(port);

		onCommentsFetch(commentsFetchCallback);

		channels = channels.map(channelId => {
			const channel = io.of(`/commentary/channel/${channelId}`)
				.on('connection', (socket) => {
            events.forEach(({name, action, validator}) => {
             socket.on(name, async (data) => {
                await onAuthenticatedConnection(
                  socket,
                  data,
                  (validation) => {
                    const message = messageExtractor(data);
                    if(validation(socket, message, validator)) await action(channel, socket, message);
                  }
                );      
             });             
            });
					});

					return {
							id: channelId, 
							channel
					};
    });

	const onAuthenticatedConnection = async (socket, data, action) => {
		if(await authCallback(data)){
			await action(validation);
		} else {
			await forbiddenCallback(socket);
		}
	}

	const validation = async (socket, data, validator) => {
	  return validator(socket, data, (errorMessage) => forbiddenCallback(socket, errorMessage));
	}

	const onCommentsFetch = (callback) => {
		app.get('/commentary/channels/:id', async (req, res) => {
			res.body = await callback(req.params.id); 
		});
	};

}


module.exports = Server;

