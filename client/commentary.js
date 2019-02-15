class Channel {

	constructor({
		target="#commentary",
		isBlogLike=true,
		wsURI,
		commentsURI,
	} = {},
	{
		commentsHeaderClass="header",
		commentsCountClass="header-count",
		commentsUserClass="header-user",
		commentInputClass="comment-input",
		commentTextAreaClass="comment-input--textarea",
		commentListClass="comments",
		commentContainerClass="comment",
		commentThumbnailClass="comment-thumbnail",
		commentDateClass="comment-date",
		commentAuthorClass="comment-author",
		commentContentClass="comment-content",
		reactionClass="reaction",
		inputClass="comment-input",
	} = {},
	{
		dataExtractor,
		summonUserInfo,
	}){
		
		this.commentsURI = commentsURI;
		this.wsURI = wsURI;
		this.isBlogLike = isBlogLike;

		this.dataExtractor = dataExtractor;
		this.summonUserInfo = summonUserInfo;

		this.commentsHeaderClass = commentsHeaderClass;
		this.commentsCountClass = commentsCountClass;
		this.commentsUserClass = commentsUserClass;
		this.commentInputClass = commentInputClass;
		this.commentTextAreaClass = commentTextAreaClass;
		this.commentListClass = commentListClass;
		this.commentContainerClass = commentContainerClass;
		this.commentThumbnailClass = commentThumbnailClass;
		this.commentDateClass = commentDateClass;
		this.commentAuthorClass = commentAuthorClass;
		this.commentContentClass = commentContentClass;
		this.reactionClass = reactionClass;
		this.inputClass = inputClass;

		this.fetchUserInfo().then(userInfo => this.userInfo = userInfo);

		this.objective = document.querySelector(target);

		this.fetchComments().then(comments => {
			this.commentsCount = comments.length;
			let header;
			if(this.isBlogLike) header = this.generateBlogLikeHeader();
			const channel = this.generateChannel(comments);
			const commentInput = this.generateCommentInput();

			this.objective.appendChild(header);
			this.objective.appendChild(commentInput);
			this.objective.appendChild(channel);

		});
	}

	async fetchComments(){
			return this.dataExtractor(await fetch(this.commentsURI));
	}

	generateComment(comment){
		
		const commentContainer = document.createElement(`div`);
		commentContainer.setAttribute("class", this.commentContainerClass);

		const commentThumbnail = document.createElement(`img`);
		
		const thumbnailAttributes = [
			{
				attr: "src",
				val: comment.thumbnail,
			},
			{
				attr: "alt",
				val: "thumbnail",
			},
			{
				attr: "class", 
				val: this.commentThumbnailClass,
			}
		];

		thumbnailAttributes.forEach(({attr, val}) => commentThumbnail.setAttribute(attr, val));

		const date = document.createElement(`span`);
		date.setAttribute("class", this.commentDateClass);
		date.textContent = comment.date;

		const author = document.createElement(`span`);
		author.setAttribute("class", this.commentAuthorClass);
		author.textContent = comment.author;

		const commentContent = document.createElement(`p`);
		commentContent.setAttribute("class", this.commentContentClass);
		commentContent.textContent = comment.content;

		[commentThumbnail, date, author, commentContent].forEach(node => commentContainer.appendChild(node));

		return commentContainer;

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

	generateReactions(comment, commentContainer){

	}

	generateCommentInput(){

		const inputContainer = document.createElement('div');
		inputContainer.setAttribute("class", this.commentInputClass);

		const userThumbnail = document.createElement('img');
		const thumbnailAttributes = [
			{
				attr: "src",
				val: this.userInfo.thumbnail,
			},
			{
				attr: "alt",
				val: "thumbnail",
			},
			{
				attr: "class",
				val: this.commentThumbnailClass,
			},
		];
		thumbnailAttributes.forEach(({attr, val}) => userThumbnail.setAttribute(attr, val));

		const textarea = document.createElement('div');
		textarea.setAttribute("class", this.commentTextAreaClass);

		[userThumbnail, textarea].forEach(node => inputContainer.appendChild(node));
		
		return inputContainer;

	}

	generateBlogLikeHeader(){

		const headerContainer = document.createElement('div');
		headerContainer.setAttribute("class", this.commentsHeaderClass);

		const commentsCountInfo = document.createElement('span');
		commentsCountInfo.setAttribute("class", this.commentsCountClass);
		commentsCountInfo.textContent = `${this.commentsCount} comments`;

		const user = document.createElement('span');
		user.setAttribute("class", this.commentsUserClass);
		user.textContent = this.userInfo.nickname;

		[commentsCountInfo, user].forEach(node => headerContainer.appendChild(node));

		return headerContainer;

	}

	generateChannel(comments){
		
		const commentList = document.createElement('ul');
		commentList.setAttribute("class", this.commentListClass);
		
		comments.forEach(comment => {
			commentList.appendChild(this.generateComment(comment));								
		});

		return commentList;

	}

}

module.exports = Channel;
