import crawler from './lib/crawler';

import Opencc from 'opencc';
const opencc = new Opencc('tw2s.json');

import Indexer from './lib/indexer';
import nodejieba from 'nodejieba';
nodejieba.queryLoadDict("./node_modules/nodejieba/dict/jieba.dict.utf8",
						"./node_modules/nodejieba/dict/hmm_model.utf8",
						3,
						"./node_modules/nodejieba/dict/user.dict.utf8");

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
			console.log(nodejieba.queryCutSync(opencc.convertSync(comic.name)));
			//console.log(comic.name + ' => ' + comic.url);
		}
	});
};

//testComicvip();
//test99comic();
//test99770();
//testdmeden();
testSearch('all', '足球');

