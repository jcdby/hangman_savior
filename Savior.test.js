

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


  test('Should throw a error when not to give learnEnglish method a parameter about path.', () => {
    expect(()=>{savior.learnEnglish()}).toThrow();
    expect(() => {savior.learnEnglish(' ')}).toThrow();
  });

  test('Should throw error when the type of path is not String.', () => {
    expect(() => {
      savior.learnEnglish(1);
    }).toThrowError('The path should be String!')
  })

  test('Should not throw error when learnEnglish get a path(validated path string) parameter.', () => {
    expect(() => {savior.learnEnglish('./words_alpha.txt')}).not.toThrow();
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







})