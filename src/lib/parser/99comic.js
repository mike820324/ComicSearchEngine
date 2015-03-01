import parserBase from './base';

class parser99comic extends parserBase {
	constructor() {
		super('99comic', '99comic.com');
	}
	getPageNum($) {
		const cssPath = 'body > div > div > div.imainarea > div > div > div.i-hdline > div.hdbox.hd-comiclist > div > div:nth-child(1) > span > b:nth-child(3)';
		let element = $(cssPath);
		
		// the num value may be wrong
		let num = element[0].children[0].data;
		return num;
	}

	getElement($) {
		const baseUrl = 'http://www.99comic.com';
		const selector = 'div.comiclist ul li a'
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
		const baseUrl = 'http://www.99comic.com';
		const selector = 'span.cPageChangeLink a';


		let elements = $(selector);

		for(let i = 0; i < elements.length ; i++) {
			if(elements[i].children[0].data.includes('下一')) {
					return baseUrl + elements[i].attribs.href;
			}
		}
		return null;
	}
}

module.exports = new parser99comic();

