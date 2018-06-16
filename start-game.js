const inquirer = require('inquirer');

startGame()
.then((result) => {
  //clear();

});


async function startGame(){
  // log('keypress');
  // await keypress();
  let characterName = await getCharacterName();
  let message = `Hello ${characterName}. Welcome to Alt-Right-Delete.`;
  await messageWithPause(message);  
  return characterName;
}

async function getCharacterName() {
  clear();
  let question = [
    {
      type: 'input',
      name: 'characterName',
      message: 'Enter your Character Name:',
      default: 'Billy'
    }
  ];
  let answer = await inquirer.prompt(question);
  return answer.characterName;
};

async function messageWithPause(message){
  clear();
  log(message);    
  space();
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
    clear();
    console.log('ALT-RIGHT-DELETE!!!');
    process.exit();
  }
}

// async function keypress() {
//   process.stdin.setRawMode(true);
//   process.stdin.once('data', () => {
//     process.stdin.setRawMode(false)
//     return true;
//   });
// };

function clear(){
  console.clear();
}

function log(obj){
  console.log(obj);
}

function space(){
  log('\n\n\n');
}