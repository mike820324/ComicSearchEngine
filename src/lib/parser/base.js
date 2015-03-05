class parserBase {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    getElement($) {
        throw new Error('not implements');
    }
    
    getNextPage($) {
        throw new Error('not implements');
    }
}

module.exports = parserBase;
