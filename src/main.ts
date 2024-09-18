import { Engine } from "./engine";
let Game: Engine;

console.log("fichier javascript chargé");

window.onload = () => {
  Game = new Engine("gameCanvas");
  Game.start();
};

window.onresize = () => {
  Game.resize();
};