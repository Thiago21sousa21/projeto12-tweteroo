import express from "express";
const app = express();
app.use(express.json());
const PORT = 5000;
const users = [];
const tweets = [];
app.post('/sign-up', (req, res)=>{
	const {body} = req;
	const {username , avatar } = body;
	const newUser = {username, avatar};
	users.push(newUser);
	console.log(users);
	res.sendStatus(200);
});
app.post('/tweets',(req, res)=>{

	const {body} = req;
	const {username , tweet } = body;

	const finded = users.find(e => e.username === username);
	if(!finded){
		return res.status(401).send('deve logar primeiro!');
	}
	const newTweet = {username, tweet};
	tweets.push(newTweet);
	res.sendStatus(201);

});
app.get('/tweets', (req, res) => {
	const feed = [];
	let i = 0, index = tweets.length -1 ;
	while ( i < 10 && index >= 0 ){
		const newPartialElementFeed = users.find(e => e.username === tweets[index].username);
		const newElementFeed = {
			username: newPartialElementFeed.username,
			avatar: newPartialElementFeed.avatar,
			tweet: tweets[index].tweet
		}
		//console.log('RECEBENDO FEED',newElementFeed);
		feed.push(newElementFeed);
		i++;
		index--;
	}
	console.log(feed, ' ', feed.length);
	res.status(200).send(feed);

});
app.listen(PORT, () => { console.log(`rodando na porta ${PORT}`) });
