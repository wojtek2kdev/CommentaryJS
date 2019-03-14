import io from 'socket.io-client';

export default class Channel {

	constructor({
		target,
		wsURI,
		commentsURI,
		dataExtractor,
		summonUserInfo,
    preparePreset,
    events,
	}){
		
		this.commentsURI = commentsURI;
		this.wsURI = wsURI;

		this.dataExtractor = dataExtractor;
		this.summonUserInfo = summonUserInfo;

		this.objective = target || document.querySelector(target);
    this.preset = preparePreset(this.objective);
    this.events = events;

    this.channel = io(this.wsURI);

		(async () => {
      const comments = await this.fetchComments();
      const userInfo = await this.fetchUserInfo();
      this.preset = preparePreset(this, {
        comments,
        userInfo,
        target: this.objective,
      });
      this.preset.render();
    })();

	}

	async fetchComments(){
			return this.dataExtractor(await fetch(this.commentsURI));
	}

	async fetchUserInfo(){
		const {
			id,
			nickname,
			thumbnail,
			token
		} = await this.summonUserInfo();
		return {
			id,
			nickname,
			thumbnail,
			token,
		};
	}

  sender(name){ 
    return (data) => (message) => this.socket.emit(name, message(data));
  }

  receiver(ctx, listener){
    this.socket.on(listener.name, (data) => listener.action(ctx, data));
  }

}

module.exports = Channel;
