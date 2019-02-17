### Requirements

1. MongoDB as database and mongoose as orm
2. Some autorization method eg. OAuth / JWT - as you wish.
3. WebSocket for realtime comment and reactions
4. One comment channel for each target (target can be eg. post on blog)
5. Endpoint for fetching comments channel by current target.

### Process

1. HTTP GET --> [Website eg. post] --> SERVER
2. SERVER HTTP GET --> [Resource] --> CLIENT
3. CLIENT GET /commentary/channel/:id --> [Commentary WS Channel] --> SERVER
4. Server add client to channel
5. Server respose to client an ws channel.
6. Client generate comments from response and start listening

### Communication

##### Client socket message

- Add new

```js
{
	channel: id,
	target: {
		type: "comment|reaction",
		value: content|number,
	}
}
```

- Update

```js
{
	channel: id,
	target: {
		id: id,
		value: content|number // if "" or 0 then it'll be deleted.
	}
}
```

#### Server socket message

- Send broadcast response of an succeed operation.

```js
{
	target: {
		id: id,
		value: content|number // if "" or 0 then client remove that.
	}
}
```

- Send error response to client which send incorrect data or is not authorized.

```js
{
	error: msg
}
```

### Client side config:

Put main commentary container wherever you want like this.

```html
<div id="commentary"></div>
```

Below, or somewhere else init commentary script.

```js
// ? optional
// ! required
// @ default
Commentary.init({
	?comment: 'class',
	?reactions: [
		{!id: id, !class: 'class'}
	],
	?input: 'class',
	?send: 'class'
	multiple: true/@false, //has multiple channels on one website eg. many posts
	target: @'#commentary' // it can be css class also
});
```

### Server side config

1. Create autorization middleware for commentary.
2. Create middlewares for commentary data operations. 

