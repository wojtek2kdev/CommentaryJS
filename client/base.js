import io from 'socket.io-client';

export default class Channel {

	constructor({
		target,
		wsURI,
		commentsURI,
		dataExtractor,
		summonUserInfo,
    preset,
    events,
	}){
		
		this.commentsURI = commentsURI;
		this.wsURI = wsURI;

		this.dataExtractor = dataExtractor;
		this.summonUserInfo = summonUserInfo;
    this.preset = preset;

		this.objective = target || document.querySelector(target);
    this.events = events;

		(async () => {
      await this.init();
    })();


	}

	async fetchComments(){
			return await this.dataExtractor(await fetch(this.commentsURI));
	}

	async fetchUserInfo(){
		const {
			id,
			nickname,
			thumbnail,
			token
		} = await this.dataExtractor(await this.summonUserInfo());
		return {
			id,
			nickname,
			thumbnail,
			token,
		};
	}

  async init(){
    this.comments = await this.fetchComments();
    this.userInfo = await this.fetchUserInfo();
    this.preset = this.preset(this);
    this.preset.render();
  }

  channelConnect(){
    this.channel = io.connect(this.wsURI); 
  }

  sender({name, data, message}){ 
    this.channel.emit(name, message(data));
  }

  receiver(ctx, listener){
    const {
      name,
      action
    } = listener(ctx);
    this.channel.on(name, action);
  }

}
