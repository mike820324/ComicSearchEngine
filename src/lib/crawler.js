import Request from 'request';
import whacko from 'whacko';
import Url from 'url';

// encode normalize
import charset from 'charset';
import iconv from 'iconv-lite';
import Opencc from 'opencc';
const opencc = new Opencc('tw2s.json');

import Parser from './parser';
import error from './error';
import winston from 'winston';

// do not use this class directly, extend it
class crawler {
    constructor(baseUrl, delayTime){
        this.logger = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    'timestamp': true
                }),
            ]
        });

        this.baseUrl = baseUrl;
        let hostname = Url.parse(this.baseUrl).hostname; 
        for(let parser of Parser.supportParser) {
            if(hostname.includes(parser.url)) {
                this.parser = parser.parser;
            }
        }

        if(this.parser === undefined) 
            this.logger.log('error', 'unsupported parser %s', hostname);

        this.urlList = [];

        if(delayTime)
            this.delayTime = delayTime;
        else
            this.delayTime = 1000;
        
        this.limiter = null;
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

    handleError(errorType, url)    {
        if(errorType === 'network') {
            this.limiter = setTimeout(() =>{
                this.crawl(url, cb);
            }, this.delayTime * 5);
        }
        
        else if(errorType === 'no content') {
            this.limiter = setTimeout(() =>{
                this.crawl(url, cb);
            }, this.delayTime * 5);
        }

        else if(errorType === 'no next') {
            this.stop();
        }
    }

    // crawl one page
    // get the data
    crawl(url, cb) {
        this.logger.log('info', 'crawling %s', url);
        Request.get({url: url, encoding: null}, (err, resp, body) => {
            if(err) {
                this.handleError('network', url);
            } else {
                let response = {headers: resp.headers, body: body};
                let $ = this.parseHtml(response);
                
                try {
                    // get the content 
                    let result = this.parser.getElement($);
                    cb(null, result);

                    // get next url and wait
                    let nextUrl = this.parser.getNextPage($);

                    this.limiter = setTimeout(() =>{
                        this.crawl(nextUrl, cb);
                    }, this.delayTime);
                } 
                catch(e) {
                    if(e instanceof error.parserError) {
                        if(e.message === 'no next') {
                            this.handleError(e.message);
                        } else if(e.message === 'no content') {
                            this.logger.log('error', 'parsing error happened');
                            this.handleError(e.message, url);
                        }
                    } else {
                        this.logger.log('error', 'unknown exception => %s' + e.message);
                        this.logger.log('debug', e.stack);
                    }
                }
            }
        });
    }
    
    // start crawling the page
    start(cb) {
        this.logger.log('info', 'start crawler with %s', this.baseUrl);

        this.limiter = setTimeout(()=>{
            this.crawl(this.baseUrl, cb);
        }, 0);
    }

    // stop crawling
    stop() {
        this.logger.log('info', 'stop crawler');
        clearTimeout(this.limiter);
    }
}

module.exports = crawler;
