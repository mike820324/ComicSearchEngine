import parserBase from './base';

class parserDmeden extends parserBase {
	getPageNum($) {
		const selector = 'div#iComicPC1 b';
		let element = $(selector);
		
		// the num value may be wrong
		let num = element[2].children[0].data;
		return num;
	}

	getElement($) {
		const baseUrl = 'http://www.dmeden.com';
		const selector = 'div.cComicList li a'
		let elements =  $(selector);
		let comicList = [];
		
		for(let i = 0; i < elements.length; i++) {
			let comic = {
				name: elements[i].attribs.title,
				url: baseUrl + elements[i].attribs.href,
			};
			comicList.push(comic);
		}
		return comicList;
	}

	getNextPage($) {
		const selector = 'span.cPageChangeLink a';
		const baseUrl = 'http://www.dmeden.com/comic/';

		let elements = $(selector);

		for(let i = 0; i < elements.length ; i++) {
			if(elements[i].children[0].data.indexOf('下一') !== -1) {
					return baseUrl + elements[i].attribs.href;
			}
		}

		return null;
	}
}

module.exports = new parserDmeden();
