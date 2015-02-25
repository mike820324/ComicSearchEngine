import comicvipCrawler from './lib/crawler/comicvip';
import nineNineComicCrawler from './lib/crawler/99comic';
import nine9770Crawler from './lib/crawler/99770';
import dmedenCrawler from './lib/crawler/dmeden';

import Indexer from './lib/indexer';

let comicIndexer = new Indexer('./newdb');


var testComicvip = () => {
	let testCrawler = new comicvipCrawler();

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('comicvip', comicList);
	});
};

var test99770 = () => {
	let testCrawler = new nine9770Crawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99770', comicList);
	});
	
};

var test99comic = () => {
	let testCrawler = new nineNineComicCrawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else comicIndexer.add('99comic', comicList);
	});
	
};

var testdmeden = () => {
	let testCrawler = new dmedenCrawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else {
			console.log(comicList[0].name);
		}
		//else comicIndexer.add('dmeden', comicList);
	});
	
};

var testSearch = (type, searchTerm) => {
	comicIndexer.search(type, searchTerm, (err, result) =>{
		console.log(result);
	});
};

//testComicvip();
//test99comic();
//test99770();
//testdmeden();
testSearch('all', '網球');

