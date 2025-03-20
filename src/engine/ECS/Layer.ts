import {Entity} from "./ECS";
import Scene from "./Scene";

export default class Layer{

  public entities : Entity[] = [];
  public scene : Scene;
  
  constructor(scene : Scene){
    this.scene = scene;
  }

  public addEntity(entity: Entity):void {
    this.entities.push(entity);
  }

  public deleteEntity(id: string):void{
    const index = this.entities.indexOf(this.entities.find((entity)=>entity.id === id) as Entity);
    
  }
} 