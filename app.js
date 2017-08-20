let Savior = require('./Savior')

let savior = new Savior("jcdby@hotmail.com");
let args = process.argv.slice(2);




args.forEach(function(element) {
  console.log(element)
}, this);