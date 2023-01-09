var teams = require('./teams.json');
var fs = require('fs');
var request = require('request');
var mime = require('mime-types');
fs.writeFileSync("text.txt", "");
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename+"."+mime.extension(res.headers['content-type']))).on('close', callback);
  });
};

var thing = [];
for (var i = 0; i <= 29; i ++){
  j = teams.teams[i];
  let dir = "./" + j.abbrev;
  j.imgURL = "https://mamamia5x.github.io/BBGM-NBA/" + j.abbrev + "/" + fs.readdirSync(dir)[0];
  j.imgURLSmall = "https://mamamia5x.github.io/BBGM-NBA/" + j.abbrev + "/" + fs.readdirSync(dir)[1];
  thing.push(teams.teams[i]);
}
teams.teams = thing;
console.log(teams.teams)

fs.writeFileSync("teams.json", JSON.stringify(teams));