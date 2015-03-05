import parserBase from './base';
import error from '../error';

class parserComicvip extends parserBase {
    constructor() {
        super('Comicvip', 'comicvip.com');
    }

    getElement($) {
        const cssSelector = 'body > table:nth-child(5) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody a';
        const baseUrl = 'http://www.comicvip.com';

        let elements =  $(cssSelector);

        let comicList = [];    
        for(let i = 0; i < elements.length; i++) {
            let comic = {
                name: elements[i].children[0].data,
                url: baseUrl + elements[i].attribs.href,
            };

            comicList.push(comic);
        }

        if(comicList.length ===0) throw new error.parserError('no content');
        else return comicList;
    }
    
    getNextPage($) {
        throw new error.parserError('no next');
    }
}

module.exports = new parserComicvip();


