import { TransformComponent as TC, TransformComponent } from "./TransformComponent";
import * as ECS from "./ECS";
import { Rect } from "../utils";
import { ctx } from "../graphics/ContextUtilities";

export class SpriteComponent extends ECS.Component {
  public _className: string = "SpriteComponent";
  private _texture: HTMLImageElement;
  private _transform: TC;

  private _source_rect: Rect = { x: 0, y: 0, w: 32, h: 32 };
  private _dest_rect: Rect = { x: 0, y: 0, w: 32, h: 32 };
  constructor(
    entity: ECS.Entity,
    path: string,
    height?: number,
    width?: number,
  ) {
    super(entity);
    this._texture = this.setTexture(path);
    this._transform = this.entity.getComponent(TransformComponent) as TC;
    console.log(this._transform);
    if (height !== undefined) {
      this._source_rect.h = height;
    }
    if (width !== undefined) {
      this._source_rect.w = width;
    }
    this.order = -100;
  }

  public setTexture(path: string): HTMLImageElement {
    let image = new Image();
    image.src = path;
    image.onload = function () {
      console.log("image loaded");
    };
    return image;
  }
  public init() {}

  public update() {
    this._dest_rect.x = this._transform.x;
    this._dest_rect.y = this._transform.y;
    this._dest_rect.h = this._source_rect.h * this._transform.scale;
    this._dest_rect.w = this._source_rect.w * this._transform.scale;
  }

  public draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.scale(1, 1);
    ctx.drawImage(
      this._texture,
      this._dest_rect.x,
      this._dest_rect.y,
      this._dest_rect.w,
      this._dest_rect.h,
    );
  }
}
