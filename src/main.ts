import { Engine } from "./engine/engine";
import { KeyBoardController } from "./engine/global/KeyBoardController";
let Game: Engine;
import {IMAGE_LOADER} from "./engine/ImageLoader";
export let KEYBOARD: KeyBoardController = new KeyBoardController();
export let invisible_part : HTMLElement;
import test from "./test"

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
  test();
  Game = new Engine("gameCanvas");
  IMAGE_LOADER.loadImage("player", "./dist/assets/player.png");
  IMAGE_LOADER.loadImage("projectile", "./dist/assets/projectile.png");
  invisible_part = document.createElement("p");
  invisible_part.style.visibility = "hidden";
  document.body.appendChild(invisible_part);
};
window.addEventListener("AllImageLoaded", async () =>{
  console.log("AllImageLoaded");
  await Game.start();
})

window.onresize = () => {
  Game.resize();
};