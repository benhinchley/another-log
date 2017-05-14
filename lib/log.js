const { format } = require("util")
const { bold } = require("chalk")

String.prototype.padRight = function (char, length) {
	return this + char.repeat(Math.max(0, length - this.length))
}

const LogLevel = {
	ERROR: {
		ordinal: 3,
		slug: "ERROR".padRight(" ", 7),
		style: bold.red
	},
	WARNING: {
		ordinal: 4,
		slug: "WARNING",
		style: bold.yellow
	},
	NOTICE: {
		ordinal: 5,
		slug: "NOTICE".padRight(" ", 7),
		style: bold.cyan
	},
	INFO: {
		ordinal: 6,
		slug: "INFO".padRight(" ", 7),
		style: bold
	}
}

const Logger = function Logger(namespace) {
	const { env } = process
	this.namespace = namespace || "main"
	this.level = env.LOG_LEVEL ? LogLevel[env.LOG_LEVEL.toUpperCase()] : LogLevel.INFO
	this.stream = process.stdout
	this.isatty = Boolean(this.stream.isTTY)
}

Logger.prototype._log = function (level, args) {
	if(level.ordinal <= this.level.ordinal) {
		const input = format.apply(null, args)
		const date = new Date()
		let msg = ""

		if(this.isatty) { // we are a terminal
			msg = `[${date.toISOString()}] ${level.style(level.slug)} (${this.namespace}) ${input}\n`
		} else { // we are being piped
			msg = `${JSON.stringify({
				date,
				level: this.level.slug,
				namespace: this.namespace,
				message: input
			})}\n`
		}
		this.stream.write(msg)
	}
}

Logger.prototype.error = function (msg) {
	this._log(LogLevel.ERROR, arguments)
}

Logger.prototype.warning = function (msg) {
	this._log(LogLevel.WARNING, arguments)
}

Logger.prototype.notice = function (msg) {
	this._log(LogLevel.NOTICE, arguments)
}

Logger.prototype.info = function (msg) {
	this._log(LogLevel.INFO, arguments)
}

module.exports = function (namespace) {
	return new Logger(namespace)
}
