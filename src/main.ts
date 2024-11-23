import { Engine } from "./engine/engine";
import { KeyBoardController } from "./engine/global/KeyBoardController";
let Game: Engine;
import {IMAGE_LOADER} from "./engine/ImageLoader";
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
  IMAGE_LOADER.loadImage("player", "./dist/assets/player.png");
  IMAGE_LOADER.loadImage("projectile", "./dist/assets/projectile.png");
};
window.addEventListener("AllImageLoaded", () =>{
  console.log("AllImageLoaded");
  Game.start();
})

window.onresize = () => {
  Game.resize();
};