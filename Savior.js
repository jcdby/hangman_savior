let fs = require('fs');
let request = require('./request');

class Savior {

  constructor(saviorId) {
    this.saviorId = saviorId;
    this.myKnowledge = {};
    this.length = 0;
  }


  getNextLetterToGuess(dict) {
    let nextLetter = 'b';
    if(!Array.isArray(dict)){
      throw new Error('The first parameter should be a array.');
    }
    if(dict.length === 0){
      let backupletters = this.myKnowledge.backupFreq;
      nextLetter = backupletters.charAt(0);
      this.setBackupLetterFreq(backupletters.slice(1));
      return nextLetter;
    }

    //随机设置一个字母表示字典里出现频率较高的字母。
    let freq = {availableLetter: 'a'};

    //遍历字典
    dict.forEach((word) => {
      if(typeof word !== 'string'){
        throw new Error('Your dict contains non-string value!');
      }
      //每个单词里面所包含的字母集合
      let lettersIncluded = {};
      for(let i = 0; i < word.length; i++){
        let letter = word.charAt(i);
        //确保相同的字母只出现一次。
        lettersIncluded[letter] = letter
      }

      //根据单词里出现的字母，增加字典里其字母出现的次数。
      for(let key in lettersIncluded){
        if(typeof freq[key] === 'number'){
          //这个字母已经在之前单词出现过的情况。
          freq[key]++;
        }else{
          //这个字母第一次出现的情况。
          freq[key] = 1;
        }

        //由于初始化的时候指定availableLetter为a，但在字典中的单词里很有可能不包含a，所以检查其有效性。若此字母的出现的次数已经被计算，那么其类型应该为number。
        if(!freq[freq.availableLetter] || typeof freq[freq.availableLetter] === 'number' && freq[key] > freq[freq.availableLetter]){
          freq.availableLetter = key;
        }
      }
    });


    nextLetter = freq.availableLetter;

    return nextLetter;
  }


  setBackupLetterFreq(backup_letter_freq) {
    if(typeof backup_letter_freq !== 'string'){
      throw new Error('The parameter should be a string!');
    }
    this.myKnowledge.backupFreq = backup_letter_freq;
  }

  getBackupLetterFreq() {
    return this.myKnowledge.backupFreq;
  }

  setLengthByWordToGuess(wordToGuess){
    if(typeof wordToGuess !== 'string'){
      throw new Error('The parameter of setLengthByWordToGuess should be a string.');
    }
    this.length = wordToGuess.length;    
  }

  getLengthForWordToGuess(){
    return this.length;
  }

  learnEnglish(path) {
    if(arguments.length === 0 || !path ){
      throw new Error('You should input a path!');
    }
    if(arguments.length === 1 && typeof path === 'string') {
      path = path.trim();
    }else{
      throw new Error('The path should be String!');
    }
    if(!fs.existsSync(path)){
      throw new Error('file not existed!');
    }




    this.myKnowledge = {
      dict: {},
      lettersFreq: [],
      backupFreq: ''
    }
  }


  getKnowledge() {
    return this.myKnowledge;
  }

  getSaviorId() {
    return this.saviorId;
  }

  setSaviorId(id) {
    this.saviorId = id;
  }

  updateDictByWordLength(old_dict, word_length) {
    if(!Array.isArray(old_dict)){
      throw new Error('First parameter should be a array!')
    }
    if(arguments.length === 2 && typeof word_length !== 'number'){
      throw new Error('Second parameter should be a number!');
    }

    let new_dict = []
    old_dict.forEach((el) => {
      if(el.length === word_length){
        new_dict.push(el);
      }
    })

    return new_dict;
  }

  updateDictByLetter(old_dict, letter, position){
    if(!Array.isArray(old_dict)){
      throw new Error('First parameter should be a array!');
    }
    if(arguments.length === 2 && typeof letter !== 'string'){
      throw new Error('Second parameter should be a string');
    }
    if(arguments.length === 3 && typeof position !== 'number'){
      throw new Error('The Third parameter should be a number');
    }
    let new_dict = [];


    // 当parameter只有两个的时候，代表的是savior猜错了字母。使用这个错误的字母更新字典。
    if(arguments.length === 2){
      new_dict = old_dict.filter((el) => {
        return !el.includes(letter);
      })
    }

    // 当parameter有3个的时候，代表的是savior猜正确了字母。使用这个正确的字母和其在单词中间的位置信息更新字典。
    if(arguments.length === 3){
      let reg = [];
      for(let i = 0; i < this.getLengthForWordToGuess(); i++){
        reg.push('.');
      }
      reg[position] = letter; //zero-based range
      reg = reg.join(''); 

      reg = new RegExp(reg, 'i','g');

      new_dict = old_dict.filter((el) => {
        return reg.test(el);
      })

    }
    return new_dict;
  }


  startGame(){
    let playerID = this.getSaviorId();
    let action = 'startGame';
    let data = {
      playerID: playerID,
      action: action
    }

    return request(data)
  }

  getNextWord(sessionId){
    let action = 'nextWord';
    
    let data = {
      sessionId: sessionId,
      action: action
    };    
    
    return request(data);

  }

  makeGuess(sessionId){
    let action = 'guessWord';
    //set the default next letter to guess to a
    let letterToGuess = 'A';

    //the logic to get the letter to guess
    /*
    do something here.
    */


    //make sure the letter be upper case;
    letterToGuess = letterToGuess.toUpperCase();

    let data = {
      sessionId: sessionId,
      action: action,
      guess: letterToGuess
    };
    
    return request(data);
  }

  getResult(sessionId){
    let action = 'getResult';
    let data = {
      sessionId: sessionId,
      action: action
    };


    return request(data);

  }

  submitResult(){

  }

  
  gettingNextWordLoop(sessionId){
    return this.getNextWord(sessionId)
      .then(res => {
        console.log(res.message);
        if(res.message && res.message !== 'No more word to guess'){
          return this.makingGuessLoop(sessionId);
        }
      })
      .then(() => {
        console.info('start to getting result')
        return this.getResult();
      });
  }

  makingGuessLoop(sessionId){
    return this.makeGuess(sessionId)
             .then(res => {
               if(res.message !== 'No more guess left'){
                 this.gettingNextWordLoop(sessionId);
               }else {
                 if(res.data && res.data.word && res.data.word.includes('*')){
                   this.makingGuessLoop(sessionId);
                 }else {
                   this.gettingNextWordLoop(sessionId);
                 }
               }
             })
  }


  play(){
    return this.startGame()
      .then(res => {
        if(res.message && res.message === 'Player does not exist'){
          //由于提供错误的player ID，抛出异常。
          throw new Error(res.message);
        }        
        
        return res.sessionId;
      })
      .then(sessionId => {
        //This part is only for guessing word.
        return this.gettingNextWordLoop(sessionId)
      })
      .then(guess_result => {
        //print out guess_result
        console.info(JSON.stringify(guess_result));
        return guess_result;
      });
  }

}

module.exports = Savior;