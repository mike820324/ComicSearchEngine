import parserBase from './base';
import error from '../error';

class parserDmeden extends parserBase {
    constructor() {
        super('dmeden', 'dmeden.com');
    }
    getPageNum($) {
        const selector = 'div#iComicPC1 b';
        let element = $(selector);
        
        // the num value may be wrong
        let num = element[2].children[0].data;
        return num;
    }

    getElement($) {
        const baseUrl = 'http://www.dmeden.com';
        const selector = 'div.cComicList li a';
        let elements =  $(selector);
        let comicList = [];
        
        for(let i = 0; i < elements.length; i++) {
            let comic = {
                name: elements[i].attribs.title,
                url: baseUrl + elements[i].attribs.href,
            };
            comicList.push(comic);
        }

        if(comicList.length ===0) throw new error.parserError('no content');
        else return comicList;
    }

    getNextPage($) {
        const selector = 'span.cPageChangeLink a';
        const baseUrl = 'http://www.dmeden.com/comic/';

        let elements = $(selector);

        for(let i = 0; i < elements.length ; i++) {
            if(elements[i].children[0].data.includes('下一')) {
                if(elements[i].attribs.href === undefined)
                    throw new error.parserError('no next');
                else {
                    console.log(elements[i].attribs.href);
                    return baseUrl + elements[i].attribs.href;
                }
            }
        }

        throw new error.parserError('no next');
    }
}

module.exports = new parserDmeden();
