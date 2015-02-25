import Levelup from 'levelup';
import Sublevel from 'level-sublevel';

class comicIndexer {
	constructor(dbPath) {
		this.db = Sublevel(Levelup(dbPath));

		// register sublevel
		this.comicDb = {};
		this.comicDb['99770'] = this.db.sublevel('99770');
		this.comicDb['comicvip'] = this.db.sublevel('comicvip');
		this.comicDb['99comic'] = this.db.sublevel('99comic');
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
}

module.exports = comicIndexer;
