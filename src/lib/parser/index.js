// currently supported comic parser
import parserComicvip from './comicvip';
import parserDmeden from './dmeden';
import parser99comic from './99comic';
import parser99770 from './99770';

let parserList = [parserComicvip, parserDmeden, parser99comic, parser99770];

let supportParser = parserList.map(parser => {
	return {
			parser: parser,
			url: parser.url
	};
});

module.exports.supportParser = supportParser;


