const inquirer = require('inquirer');
const colors = require('colors'); 

/*******************/
/* Game State      */
/*******************/

let character = {
  name: "",
  country: "",
  stats: {
    health: 100,
    power: 100
  }
};

let counter = {
  day: 0
};

/*******************/
/* Process         */
/*******************/

startGame()
.then((result) => {
  gameOver(result);
});


/********************/
/* Scene Functions  */
/********************/

async function startGame(){  
  await introduction();
  await sceneLoop();
  return 'YOU ACHIEVED NOTHING';
}

async function introduction(){
  await getCharacterInfo();
  let message = `Hello ` + `${character.name}`.bold.white + `. Welcome to Ctrl-Alt-Right-Delete.\n`;
  message += 'In this game you play as a fictional member of\n';
  message += 'the Alt-Right encountering various situations.\n';
  await messageWithPause(message);
  return true;  
}

async function sceneLoop(){
  const scenes = require('./scenes.json');
  await newDay();
  let randomSceneIndex = randomNumberBetween(0, (scenes.length - 1));
  let randomScene = scenes[randomSceneIndex];
  let answer = await inquirer.prompt(randomScene.question);
  console.log(`\n${answer.toQuestion}`);

  return true;
}

async function newDay(){
  counter.day++
  console.log(`\nDay: ${counter.day}`);
  console.log(`Health: ${character.stats.health}`);
  console.log(`Power: ${character.stats.power}\n`);
  return true;
}

/***********************/
/* Character Functions */
/***********************/

async function getCharacterInfo() {
  let questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter Your Character Name:',
      default: 'Milo'
    },
    {
      type: 'list',
      name: 'country',
      message: 'What Country Is Your Character From?',
      choices: [
        'USA'
      ]
    }    
  ];
  console.log('');
  let answers = await inquirer.prompt(questions);
  character.name = answers.name;
  character.country = answers.country;
  return true;
};


/********************/
/* Helper Functions */
/********************/

async function messageWithPause(message){
  
  console.log(`\n${message}`);
  let confirmation = [
    {
      type: 'confirm',
      name: 'continue',
      message: 'continue...'
    }
  ];
  let answer = await inquirer.prompt(confirmation);
  let continuePlaying = answer.continue;
  if(continuePlaying){
    return true;
  } else {
    gameOver('YOU QUIT');
  }
}

function gameOver(failMessage){
  console.log('\nGAME OVER'.bold.white);
  console.log(`${failMessage}\n`.bold.red);
  process.exit();
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}