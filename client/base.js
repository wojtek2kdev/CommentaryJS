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
    this.events = events;

    this.channel = io(this.wsURI);

		(async () => await this.init())();

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

  async init(){
    const comments = await this.fetchComments();
    const userInfo = await this.fetchUserInfo();
    this.preset = preparePreset(this);
    this.preset.render();
  }

  sender({name, data, message}){ 
    this.socket.emit(name, message(data));
  }

  receiver(ctx, listener){
    this.socket.on(listener.name, (data) => listener.action(ctx, data));
  }

}
