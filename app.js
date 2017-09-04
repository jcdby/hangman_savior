let Savior = require('./Savior');

let args = process.argv.slice(2);

let plyerID = args[0];
let dictFilePath = args[1] || './words_alpha.txt';


let savior = new Savior(args[0],args[1]);


savior.play();