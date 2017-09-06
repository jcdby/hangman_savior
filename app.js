const Savior = require('./Savior');

const args = process.argv.slice(2)

const playerID = args[0];
const req_url = args[1];
const dictFilePath = args[2] || 'full_words.txt';

let savior = new Savior(playerID, dictFilePath, req_url);


savior.play();