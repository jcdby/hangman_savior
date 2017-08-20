

describe('Savior Test', ()=>{

  let Savior;
  let savior;

  beforeEach(() => {
    Savior = require('./Savior');
    savior = new Savior('jcdby@hotmail.com');
  })

  test('Should Savior not null', () => {
    expect(savior).not.toBeNull();
  });

  test('Should have savior id', () => {
    let saviorId = savior.getSaviorId();
    expect(saviorId).toBe("jcdby@hotmail.com");
  });

  test('Should get knowledge about english.', () => {
    let dict_file_path = './words_alpha.txt';
    try{
      savior.learnEnglish(dict_file_path);
      let saviorKnowledge = savior.getKnowledge();
      expect(saviorKnowledge.dic).not.toBeNull();
      expect(saviorKnowledge.lettersFreq).not.toBeNull();
      expect(saviorKnowledge.dict).toBeInstanceOf(Object);
      expect(saviorKnowledge.lettersFreq).toBeInstanceOf(Array);
      expect(saviorKnowledge.backupFreq).not.toBeNull();
      expect(saviorKnowledge.backupFreq).toBeInstanceOf(Array);
      
    }catch(err){
      console.error('Seems like there is something wrong with file open.');
      return false;
    }
  });

  




})