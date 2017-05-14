#!/usr/bin/env node

const split = require("split2")
const through = require("through2")

process.stdin
	.pipe(split(JSON.parse))
	.pipe(through({objectMode: true}, (obj, enc, cb) => {
		cb(null, `[${obj.date}] ${obj.namespace} ${obj.level} ${obj.message}\n`)
	}))
	.pipe(process.stdout)
