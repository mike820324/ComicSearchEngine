class parserBase {
	getElement($) {
		throw new Error('not implements');
	}
	
	getNextPage($) {
		throw new Error('not implements');
	}
}

module.exports = parserBase;
