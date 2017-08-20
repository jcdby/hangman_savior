

describe('Savior Test', ()=>{

  let Savior;
  let savior;
  let wordToGuess; 

  beforeEach(() => {
    Savior = require('./Savior');
    savior = new Savior('example@example.com');
    wordToGuess = '*****';
    savior.setLengthByWordToGuess(wordToGuess);
  })

  test('Should Savior not null', () => {
    expect(savior).not.toBeNull();
  });


  test('Should have savior id', () => {
    let saviorId = savior.getSaviorId();
    expect(saviorId).toBe("example@example.com");
  });


  test('Should get the length of the word to be guessed.', () => {
    let lengthOfWordToGuess = savior.getLengthForWordToGuess();
    expect(lengthOfWordToGuess).toEqual(wordToGuess.length);
    
  })


  test('Should throw a error when not to give learnEnglish method a parameter about path.', () => {
    expect(()=>{
      savior.learnEnglish()
    }).toThrow();
    expect(() => {
      savior.learnEnglish(' ')
    }).toThrow();
  });

  test('Should throw error when the type of path is not String.', () => {
    expect(() => {
      savior.learnEnglish(1);
    }).toThrowError('The path should be String!')
  })

  test('Should not throw error when learnEnglish get a path(validated path string) parameter.', () => {
    expect(() => {
      savior.learnEnglish('./words_alpha.txt')
    }).not.toThrow();
  });

  test('Should throw error when file is not exist.', () => {
    expect(() => {
      savior.learnEnglish('noFile');
    }).toThrow();
  });


  test('Should get knowledge about english.', () => {
      let dict_file_path = './words_alpha.txt';
      savior.learnEnglish(dict_file_path);
      let saviorKnowledge = savior.getKnowledge();
      expect(saviorKnowledge.dict).not.toBeNull();
      expect(saviorKnowledge.lettersFreq).not.toBeNull();
      expect(saviorKnowledge.dict).toBeInstanceOf(Object);
      expect(saviorKnowledge.lettersFreq).toBeInstanceOf(Array);
      expect(saviorKnowledge.backupFreq).not.toBeNull();
      expect(saviorKnowledge.backupFreq).toBeInstanceOf(Array);
  });

  test('Should update savior`s dict by the length of the word to be gussed.', () => {
    let old_dict = ['good','a','bb','cooler','sdfjoijeifj','fjkdjjfd','ss','wordl', 'word','world'];
    let expect_dict = ['wordl', 'world'];
    savior.setLengthByWordToGuess('*****');
    let new_dict = savior.updateDictByWordLength(old_dict,savior.getLengthForWordToGuess());
    expect(new_dict.length).toEqual(expect_dict.length);

    for(let i = 0; i < new_dict.length; i++){
      expect(new_dict[i]).toEqual(expect_dict[i]);
    }
  });

  test('Should return empty array when the first parameter of updateDictByWordLength was empty.', () => {
    let old_dict = [];
    expect(savior.updateDictByWordLength(old_dict, 5).length).toEqual(0);
  })


  test('Should throw error when updateDictByWordLength`s first parameter is not array and second parameter is not Number.', () => {
    expect(() => {
      let new_dict = savior.updateDictByWordLength({}, 5);
    }).toThrowError('First parameter should be a array!');

    expect(() => {
      let new_dict = savior.updateDictByWordLength([], '5');
    }).toThrowError('Second parameter should be a number!');

    expect(() => {
      let new_dict = savior.updateDictByWordLength();
    }).toThrow();

  });

  test('Should update savior`s dict by the wrong letter gussed.', () => {
    let old_dict = ['good','a','bb','cooler','sbfjoijeifj','fjkdjjfd','sb','wordl', 'word','world'];
    let expect_dict = ['good','a','cooler','fjkdjjfd','wordl', 'word','world']
    let wrong_letter = 'b';
    let new_dict = savior.updateDictByLetter(old_dict, wrong_letter);
    expect(new_dict.length).toEqual(expect_dict.length);

    for(let i = 0; i < expect_dict.length; i++){
      expect(new_dict[i]).toEqual(expect_dict[i]);
    }
    
  });

  test('Should throw error when updateDictByLetter`f first parameter is not array and second parameter is not string.', () => {
    expect(() => {
      let new_dict = savior.updateDictByLetter({},'a');
    }).toThrowError('First parameter should be a array!');

    expect(() => {
      let new_dict = savior.updateDictByLetter([], 5);
    }).toThrowError('Second parameter should be a string');
  });

  test('Should return empty array when the fist parameter of the updateDictByLetter was empty.', () => {
    let old_dict = [];
    expect(savior.updateDictByLetter(old_dict,'b').length).toEqual(0);
  });


  test('Should throw error if updateDictByLetter has a third parameter which is not a number', () => {
    expect(() => {
      let new_dict = savior.updateDictByLetter([], 'b', '5');
    }).toThrowError('The Third parameter should be a number');
  });

  test('Should return right new dict according to the correct letter and its position.', () => {
    let old_dict = ['good','gooa','bood','cood','sbjd','fjkw','sbbe','word', 'wore','worl'];
    let correct_letter = 'd';
    let correct_position = 3; //0-based range in a word;
    let expect_dict = ['good','bood','cood','sbjd','word'];
    savior.setLengthByWordToGuess('****');

    let new_dict = savior.updateDictByLetter(old_dict, correct_letter, correct_position);

    for(let i = 0; i < expect_dict.length; i++){
      expect(new_dict[i]).toEqual(expect_dict[i]);
    }


  })





})