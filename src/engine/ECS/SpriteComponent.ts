import { TransformComponent as TC, TransformComponent } from "./TransformComponent";
import * as ECS from "./ECS";
import { Rect } from "../utils";
import { ctx } from "../graphics/ContextUtilities";
import {BodyComponent} from "./BodyComponent";

export class SpriteComponent extends ECS.Component {
  public _className: string = "SpriteComponent";
  private _texture: HTMLImageElement;
 //private _transform: TC;
  private _body : BodyComponent | undefined;

  private _source_rect: Rect = { x: 0, y: 0, w: 32, h: 32 };
  private _dest_rect: Rect = { x: 0, y: 0, w: 32, h: 32 };
  constructor(
    entity: ECS.Entity,
    texture: HTMLImageElement,
    height?: number,
    width?: number,
  ) {
    super(entity);
    this._texture = texture;
    //this._transform = this.entity.getComponent(TransformComponent) as TC;
    
    if (height !== undefined) {
      this._source_rect.h = height;
    }
    if (width !== undefined) {
      this._source_rect.w = width;
    }
    this.order = -100;
  }

  public setTexture(texture: HTMLImageElement): void {
    this._texture = texture;
    
  }
  public init() {
    this._body = this.entity.getComponent(BodyComponent) as BodyComponent;
  }

  public update(deltaTime:number) {
    if(this._body){
      this._dest_rect.x = this._body?.position.x;
      this._dest_rect.y = this._body?.position.y;
      this._dest_rect.h = this._source_rect.h * this._body.dimension.x;
      this._dest_rect.w = this._source_rect.w * this._body.dimension.y;
    }
  }

  public draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.scale(1, 1);
    try{
    //console.log("texture : " , this._texture);
    ctx.drawImage(
      this._texture,
      this._dest_rect.x,
      this._dest_rect.y,
      this._dest_rect.w,
      this._dest_rect.h,
    );} catch(error){
      //console.log(error);
    }
  }
}
