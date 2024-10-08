import * as ECS from "./ECS/ECS";
import { TransformComponent } from "./ECS/TransformComponent";
import { ColliderComponent } from "./ECS/ColliderComponent";
import { SpriteComponent } from "./ECS/SpriteComponent";
import { KEYBOARD } from "../main";
import { MANAGER } from "./ECS/ECS";

export class Actor extends ECS.Entity {
  private _transform: TransformComponent;
  private _collider: ColliderComponent;
  private _sprite: SpriteComponent;

  constructor(name: string) {
    super(MANAGER, name);
    this._transform = this.addComponent(
      TransformComponent,
      [0, 0],
      3,
      32,
      32,
      2,
    );
    this._collider = this.addComponent(ColliderComponent, name, {
      x: 0,
      y: 0,
      w: 32,
      h: 32,
    });
    this._sprite = this.addComponent(
      SpriteComponent,
      "./dist/assets/player.png",
      32,
      32,
    );
    this.manager.addEntity(this);
    if(this.name === "player"){
      console.log("init");
        document.addEventListener("click", (event) => {
          this._transform.move_to([event.clientX, event.clientY]);
          console.log("ici");
        });
    }

  }

  init() {
    super.init();
  }

  update() {
    if (this.name === "player") {
      this.inputManager();
    }
    super.update();
  }

  draw() {
    super.draw();
  }

  inputManager() {
    if (KEYBOARD._keys["ArrowUp"] || KEYBOARD._keys["z"]) {
      //this._transform.Yvelocity = -1;
      this._transform.move_to([this._transform.x, this._transform.y - 5]);
    } else if (KEYBOARD._keys["ArrowDown"] || KEYBOARD._keys["s"]) {
      //this._transform.Yvelocity = 1;
      this._transform.move_to([this._transform.x, this._transform.y + 5]);
    } else {
      //this._transform.Yvelocity = 0;
    }
    if (KEYBOARD._keys["ArrowLeft"] || KEYBOARD._keys["q"]) {
      //this._transform.Xvelocity = -1;
      this._transform.move_to([this._transform.x - 5, this._transform.y]);
    } else if (KEYBOARD._keys["ArrowRight"] || KEYBOARD._keys["d"]) {
      //this._transform.Xvelocity = 1;
      this._transform.move_to([this._transform.x + 5, this._transform.y]);
    } else {
      //this._transform.Xvelocity = 0;
    }
  }
}
