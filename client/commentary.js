class Commentary {

	constructor({
		target="#commentary",
		channelsURI,
	} = {},
	{
		commentClass="comment",
		reactionClass="reaction",
		inputClass="comment-input",
	} = {}){
		
		this.objectives = [...document.querySelectorAll(target)];

	}

	generateComment(comment){

	}

	generateReactions(comment, reactions){

	}

	generateChannel(comments){

	}

}

module.exports = Commentary;
