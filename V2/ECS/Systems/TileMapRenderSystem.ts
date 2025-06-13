import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { System } from "./System";
import {TileMapComponent, ComponentType} from "../Components/Component"
import Vector2D from "../utils/Vector2D";
import EventQueue from "../Event/EventQueue";
import { EventMessage, EventType } from "../Event/Event";

export default class TileMapRenderSystem extends System{

  private context : CanvasRenderingContext2D;

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType,EventMessage>, context: CanvasRenderingContext2D){
    super(entityManager, componentManager, eventQueue);
    this.context = context;
  }
  
  update(deltaTime: number): void {
    const entities = this.componentManager.getEntitiesWithComponents([
      ComponentType.TileMap,
    ])

    this.context.save();
    this.context.scale(1.5,1.5);
    this.context.fillStyle = "rgba(0,0,0,0.6)";
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    const tileMapComponent = this.componentManager.getComponent(entities[0], ComponentType.TileMap) as TileMapComponent;
    const textures = tileMapComponent.textures;

    tileMapComponent.layers.forEach(layer =>{
      for(let y = 0 ; y < layer.map.length; y++){
        for(let x = 0; x < layer.map[y].length; x++){
          const tex = textures.get(layer.map[y][x]);
          if(tex){
            let coordinate = new Vector2D(x*tileMapComponent.cellSize.x, y*tileMapComponent.cellSize.y) 
            tex.render(this.context,coordinate);
          }
        }
      }
    });

    this.context.restore();
  }
}