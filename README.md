# log
> a simple logger for node

<details>
	<summary>Table of Contents</summary>
	<ul>
		<li>[Install](#install)</li>
		<li>[Usage](#usage)</li>
		<li>[License](#license)</li>
	</ul>
</details>

## Install

```
# if you are using yarn
$ yarn add @benhinchley/log

# or if you are using npm
$ npm install --save @benhinchley/log
```

## Usage

```js
const log = require("@benhinchley/log")()

log.info("this is some info")
log.notice("something to take notice of")
log.warning("just warning you")
log.error(new Error("oops something went wrong"))
```

## License

MIT © Benjamin Hinchley
