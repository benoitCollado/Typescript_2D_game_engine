import {Game} from "./Game"
import {ComponentType, TransformComponent, RenderComponent} from "./ECS/Components/Component";
import { EntityManager } from "./ECS/EntityManager";
import Vector2D from "./ECS/utils/Vector2D";
import Layer from "./ECS/utils/Layer";
import Texture from "./ECS/utils/Texture";
import PolygonTexture from "./ECS/utils/PolygonTexture";
export const game = new Game('premier jeux');


window.onload = () =>{

  game.resize();

  const firstWorld = game.createWorld("premiere scene");

  const player = firstWorld.entityManager.createEntity();
  const enemy = firstWorld.entityManager.createEntity();
  const tileMapEntity = firstWorld.entityManager.createEntity();

  game.setCurrentWorld("premiere scene");


  const transform = firstWorld.componentManager.factory.createTransformComponent(player,100, 100) as TransformComponent;
  const render = firstWorld.componentManager.factory.createRenderComponent(player);
  const input = firstWorld.componentManager.factory.createInputComponent(player);
  const controller = firstWorld.componentManager.factory.createPlayerControllerComponent(player);
  const grid = firstWorld.componentManager.factory.createGridComponent(player);
  grid.interpolation.origin = transform.position ;

  const layer = new Layer([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],false);

  const blockingLayer = new Layer([
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
      ],true);

  const layerMap : Map<string,Layer> = new Map()
  layerMap.set("background", layer);
  layerMap.set("blockingBackground", blockingLayer);

  const textures : Map<number,Texture> = new Map()

  const grassPolygon : PolygonTexture = new PolygonTexture([new Vector2D(0,0),
                                                           new Vector2D(10,0),
                                                           new Vector2D(10,10),
                                                           new Vector2D(0,10)], 
                                                          new Vector2D(0,0),
                                                          "rgb(50,200,120)",
                                                          true);
  const grassTexture: Texture = new Texture(grassPolygon);
  
  const dirtPolygon : PolygonTexture = new PolygonTexture([new Vector2D(0,0),
                                                           new Vector2D(10,0),
                                                           new Vector2D(10,10),
                                                           new Vector2D(0,10)], 
                                                            new Vector2D(0,0),
                                                          "rgb(110,50,5)",
                                                          true);
  const dirtTexture: Texture = new Texture(dirtPolygon);

  textures.set(1,grassTexture);
  textures.set(2,dirtTexture);

  const tileMapComponent = firstWorld.componentManager.factory.createTileMapComponent(tileMapEntity, new Vector2D(10,10),layerMap, textures,[]);

  game.initWorld();
  game.run(0);
  
}

window.onresize = () => {
  game.resize();
}




/*
// Exemple d'utilisation
function demo() {
  
  
  // Créer quelques entités
  const player = world.entityManager.createEntity();
  const enemy = world.entityManager.createEntity();

  // Ajouter des composants aux entités
  world.componentManager.addComponent<PositionComponent>(player, ComponentType.Position, {x: 100, y: 100 });
  world.componentManager.addComponent<VelocityComponent>(player, ComponentType.Velocity, { x: 1, y: 1 });
  world.componentManager.addComponent<RenderComponent>(player, ComponentType.Render, { color: 'blue', shape: 'circle', width: 10, height: 10 });

  world.componentManager.addComponent<PositionComponent>(enemy, ComponentType.Position, { x: 100, y: 100});
  world.componentManager.addComponent<RenderComponent>(enemy, ComponentType.Render, { color: 'red', shape: 'rectangle', width: 15, height: 20 });

  // Simuler quelques frames de jeu
  console.log("--- Frame 1 ---");
  world.update(1.0);

  console.log("\n--- Frame 2 ---");
  world.update(1.0);

  // Ajouter de la vitesse à l'ennemi
  world.componentManager.addComponent<VelocityComponent>(enemy, ComponentType.Velocity, { x: -0.5, y: 0 });

  console.log("\n--- Frame 3 (après ajout de vitesse à l'ennemi) ---");
  world.update(1.0);
}

// Exécuter la démo
demo();
*/