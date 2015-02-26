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
	crawl(url, cb) {
		console.log('crawling ' + url);
		this.request(url)
		.then(response => {
			let $ = this.parseHtml(response);
			
			// get the content 
			let result = this.parser.getElement($);

			if(result.length !== 0)
				cb(null, result);
			
			else
			
			// get next url and wait
			let nextUrl = this.parser.getNextPage($);

			if (nextUrl === null)  {
				console.log('end =>' + url);
			} else {
				this.limiter = setTimeout(() =>{
					this.crawl(nextUrl, cb);
				}, this.delayTime);
			}
		})
		.catch(Error, err => {
			if(err.code === 'ECONNRESET') {
				console.log(err + ' => ' + url);

				this.limiter = setTimeout(() =>{
					this.crawl(url, cb);
				}, this.delayTime);
			} else {
				console.log('uncaught error => ' +  err);
			}
		})
		.catch(TypeError, err =>{
			
		})
		.catch(err => {
			console.log('uncauge error => ', err);
		});
	}
	
	// start crawling the page
	start(cb) {
		console.log('start crawler with ' + this.baseUrl);

		this.urlList.push(this.baseUrl);

		this.limiter = setTimeout(()=>{
			this.crawl(this.baseUrl, cb);
		}, 0);
	}

	// stop crawling
	stop() {
		console.log('stop crawler');
		clearTimeout(this.limiter);
	}
}

module.exports = crawler;
