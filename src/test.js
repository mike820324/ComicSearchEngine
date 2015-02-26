import crawler from './lib/crawler';

import Opencc from 'opencc';
const opencc = new Opencc('tw2s.json');

import Indexer from './lib/indexer';
import Segment from 'node-segment';

let segment = new Segment.Segment();
segment.useDefault();

let comicIndexer = new Indexer('./newdb');


var testComicvip = () => {
	let testCrawler = new crawler('http://www.comicvip.com/comic/all.html', 0);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('comicvip', comicList);
	});
};

var test99770 = () => {
	let testCrawler = new crawler('http://mh.99770.cc/comiclist/0', 4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99770', comicList);
	});
	
};

var test99comic = () => {
	let testCrawler = new crawler('http://www.99comic.com/lists/', 4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99comic', comicList);
	});
	
};

var testdmeden = () => {
	let testCrawler = new crawler('http://www.dmeden.com/comic/', 4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('dmeden', comicList);
	});
	
};

var testSearch = (type, searchTerm) => {
	comicIndexer.search(type, searchTerm, (err, result) =>{
		for(let comic of result) {
			console.log(segment.doSegment(opencc.convertSync(comic.name)));
		}
	});
};

//testComicvip();
//test99comic();
test99770();
//testdmeden();
//testSearch('all', '足球');

