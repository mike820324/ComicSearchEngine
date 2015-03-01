import crawler from './lib/crawler';
import Indexer from './lib/indexer';

import Opencc from 'opencc';
const opencc = new Opencc('tw2s.json');

let comicIndexer = new Indexer('./newdb');

let initLinks = [
	'http://www.comicvip.com/comic/all.html',
	'http://mh.99770.cc/comiclist/0',
	'http://www.99comic.com/lists/',
	'http://www.dmeden.com/comic/'
];

// init crawlers
let crawlers = initLinks.map(initLink => {
	return new crawler(initLink, 1000);
});


let index = (err, comicList) => {
	if(err) console.log(err);
	else {
		let url = comicList[0].url;
		
		// @fixme
		// not a good pattern
		if(url.includes('comicvip'))
			comicIndexer.add('comicvip', comicList);

		else if(url.includes('99770'))
			comicIndexer.add('99770', comicList);
		
		else if(url.includes('99comic'))
			comicIndexer.add('99comic', comicList);

		else if(url.includes('dmeden'))
			comicIndexer.add('dmeden', comicList);

		else
			console.log('can not find the proper indexer');
	}
};

let main = () => {
	for(crawler of crawlers) {
		crawler.start(index);
	}
};

main();
