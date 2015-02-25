/* @flow weak */

import comicvipCrawler from './lib/crawler/comicvip';
import nineNineComicCrawler from './lib/crawler/99comic';
import nine9770Crawler from './lib/crawler/99770';



var testComicvip = () => {
	let testCrawler = new comicvipCrawler();

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		console.log(comicList[1000]);
	});
}

var test99770 = () => {
	let testCrawler = new nine9770Crawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		else {
			for(let comic of comicList) {
				console.log(comic.name);
			}
		}
	});
	
}

var test99comic = () => {
	let testCrawler = new nineNineComicCrawler(4000);

	testCrawler.start((err, comicList) => {
		if(err) console.log(err);
		//for(let comic of comicList) {
		//	console.log(comic.name);
		//}
	});
	
}

//testComicvip();
//test99comic();
test99770();
