import * as ECS from "./ECS/ECS";
//import { TransformComponent } from "./ECS/TransformComponent";
//import { ColliderComponent } from "./ECS/ColliderComponent";
import { SpriteComponent } from "./ECS/SpriteComponent";
import {BodyComponent} from "./ECS/BodyComponent";
import { MANAGER } from "./ECS/ECS";
import {ctx} from "./graphics/ContextUtilities";
import { Shape } from "./Shape";
import { Vector2D } from "./vector2D";

export class Actor extends ECS.Entity {
  //public _transform: TransformComponent;
  //public _collider: ColliderComponent;
  public _sprite: SpriteComponent;
  public _bodyComponent: BodyComponent;

  constructor(name: string, position:[number, number]=[0,0], width:number, height:number, shape: Shape, speed: number,texture: HTMLImageElement = new Image() ) {
    super(MANAGER, name);
    this._bodyComponent = this.addComponent(
      BodyComponent,
      new Vector2D(position[0], position[1]),
      new Vector2D(1,1),
      shape,
      speed
    );/*
    this._transform = this.addComponent(
      TransformComponent,
      position,
      3,
      width,
      height,
      1,
    );
    this._collider = this.addComponent(ColliderComponent, name, {
      x: position[0],
      y: position[1],
      w: width,
      h: height,
    },
      true);*/
    this._sprite = this.addComponent(
      SpriteComponent,
      texture,
      width,
      height,
    );
    this.manager.addEntity(this);
    

  }

  onCollision(other:Actor){
    
  }  

  init() {
    super.init();
  }

  update(deltaTime:number) {
    super.update(deltaTime);
  } 

  darw(){
  }
}
