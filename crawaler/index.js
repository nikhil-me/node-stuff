var request = require('request').defaults({proxy:'http://username:password@192.168.1.107:3128/', agent:false});
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');
var json2csv = require('json2csv');

var fields = ['Company-Name', 'Website'];

var links = [];
request('url', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('div.item-content h3 a').each(function(i, element){
      var a = $(this).attr('href');
      var b = $(this).text();
     	var obj = {
     		"Company-Name" : b,
     		"Website" : a
     	};
     	links.push(obj);
    });
  }
});
setTimeout(function(){ 
	var csv = json2csv({ data: links, fields: fields });
 
	fs.writeFile('file.csv', csv, function(err) {
	  if (err) throw err;
	  console.log('file saved');
	});
	 }, 10000);