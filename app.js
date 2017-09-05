let Savior = require('./Savior');

let args = process.argv.slice(2);

let playerID = args[0];
let dictFilePath = args[1] || './full_words.txt';


let savior = new Savior(playerID, dictFilePath);


savior.play();