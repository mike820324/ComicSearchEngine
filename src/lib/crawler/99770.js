import baseCrawler from './base';

class nine9770Crawler extends baseCrawler {
	constructor(delayTime) {
		super('http://mh.99770.cc/comiclist/0/', delayTime);
	}

	getElement($) {
		const cssSelector = 'body > div.cContent > div.cPubRight > div.cc2 > div.cComicList li > a';
		let elements =  $(cssSelector);
	
		let comicList = []
		for(let i = 0; i < elements.length; i++) {
			let comic = {
				name: elements[i].attribs.title,
				url: elements[i].attribs.href,
			};
			comicList.push(comic);
		}

		return comicList;
	}

	getPageNum($) {
		const cssPath = '#iComicPC1 > b:nth-child(3)';
		let elements = $(cssPath);

		//the num value may be wrong
		let num = element[0].children[0].data;
		return num;
	}

	getNextPage($) {
		const baseUrl = 'http://mh.99770.cc';
		const selector = 'span.cPageChangeLink a';

		let elements = $(selector);

		for(let i = 0; i < elements.length ; i++) {
			if(elements[i].children[0].data.indexOf('下一') !== -1) {
					if(elements[i].attribs.href === undefined)
						return null;
					else
						return baseUrl + elements[i].attribs.href;
			}
		}
		return null;
	}
}

module.exports = nine9770Crawler;
