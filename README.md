<p align="center">
  <h1 align="center">
    <img src="https://github.com/wojtek2kdev/CommentaryJS/blob/master/commentary.png" alt="commentaryjs" width="400"><br>
    <img src="https://img.shields.io/github/license/wojtek2kdev/CommentaryJS.svg?style=for-the-badge"><br>
    <img src="https://img.shields.io/github/issues/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <img src="https://img.shields.io/github/issues-closed/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <img src="https://img.shields.io/github/issues-pr/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <img src="https://img.shields.io/github/issues-pr-closed/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <br>
    <img src="https://img.shields.io/github/watchers/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <img src="https://img.shields.io/github/stars/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
    <img src="https://img.shields.io/github/forks/wojtek2kdev/CommentaryJS.svg?style=for-the-badge">
  </h1>
</p>

### Requirements

1. Some CRUD system to store comments
2. Some autorization method eg. OAuth / JWT - as you wish.
4. One comment channel for each target (target can be eg. post on blog)
5. Endpoint for fetching comments from channel by current target.

### Process

1. HTTP GET --> [Website eg. post] --> SERVER
2. SERVER HTTP GET --> [Resource] --> CLIENT
3. CLIENT GET /commentary/channel/:id --> [Comments for this channel] --> SERVER
4. SERVER GET /commentary/channel/:id --> [Comments] --> CLIENT
5. Client generate channel
6. Client connect with web socket for specific channel

### Communication

##### Client socket message

- Add new

```js
{
	channel: id,
  token,
	target: {
		type: "comment|reaction",
		value: content|number,
	},
}
```

- Update

```js
{
	channel: id,
  token,
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

