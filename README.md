## Introduction
This test is based on the famous [Hangman Game](https://en.wikipedia.org/wiki/Hangman_(game)). My task is to write a program to play Hangman, guessing words from Strikingly`s server through a RESTful API.


## Key Points to Play Hangman
- The right english words list(The bigger the better!)
  - [Mieliestronk's list of more than](http://www.mieliestronk.com/wordlist.html)
- The right algorithm
  - [A Better Strategy for Hangman](http://lifehacker.com/5898720/a-better-strategy-for-hangman) is the best algorithm to play hangman. My result proved it.


## Enviroment
- node v6.11.0
- npm 3.10.10

## How to Run the Program
- ### npm install （In case you want to test it.There is only one dependency which is jest. Or, you can just go to the next step.）
- ### node app.js yourid requestURL [dict_path] (the default value of dict_path is ./full_words.txt,you could use your dict);
  - **yourid**: the playerID you get from Strikingly(confidential).
  - **requestURL**: the retuest url you get from Strikingly interview email(confidential).
  - **dict_path**: a english words list.(default is ./full_words.txt)
  - **eg**: 
    - node run app.js yourid@strikingly.com strikingly.com/sth/sth 
    - OR node run app.js yourid@strikingly.com strikingly.com/sth/sth ./full_words.txt

## Test Coverage Results
- npm run test_coverage
- open ./coverage/index.html
```
|------------|----------|----------|----------|----------|----------------|
|File        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
|------------|----------|----------|----------|----------|----------------|
|All files   |    95.89 |      100 |    93.75 |    95.89 |                |
| Savior.js  |     96.3 |      100 |    93.02 |     96.3 |... 347,348,354 |
| request.js |    93.33 |      100 |      100 |    93.33 |          43,44 |
|------------|----------|----------|----------|----------|----------------|

```
In the Savior.js, there are 2 functions which is not neccessary to test. That is the reason why the %Func is not 100%, but %Branch is 100%.


## Requirements
- For front-end applicants: write a JavaScript/CoffeeScript program according to the following [specifications](https://github.com/joycehan/strikingly-interview-test-instructions/tree/new). When you run the program, the program should play the game automatically. When you're happy with your score, submit your score to us.
- PLEASE KEEP "Request URL" and "Player ID" STRICTLY CONFIDENTIAL.


## Game flow
Please go the [here](https://github.com/joycehan/strikingly-interview-test-instructions/tree/new)

## Scores
- totalWordCount:80,
- correctWordCount:80,
- totalWrongGuessCount:175,
- score:1425,
- datetime:"2017-09-05 21:50:00"

## Besides
  - Methodology: TDD development.<br />
  Used TDD to develop my project to make sure that ever function acts as expected.<br />   
  - Backup letter frequency.<br />
  In case the volumn of the dictionary we added is less than that of Strikingly`s, which will make our savior(out program) has no letter to guess sometimes, I added a backup frequency to make sure that savior always can guess the next letter. 
  