const inquirer = require('inquirer');

let character = {
  name: ""
};

startGame()
.then((result) => {
  console.log(result);
});


async function startGame(){  
  await introduction();
  return '\nGAME OVER\nResult: Complete Failure\n';
}

async function introduction(){
  character.name = await getCharacterName();
  let message = `Hello ${character.name}. Welcome to Ctrl-Alt-Right-Delete.\n`;

  await messageWithPause(message);
  return true;  
}

async function getCharacterName() {
  let question = [
    {
      type: 'input',
      name: 'characterName',
      message: 'Enter your Character Name:',
      default: 'Billy'
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
    console.log('ALT-RIGHT-DELETE!!!');
    process.exit();
  }
}
