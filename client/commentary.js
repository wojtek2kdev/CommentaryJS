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
			const channel = this.generateChannel(comments);												 
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

		const commentContent = document.createElement(`p`);
		commentContent.setAttribute("class", this.commentContentClass);
		commentContent.textContent = comment.content;

		[commentThumbnail, commentContent].forEach(node => commentContainer.appendChild(node));

		return commentContainer;

	}

	generateReactions(comment, commentContainer){

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
