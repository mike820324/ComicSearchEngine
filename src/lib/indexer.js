import Levelup from 'levelup';
import Sublevel from 'level-sublevel';
import Promise from 'bluebird';

import Opencc from 'opencc';
let opencc = new Opencc('tw2s.json');

class comicIndexer {
	constructor(dbPath) {
		this.db = Sublevel(Levelup(dbPath));

		// register sublevel
		this.comicDb = new Map();
		this.comicDb['99770'] = this.db.sublevel('99770');
		this.comicDb['comicvip'] = this.db.sublevel('comicvip');
		this.comicDb['99comic'] = this.db.sublevel('99comic');
		this.comicDb['dmeden'] = this.db.sublevel('dmeden');
	}


	add(type, comicList) {
		// create batch ops
		let ops = comicList.map((comic) => {
			let op = {
				type: 'put',
				key: comic.name,
				value: comic.url,
				keyEncoding: 'utf8',
				valueEncoding: 'utf8'
			};

			return op;
		});
		
		// write to the correct sublevel db
		try {
			this.comicDb[type].batch(ops, err => {
				if(err) console.log(err);
			});
		} catch(TypeError) {
			console.log('no such kind of db');
		}
	}

	_search(type, searchTerm) {
		return new Promise((fulfill, reject) => {
			let searchResult = [];

			this.comicDb[type].createReadStream()
			.on('data', (data) => {
				let comic = {};
				if(data.key.includes(searchTerm)) {
					comic.name = data.key;
					comic.url = data.value;
					searchResult.push(comic);
				}
			})
			.on('error', (err) => {
				reject(err);
			})
			.on('end', () => {
				fulfill(searchResult);
			});
		});
	}

	_searchType(type, searchTerm, cb) {
		this._search(type, searchTerm)
		.then(searchResult => {
			cb(null, searchResult);
		})
		.catch(err => {
			cb(err);
		});
	}

	_searchAll(searchTerm, cb) {
		let searchResults = [];
		for(let type in this.comicDb) 
			searchResults.push(this._search(type, searchTerm));

		// @fixme
		// using all is not a good way since one engine reject, 
		// everyone died
		Promise.all(searchResults)
		.then(results => {
			let finalSearchResult = [];

			for(let comicList of results) {
				for(let comic of comicList) finalSearchResult.push(comic);
			}

			cb(null, finalSearchResult);
		});

	}

	search(type, searchTerm, cb) {
		searchTerm = opencc.convertSync(searchTerm);
		if(type !== 'all')
			this._searchType(type, searchTerm, cb);
		else
			this._searchAll(searchTerm, cb);
	}
}

module.exports = comicIndexer;
