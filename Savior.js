let fs = require('fs');
let request = require('./request');

class Savior {

  constructor(saviorId, filePath) {
    this.saviorId = saviorId || ''; 
    this.myKnowledge = {
      dict: {},//dict 包含按长度分类的子字典。
      wordDict: [], //根据当前获得的word的长度所保留的更新和计算字母频度用字典。
      guessedLetter: [], //已经猜过的字母数组。
      lastGuess:'', //上一次猜过的字幕
      lettersFreq: [],  //每次根据wordDict计算所得的字母频率数组
      backupFreq: '', //备用字母频率数组
    };
    this.length = 0;
    this.filePath = filePath || '';
  }

  setWordFilePath(path){
    this.filePath = path;
  }

  getWordFilePath() {
    return this.filePath;
  }

  setWordDict(length){
    this.myKnowledge.wordDict = this.myKnowledge.dict[length];
  }

  getWordDict() {
    return this.myKnowledge.wordDict;
  }

  setLastGuess(letter) {
    this.myKnowledge.lastGuess = letter;
  }

  getLastGuess() {
    return this.myKnowledge.lastGuess;
  }


  getNextLetterToGuess(dict) {
    let nextLetter = 'b';
    if(!Array.isArray(dict)){
      throw new Error('The first parameter should be a array.');
    }
    if(dict.length === 0){
      //服务器的单词没有收录在本地词典的情况下，调用备用频率表。
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


    let readed_string = fs.readFileSync(path, 'utf-8');
    let dict = readed_string.split(/\r|\n/);

    let dictByLength = {};

    //按照dict中单词的长度，将它们划分的各自的数组当中。
    dict.forEach(function(element) {
      if(!dictByLength.hasOwnProperty(element.length)){
        dictByLength[element.length] = [];
      }
      dictByLength[element.length].push(element);
    }, this);

    this.myKnowledge.dict = dictByLength
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
    };
    this.learnEnglish(this.filePath);

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


  /*
  pre-condition: There is wordToGuess and the word is still including * letter.
  */
  makeGuess(sessionId, wordToGuess){
    
    //when wordToGuess is not sent to makeGuess function correctly.
    if(!wordToGuess){
      throw new Error('There is no word to guess!');
    }

    let action = 'guessWord';
    //set the default next letter to guess to a
    let letterToGuess = 'A';
    let length = '' + wordToGuess.length;
    
    //The logic to get the letter to guess

    if(!this.getLastGuess()){
      let dict = this.getKnowledge().dict[length];
      letterToGuess = this.getNextLetterToGuess(dict);      
    }

    this.setLastGuess(letterToGuess);
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


  
  gettingNextWordLoop(sessionId){
    return this.getNextWord(sessionId)
      .then(res => {
        console.info(res);
        if(res.data && res.data.word) {
          let wordToGuess = res.data.word;
          this.setWordDict(wordToGuess.length);
          return this.makingGuessLoop(sessionId, wordToGuess);
        } else if(res.data && !res.data.word) { 
           throw new Error('There is no word in response!');
        }
      })
  }

  makingGuessLoop(sessionId, wordToGuess){
    return this.makeGuess(sessionId,wordToGuess)
             .then(res => {
               console.info(res);
               // 一个单词可以猜测的次数达到了上限。
               if(res.message && res.message === 'No more guess left'){
                 return this.gettingNextWordLoop(sessionId);
               }else {
                 if(res.data && res.data.word && res.data.word.includes('*')){
                   return this.makingGuessLoop(sessionId, wordToGuess);
                 }else {
                   //当res.data.word不包含 * 的情况。代表猜单词正确的情况。
                   return this.gettingNextWordLoop(sessionId);
                 }
               }
             })
  }


  play(){
    return this.startGame()
      .then(res => {
        console.info('start to play game!')
        console.info(res);
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
      .then(() => {
        console.info('start to getting result')
        return this.getResult();
      })
      .then(guess_result => {
        //print out guess_result
        console.info(JSON.stringify(guess_result));
        console.info('one game finished')
        return guess_result;
      });
  }

}

module.exports = Savior;