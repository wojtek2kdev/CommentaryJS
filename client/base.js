class Channel {

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

}

module.exports = Channel;
