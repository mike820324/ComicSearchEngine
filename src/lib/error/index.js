class parserError extends Error {
    constructor(message) {
        this.name = 'parserError';
        this.message = message;
    }
}
module.exports.parserError = parserError;

class crawlerError extends Error {
    constructor(message, url) {
        this.name = 'crawlerError';
        this.message = message;
        this.url = url;
    }
}
module.exports.crawlerError = crawlerError;
