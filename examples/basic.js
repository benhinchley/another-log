const log = require("../")()

log.info("this is some info")
log.notice("this is a notice")
log.warning("this is a warning")
log.error(new Error("an error"))
