class Channel {

	constructor({
		target="#commentary",
		wsURI,
		commentsURI,
	} = {},
	{
		commentListClass="comments",
		commentContainerClass="comment",
		commentThumbnailClass="comment-thumbnail",
		commentContentClass="comment-content",
		reactionClass="reaction",
		inputClass="comment-input",
	} = {},
	{
		dataExtractor,
	}){
		
		this.commentsURI = commentsURI;
		this.wsURI = wsURI;

		this.dataExtractor = dataExtractor;

		this.commentListClass = commentListClass;
		this.commentContainerClass = commentContainerClass;
		this.commentThumbnailClass = commentThumbnailClass;
		this.commentContentClass = commentContentClass;
		this.reactionClass = reactionClass;
		this.inputClass = inputClass;

		this.objective = document.querySelector(target);

		this.fetchComments().then(comments => {
			this.generateChannel(comments);												 
		});

	}

	async fetchComments(){
			return this.dataExtractor(await fetch(this.commentsURI));
	}

	generateComment(comment){
		
		const commentContainer = document.createElement(`<div class="${this.commentContainerClass}"></div>`);

		const commentThumbnail = document.createElement(`<img src="${comment.thumbnail}" alt="thumbnail" class="${this.commentThumbnailClass}">`);

		const commentContent = document.createElement(`<p class="${this.commentContentClass}"></p>`);
		commentContet.textContent = comment.content;
	
		[commentThumbnail, commentContent].forEach(node => commentContainer.appendChild(node));

		return commentContainer;

	}

	generateReactions(comment, reactions){

	}

	generateChannel(comments){

		

	}

}

module.exports = Channel;
