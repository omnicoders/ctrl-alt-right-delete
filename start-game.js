const inquirer = require('inquirer');
const colors = require('colors'); 

/*******************/
/* Game State      */
/*******************/

let character = {
  name: ""
};


/*******************/
/* Process         */
/*******************/

startGame()
.then((result) => {
  console.log('\nGAME OVER'.bold.white);
  console.log('YOU FAILED\n'.bold.red);
});


/********************/
/* Scene Functions  */
/********************/

async function startGame(){  
  await introduction();
  return true;
}

async function introduction(){
  character.name = await getCharacterName();
  let message = `Hello ` + `${character.name}`.bold.white + `. Welcome to Ctrl-Alt-Right-Delete.\n`;
  message += 'In this game you play as a fictional member of\n';
  message += 'the ' + 'Alt-Right'.bold.red + ' encountering various situations\n';
  message += 'in which you must avoid being a victim of white genocide.\n';
  await messageWithPause(message);
  return true;  
}



/***********************/
/* Character Functions */
/***********************/

async function getCharacterName() {
  let question = [
    {
      type: 'input',
      name: 'characterName',
      message: 'Enter your Character Name:',
      default: 'Milo'
    }
  ];
  console.log('');
  let answer = await inquirer.prompt(question);
  return answer.characterName;
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
    console.log('\nGAME OVER'.bold.white);
    console.log('YOU QUIT\n'.bold.red);
    process.exit();
  }
}
