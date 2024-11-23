import * as ECS from "./ECS/ECS";
import { TransformComponent } from "./ECS/TransformComponent";
import { ColliderComponent } from "./ECS/ColliderComponent";
import { SpriteComponent } from "./ECS/SpriteComponent";
import { MANAGER } from "./ECS/ECS";

export class Actor extends ECS.Entity {
  public _transform: TransformComponent;
  public _collider: ColliderComponent;
  public _sprite: SpriteComponent;

  constructor(name: string, position:[number, number]=[0,0], texture: HTMLImageElement = new Image()) {
    super(MANAGER, name);
    this._transform = this.addComponent(
      TransformComponent,
      position,
      3,
      32,
      32,
      1,
    );
    this._collider = this.addComponent(ColliderComponent, name, {
      x: position[0],
      y: position[1],
      w: 32,
      h: 32,
    },
      true);
    this._sprite = this.addComponent(
      SpriteComponent,
      texture,
      32,
      32,
    );
    this.manager.addEntity(this);
    if(this.name === "player"){
        document.addEventListener("click", (event) => {
          this._transform.move_to([Math.round(event.clientX), Math.round(event.clientY)]);
        });
    }

  }

  init() {
    super.init();
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }

 
}
