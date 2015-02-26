import parserBase from './base';

class parserComicvip extends parserBase {
	getElement($) {
		const cssSelector = 'body > table:nth-child(5) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody a';
		const baseUrl = 'www.comicvip.com';

		let elements =  $(cssSelector);

		let comicList = [];	
		for(let i = 0; i < elements.length; i++) {
			let comic = {
				name: elements[i].children[0].data,
				url: baseUrl + elements[i].attribs.href,
			};

			comicList.push(comic);
		}

		return comicList;
	}
	
	getNextPage($) {
		return null;	
	}
}

module.exports = new parserComicvip();


