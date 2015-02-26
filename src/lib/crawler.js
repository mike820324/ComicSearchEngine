import Request from 'request';

// html parsing
import whacko from 'whacko';

import Promise from 'bluebird';

import Parser from './parser';

// encode normalize
import charset from 'charset';
import iconv from 'iconv-lite';
import Opencc from 'opencc';
const opencc = new Opencc('tw2s.json');



// do not use this class directly, extend it
class crawler {
	constructor(baseUrl, delayTime){
		this.baseUrl = baseUrl;
		
		for(let parser of Parser.supportParser) {
			if(this.baseUrl.indexOf(parser.url) !== -1) {
				this.parser = parser.parser;
			}
		}

		if(this.parser === undefined) 
			console.log('not supported');

		this.urlList = [];

		if(delayTime)
			this.delayTime = delayTime;
		else
			this.delayTime = 1000;
		
		this.limiter = null;
	}
	
	request(url) {
		return new Promise((fulfill, reject) => {
			Request.get({url:url, encoding: null}, (err, resp, body) => {
				if(err) reject(err);
				else fulfill({headers: resp.headers, body: body});
			})
		});
	}

	// return a jquery like object
	// with encoding parsing
	parseHtml(response) {
		let encoding = charset(response.headers, response.body);
		if(encoding === null) encoding = 'utf8';

		let utf8Body = opencc.convertSync(iconv.decode(response.body, encoding));
		let $ = whacko.load(utf8Body, {encodeEntities:false});
		return $;
	}
	
	
	// crawl one page
	// get the data
	crawl(cb) {
		let url = this.urlList.pop();

		if (url === undefined || url === null)  {
			this.stop();
		} else {
			console.log('crawling ' + url);
			this.request(url)
			.then(response => {
				let $ = this.parseHtml(response);

				// get the content 
				let result = this.parser.getElement($);
				cb(null, result);
				
				// get next url and wait
				this.urlList.push(this.parser.getNextPage($));
			});
		}
	}
	
	// start crawling the page
	start(cb) {
		console.log('start crawler with ' + this.baseUrl);

		this.urlList.push(this.baseUrl);

		this.limiter = setInterval(()=>{
			this.crawl(cb);
		}, this.delayTime);
	}

	// stop crawling
	stop() {
		console.log('stop crawler');
		clearInterval(this.limiter);
	}
}

module.exports = crawler;
