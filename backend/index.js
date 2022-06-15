const express = require('express')
const app = express()
const port = 3000;
var formidable = require('formidable');
var fs = require('fs');

const mimeTypes = {
'.ico': 'image/x-icon',
'.html': 'text/html',
'.js': 'text/javascript',
'.json': 'application/json',
'.css': 'text/css',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.wav': 'audio/wav',
'.mp3': 'audio/mpeg',
'.svg': 'image/svg+xml',
'.pdf': 'application/pdf',
'.doc': 'application/msword'
};


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/kundservice', async (req, res, next) => {
console.log("Slår mot endpoint kundservice")
const event = (req) => ({
  label : req.body.label, 
  text: req.body.text,
  location: {
    lon: req.body.location.lon,
    lat: req.body.location.lat 
  }
})
var form = new formidable.IncomingForm();
//Spara bilden i resource mappen
form.parse(req, function (err, fields, files) {
  
  var oldpath = files.filetoupload.filepath;
  var newpath = './resources/' + files.filetoupload.originalFilename;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
  });
})
//Text Analys (Helsingborgsstad ML Engineers)
//Bild Analys (GCP)
//Skicka input vidare till ML 

let success = true; 

res.setHeader('Content-Type', mimeTypes['.json']);
res.status(200).json({success});
});


app.get('/', function (req, res) {
  res.send('Hello World')
})


console.log("App listening on port: " + port);
app.listen(port);