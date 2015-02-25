/* @flow weak */

import comicvipCrawler from './lib/crawler/comicvip';
import nineNineComicCrawler from './lib/crawler/99comic';
import nine9770Crawler from './lib/crawler/99770';
import Indexer from './lib/indexer';

let comicIndexer = new Indexer('./newdb');


var testComicvip = () => {
	let testCrawler = new comicvipCrawler();

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('comicvip', comicList);
	});
}

var test99770 = () => {
	let testCrawler = new nine9770Crawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99770', comicList);
	});
	
}

var test99comic = () => {
	let testCrawler = new nineNineComicCrawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99comic', comicList);
	});
	
}

testComicvip();
test99comic();
//test99770();