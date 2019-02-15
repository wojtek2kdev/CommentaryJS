const app = require('express')();

//example of commentary use
//
//
/* const commentaryServer = new Comommentary({	
	onCommentWriting: async function(io, socket, data){
		console.log(data);
		io.emit('writing', 1);
		return;
	},
	commentsFetchCallback: function() {
		return [{id: 123, value: "Nice comment"},{id:124, value: "fjerfre rgegre"}];
	}
}, 8081, [1]);
*/

app.get("/commentary/channel/1", (req, res) => {
	res.json([
		{
			id: 2,
			date: "2018-09-02",
			author: "wojtek2kdev",
			content: "very funny comment",
			thumbnail: "pic.jpg"
		},
		{
			id: 4,
			date: "2018-02-03",
			author: "Comandeer",
			content: "very funny sdsdsf dfsdfcomment",
			thumbnail: "picyoyo.jpg"
		},
		{
			id: 9,
			date: "2 minutes ago..",
			author: "JimboJones",
			content: "very not funny comment",
			thumbnail: "picxd.jpg"
		},
		{
			id: 5,
			date: "1 second ago..",
			author: "BartYoYo",
			content: "very funny hehe comment",
			thumbnail: "pic2.jpg"
		},
	]);			 
});

app.get("/commentary/user", (req, res) => {
	res.json({
		id: 5,
		nickname: "wojtek2kdev",
		thumbnail: "profile.png",
		token: 432423423432,
		createdAt: "2018-09-01",
		updatedAt: "2018-08-03"
	});			 
});

app.get("/", (req, res) => res.sendFile(__dirname + "/example.html"));
app.get("/client/commentary.js", (req, res) => res.sendFile(__dirname + "/client/commentary.js"));

app.listen(8080, () => console.log("Server is enabled"));
