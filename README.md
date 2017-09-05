## Introduction
This test is based on the famous [Hangman Game](https://en.wikipedia.org/wiki/Hangman_(game)). My task is to write a program to play Hangman, guessing words from Strikingly`s server through a RESTful API.

## Applied Algorithm
[A Better Strategy for Hangman](http://lifehacker.com/5898720/a-better-strategy-for-hangman) is the best algorithm to play hangman. And the my result proved it.

## Key Points to Play Hangman
- The right english words list
- The right algorithm(the algorithm above)


## Enviroment
- node v6.11.0
- npm 3.10.10

## Instruction to Run
- npm install
- node app.js [yourid] [requestURL] [dict_path] (the default value of dict_path is ./full_words.txt,you could use your dict);
  - yourid: the playerID you get from Strikingly.
  - requestURL: 
  - dict_path: a english words list.
  - eg: node run app.js yourid@strikingly.com OR node run app.js yourid@strikingly.com ./full_words.txt

## Test Coverage Results
- npm run test_coverage
- open ./coverage/index.html

## Requirements
- For front-end applicants: write a JavaScript/CoffeeScript program according to the following specifications. When you run the program, the program should play the game automatically. When you're happy with your score, submit your score to us.
- PLEASE KEEP "Request URL" and "Player ID" STRICTLY CONFIDENTIAL.


## Game flow
Please go the [here](https://github.com/joycehan/strikingly-interview-test-instructions/tree/new)

## Scores
- totalWordCount:80,
- correctWordCount:80,
- totalWrongGuessCount:175,
- score:1425,
- datetime:"2017-09-05 21:50:00"