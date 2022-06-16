const express = require('express')
const app = express()
const port = 3000;
const gcpService = require( "./gcp" );
const mockML = require( "./mockML" );

var formidable = require('formidable');
var fs = require('fs');


const path = require('path');

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

var form = new formidable.IncomingForm();
//Spara bilden i resource mappen
form.parse(req, async (err, fields, files) => {
  const event = (fields, path) => ({
    label : fields.label, 
    text: fields.text,
    location: {
      lon: fields.lon,
      lat: fields.lat 
    },
    imagePath: path
  })
  var oldpath = files.file.filepath;
  var newpath = path.resolve("./resources/" + files.file.originalFilename)
  var rawData = fs.readFileSync(oldpath)

  fs.writeFileSync(newpath, rawData, function(err){
      if(err) console.log(err)
      return res.send("Successfully uploaded")
  })

  const imageLabels = await gcpService.imageLabels( event(fields, newpath).imagePath);
  return imageLabels;
}) 


let success = true; 

res.setHeader('Content-Type', mimeTypes['.json']);
res.status(200).json({success});
});


app.get('/', function (req, res) {
  res.send('Hello World')
})


console.log("App listening on port: " + port);
app.listen(port);