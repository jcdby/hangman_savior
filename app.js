let Savior = require('./Savior')

let args = process.argv.slice(2);

let savior = new Savior(args[0],args[1]);


savior.play();