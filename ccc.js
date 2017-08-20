let fs = require('fs');

fs.readFile('./words_alpha.txt','utf-8', (err, data)=>{
  if(err) throw err;
  let mydic = [];

  data = data.split(/\r+\n/);
  let arr = [];
  arr.length = 27;

  console.log(arr.length)

  data.forEach(function(element) {
    // console.log(typeof arr[element.length])
    if(!Array.isArray(arr[element.length])){
      arr[element.length] = [];
    }
    arr[element.length].push(element);
  }, this);

  console.log(arr[6])
})