

describe('Savior Test', ()=>{

  let Savior;
  let savior;
  let wordToGuess; 
  let playerId  = 'jcdby@hotmail.com'

  beforeEach(() => {
    Savior = require('./Savior');
    savior = new Savior();
    savior.setSaviorId(playerId);
    wordToGuess = '*****';
    savior.setLengthByWordToGuess(wordToGuess);
  });


  describe('1. Init test', () => {
    test('Should Savior not null', () => {
      expect(savior).not.toBeNull();
    });


    test('Should have savior id', () => {
      let saviorId = savior.getSaviorId();
      expect(saviorId).toBe(playerId);
    });

    test('Should return a right savior id after using savior id set method.', () => {
      let saviorId = 'example@example.com';
      savior.setSaviorId(saviorId);
      expect(savior.getSaviorId()).toEqual(saviorId);
    })


    test('Should get the length of the word to be guessed.', () => {
      let lengthOfWordToGuess = savior.getLengthForWordToGuess();
      expect(lengthOfWordToGuess).toEqual(wordToGuess.length);
    });

    test('Should set file path through constructor.', () => {
      let wordFilePath ='./words_test.txt';
      let savior = new Savior('test@example.com', wordFilePath);
      expect(savior.getWordFilePath()).toEqual(wordFilePath);
    })

  });


  describe('2. Savior learns english', () => {
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
        expect(saviorKnowledge.dict).toBeInstanceOf(Object);
        expect(saviorKnowledge.lettersFreq).toBeInstanceOf(Array);
        expect(saviorKnowledge.wordDict).toBeInstanceOf(Array);
        expect(saviorKnowledge.guessedLetter).toBeInstanceOf(Array);
        expect(typeof saviorKnowledge.backupFreq).toEqual('string');
        expect(typeof saviorKnowledge.lastGuess).toEqual('string');
    });


    test('Should set and get files path.', () => {
      let dict_file_path = './words_test.txt';
      savior.setWordFilePath(dict_file_path);
      expect(savior.getWordFilePath()).toEqual(dict_file_path);
    });


    test('Should get dict from file and store them by these words` length.', () => {
      let dict_file_path = './words_test.txt';
      let fs = require('fs');
      let read_string = fs.readFileSync(dict_file_path,'utf-8');
      let readed_dict = read_string.split(/\r|\n/);
      let expect_dict = {};

      readed_dict.forEach(function (element) {
        if(!expect_dict.hasOwnProperty(element.length)){
          expect_dict[element.length] = [];
        }
        expect_dict[element.length].push(element);
      })

      savior.learnEnglish(dict_file_path);
      let saviorKnowlege = savior.getKnowledge();
      expect(saviorKnowlege.dict).toEqual(expect_dict);

    });


  });


  describe('3. Savior updates his dict.', () => {

    test('Should update savior`s dictByLength after update its dict by its length.', () => {
      //be previors test has already update the dict sorted by length.
      let expect_dict = ['wordl', 'world'];
      let length = 5;
    })


    test('Should throw error when the parameter of the setLengthByWordToGuess is not a string.', () => {
      expect(() => {
        savior.setLengthByWordToGuess(2);
      }).toThrowError('The parameter of setLengthByWordToGuess should be a string.')
    })



    test('Should update savior`s dict by the wrong letter gussed.', () => {
      let old_dict = ['good','a','bb','cooler','sbfjoijeifj','fjkdjjfd','sb','wordl', 'word','world'];
      let wrong_letter = 'b';
      //All wolds including character b should be removed from old_dict.
      let expect_dict = ['good','a','cooler','fjkdjjfd','wordl', 'word','world'];

      let new_dict = savior.updateDictByLetter(old_dict, wrong_letter);
      expect(new_dict.length).toEqual(expect_dict.length);

      for(let i = 0; i < expect_dict.length; i++){
        expect(new_dict[i]).toEqual(expect_dict[i]);
      }
      
    });

    test('Should set and get lastGuess.', () => {
      let expect_letter = 'A';
      savior.setLastGuess(expect_letter);
      expect(savior.getLastGuess()).toEqual(expect_letter);
    })

    test('Should correctly return the most frequent letter when there is no lastGuess.', () => {
      let lastGuess = savior.getLastGuess();
      expect(savior.getLastGuess()).toEqual('');
      let wordToGuess = '****';
      savior.myKnowledge.dict = {
        4: ['aabb', 'bbcc', 'fjibd','ebifs']
      };

      jest.mock('./request.js', () => {
        return 0;
      });

      savior.makeGuess('sessionid', wordToGuess);
      expect(savior.getLastGuess()).toEqual('b');

    });

    test('Should correctly return the most frequent letter when there is lastGuess and the word to guess includes the same letter as lastGuess.', () => {

    });

    test('Should correctly return the most frequent letter when there is lastGuess and the word to guess does not include the same letter as lastGuess.', () => {

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
      expect(() => {
        let new_dict = savior.updateDictByLetter([], 'b', []);
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
    });
  });

  describe('4. Savior updates the next letter to guess', () => {
    //Start of Describe 4

    test('Should return the last guessed letter after setting it.', () => {

    })


    test('Should return the letter which is appeared in most words.', () => {
      let dict = ['gooad','gooa','boooooooooooooooooooooooooad','cooad','sbjad','fjkw','sbbe','worad', 'wooare','wooarl'];
      let expect_letter = 'a'; //It counts only once when the same letters appeared in the same word

      let next_letter = savior.getNextLetterToGuess(dict);
      expect(next_letter).toEqual(expect_letter);

    });

    test('Should throw error when dict includes non-string value.', () => {
      let dict = [2,3,4];
      expect(() => {
        let next_letter = savior.getNextLetterToGuess(dict);
      }).toThrowError('Your dict contains non-string value!');
    });


    test('Should return the first character in the backup freq collection and update the backup freq collection when the dict updated is empty.', () =>{
      let dict = [];
      let backup_letter_freq = 'eabiqwr';
      let updated_backup_letter_freq  = backup_letter_freq.slice(1);
      let expect_next_letter = backup_letter_freq.charAt(0);

      savior.setBackupLetterFreq(backup_letter_freq);

      let next_letter = savior.getNextLetterToGuess(dict);
      expect(next_letter).toEqual(expect_next_letter);
      expect(savior.getBackupLetterFreq()).toEqual(updated_backup_letter_freq);

    });

    test('Should throw error when the first parameter of the getNextLetterToGuess is not a valid array.', () => {
      expect(() => {
        savior.getNextLetterToGuess({});
      }).toThrowError('The first parameter should be a array.');
      expect(() => {
        savior.getNextLetterToGuess([]);
      }).not.toThrowError('The first parameter should be a array.');
    });

    test('Should set a backup collection about letter frequecy and get it', () => {
      let backup_letter_freq = 'eabiqwr';
      savior.setBackupLetterFreq(backup_letter_freq);
      expect(savior.getBackupLetterFreq()).toEqual(backup_letter_freq);
    });

    test('Should throw error when the parameter of setBackupLetterFreq is not a string.', () => {
      expect(() => {
        savior.setBackupLetterFreq([]);
      }).toThrowError('The parameter should be a string!');
    });

  //End of Describe 4
  }); 

  describe('5. Savior will save the man to be hanged.', () => {
    //Start of Describe 5

    test('Savior should get right dict after calling startGame.', () => {
      let wordFilePath = './words_test.txt';
      savior.setWordFilePath(wordFilePath);

      let fs = require('fs');
      let read_string = fs.readFileSync(wordFilePath,'utf-8');
      let readed_dict = read_string.split(/\r|\n/);
      let expect_dict = {};

      readed_dict.forEach(function (element) {
        if(!expect_dict.hasOwnProperty(element.length)){
          expect_dict[element.length] = [];
        }
        expect_dict[element.length].push(element);
      })

      jest.mock('./request.js', () => {
        return jest.fn(() => {
          return new Promise((resolve) =>{
            setTimeout(function() {
              resolve({
                sessionId:'someid'
              })
            }, 10);
          })
        })
      });


      return savior.startGame().then(res =>{
        expect(savior.getKnowledge().dict).toEqual(expect_dict);
      })
    });

    test('Should update wordDict acording to the length of the word from server.', () => {

    })


    test('Should return error message after getting next word but there is no word in the response.', () => {
      jest.spyOn(savior, 'getNextWord').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({
              data:{
                noword: 'noword'
              }                 
            });
          }, 10);
        });
      });

      return savior.gettingNextWordLoop('sessionID')
                .catch(err => {
                  expect(err).toEqual(new Error('There is no word in response!'))
                });
    });

    test('Should throw error if the function of makeGuess does not have wordToGuess parameter.',() => {
      expect(()=>{savior.makeGuess('sessionid')}).toThrowError('There is no word to guess!');
    });

    test('Should set the wordDict at the first time to get next word', () => {
      let wordFilePath = './words_test.txt';
      savior.setWordFilePath(wordFilePath);

      let fs = require('fs');
      let read_string = fs.readFileSync(wordFilePath,'utf-8');
      let readed_dict = read_string.split(/\r|\n/);
      let expect_dict = {};

      readed_dict.forEach(function (element) {
        if(!expect_dict.hasOwnProperty(element.length)){
          expect_dict[element.length] = [];
        }
        expect_dict[element.length].push(element);
      });

      let expect_wordDict = expect_dict['****'.length];

     jest.spyOn(savior, 'getNextWord').mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({
              data:{word:'****'}
            });
          }, 10);
        })
      })
        .mockImplementationOnce(() =>{
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({message: 'No more word to guess'});
            }, 10);
          });
        });

      jest.spyOn(savior, 'makeGuess').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({message: 'No more guess left'});
          }, 10);
        });
      });

      savior.learnEnglish(wordFilePath);

       return savior.gettingNextWordLoop('sessionid').then((res) => {
         expect(savior.getWordDict()).toEqual(expect_wordDict);

       })
    });


    test('Should return error message when savior play game with wrong player id.', () => {
      const err_message = 'Player does not exist';
      const spy_startGame = jest.spyOn(savior, 'startGame').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({message: err_message})
          }, 10);
        });
      });
      return savior.play().catch((err) => {
        expect(err).toEqual(new Error(err_message));
      });   

    });

    test('Should return result when there is no word to guess.', () => {
      const fake_result = {
        message: "GAME OVER",
        sessionId: "3f0421bb5cb56631c170a35da90161d2",
        data: {
          playerId: "test@example.com",
          sessionId: "3f0421bb5cb56631c170a35da90161d2",
          totalWordCount: 80,
          correctWordCount: 77,
          totalWrongGuessCount: 233,
          score: 1307,
          datetime: "2014-10-28 11:45:58"
        }
      };
      const spy_startGame = jest.spyOn(savior, 'startGame').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({sessionId:'1111'});
          }, 10);
        })
      });
      const spy_getNextWord = jest.spyOn(savior, 'getNextWord').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({message: 'No more word to guess'});
          }, 10);
        });
      });
      const spy_getResult = jest.spyOn(savior, 'getResult').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve(fake_result);
          }, 10);
        });
      });

      return savior.play().then(res => {
        expect(res).toEqual(fake_result);
      });

    });

    test('Should get result when there is no more guess left and there is no more word to guess.', () => {
      const fake_result = {
        message: "GAME OVER",
        sessionId: "3f0421bb5cb56631c170a35da90161d2",
        data: {
          playerId: "test@example.com",
          sessionId: "3f0421bb5cb56631c170a35da90161d2",
          totalWordCount: 80,
          correctWordCount: 77,
          totalWrongGuessCount: 233,
          score: 1307,
          datetime: "2014-10-28 11:45:58"
        }
      };

      const spy_startGame = jest.spyOn(savior, 'startGame').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({sessionId:'1111'})
          }, 10);
        });
      });


      const spy_getNextWord = jest.spyOn(savior, 'getNextWord').mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({
              sessionId: "1111",
              data: {
                word: "*****",
                totalWordCount: 1,
                wrongGuessCountOfCurrentWord: 0
              }
            });
          }, 10);
        });
      })
      .mockImplementationOnce(() =>{
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({message: 'No more word to guess'});
          }, 10);
        });
      });
    
      const spy_makeGuess = jest.spyOn(savior, 'makeGuess').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve({message: 'No more guess left'});
          }, 10);
        });
      });


      const spy_getResult = jest.spyOn(savior, 'getResult').mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(function() {
            resolve(fake_result);
          }, 10);
        });
      });

      return savior.play().then(res => {
        expect(res).toEqual(fake_result);
      });
    });
    
    test('Should get result after guessing all words and there is no more word to guess.', () => {
        const fake_result = {
          message: "GAME OVER",
          sessionId: "3f0421bb5cb56631c170a35da90161d2",
          data: {
            playerId: "test@example.com",
            sessionId: "3f0421bb5cb56631c170a35da90161d2",
            totalWordCount: 80,
            correctWordCount: 77,
            totalWrongGuessCount: 233,
            score: 1307,
            datetime: "2014-10-28 11:45:58"
          }
        };

        const spy_startGame = jest.spyOn(savior, 'startGame').mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({sessionId:'1111'})
            }, 10);
          });
        });

        const spy_getNextWord = jest.spyOn(savior, 'getNextWord').mockImplementationOnce(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({
                sessionId: "1111",
                data: {
                  word: "*****",
                  totalWordCount: 1,
                  wrongGuessCountOfCurrentWord: 0
                }
              });
            }, 10);
          });
        })
        .mockImplementationOnce(() =>{
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({message: 'No more word to guess'});
            }, 10);
          });
        });

        const spy_makeGuess = jest.spyOn(savior, 'makeGuess').mockImplementationOnce(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({
                sessionId: "1111",
                data: {
                  word: "****",
                  totalWordCount: 80,
                  wrongGuessCountOfCurrentWord: 1
                }
              });
            }, 10);
          });
        }).mockImplementationOnce(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({
                sessionId: "1111",
                data: {
                  word: "**DD",
                  totalWordCount: 80,
                  wrongGuessCountOfCurrentWord: 1
                }
              });
            }, 10);
          });
        }).mockImplementationOnce(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({
                sessionId: "1111",
                data: {
                  word: "*BDD",
                  totalWordCount: 80,
                  wrongGuessCountOfCurrentWord: 1
                }
              });
            }, 10);
          });
        }).mockImplementationOnce(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve({
                sessionId: "1111",
                data: {
                  word: "ABDD",
                  totalWordCount: 80,
                  wrongGuessCountOfCurrentWord: 1
                }
              });
            }, 10);
          });
        });

        const spy_getResult = jest.spyOn(savior, 'getResult').mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve(fake_result);
            }, 10);
          });
        });

        return savior.play().then(res => {
          expect(res).toEqual(fake_result);
        });

    });



  //End of describe 5
  });







});