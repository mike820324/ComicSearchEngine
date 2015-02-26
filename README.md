# ComicSearchEngine
A simple Comic Search Engine written in nodejs. With a simple crawler, some parsers and indexer, and hopefully easy to extend in the future.

一個基於 nodejs 的漫畫搜尋引擎。包含了一些簡單的 crawler, parser 以及 indexer。 

# Why 
  I know, nowadays, there are a lot of search engines out there. You can simply type the comic name on google,
  and it will give you the results that you want. 

  The reason I want to create this program is simple, I love watching comics and I love programming. 
  Moreover, we use search engine all the time, search engine is everywhere. Google, amazon, shopping websites and etc. 
  I always wonder and curious about how the search engine works. 
  And that is why, this program is a good opotunity for me to pratice my programming skills 
  and learn something about how search engine works.
  
  So here it is, a very simple, tiny search engine implementation for comics written in nodejs.
  
  為什麼我要寫一個搜尋引擎呢？ 我知道現在已經有很多類似的網站可以達成相同的效果，甚至更好。
  在現今的社會搜尋引擎現在無所不在，到處都可以看到相關的應用，而我也非常好奇一個搜尋引擎是如何建構出來的。
  我覺得這個程式對我來說是一個非常好的練習，可以增進自己程式的功力，也可以順便了解一個搜尋引擎是如何運作的。
  所以拉，這個程式就這麼誕生了。

# Currently Supported Comic Websites
* 99comic : http://www.99comic.com
* 99770 : http://mh.99770.cc
* comicvip : http://www.comicvip.com
* dmeden: http://www.dmeden.com

# Third Party Libraries:
The following are some third party libraries I'm using to write my search engine.

以下是我使用的一些第三方套件。

* request : for http/https request
* whacko : cheerio with a html5 parser
* charset : html file encoding detector
* iconv-lite : charset encoder and decoder
* opencc : convert traditional Chinese into simplify Chinese and vise versa.
* node-segment: Chinese words segment for futre inverted index
* levelup : simple key-value based no sql
* leveldown : c binding for leveldb
* level-sublevel : adding sublevel support
* map-reduce : map reduce in leveldb


# Install:
Currently I'm using iojs version 1.3 to run this program, therefore, I dont' know wheter it will work in other node versions.
```
The Program is still in heavy development, so everything will be changed.
```

Command Walk Through
```bash
git clone https://github.com/mike820324/ComicSearchEngine.git
cd ComicSearchEngine
npm install
npm run test
```

# License
The MIT License (MIT)

Copyright (c) 2015 RueiMin Jiang \<mike820324@gmail.com\>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
