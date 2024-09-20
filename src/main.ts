import { Engine } from "./engine/engine";
import { KeyBoardController } from "./engine/global/KeyBoardController";
let Game: Engine;
export let KEYBOARD: KeyBoardController = new KeyBoardController();
/*
function *integers(){
  let n = 0;
  while(true){
      yield ++n;
  }
}

const sequence = integers();

console.log(sequence.next().value); // > 1
console.log(sequence.next().value); // > 2
console.log(sequence.next().value); // > 3
console.log(sequence.next().value); // > 4

console.log("fichier javascript chargé");
*/
window.onload = () => {
  Game = new Engine("gameCanvas");
  Game.start();
};

window.onresize = () => {
  Game.resize();
};