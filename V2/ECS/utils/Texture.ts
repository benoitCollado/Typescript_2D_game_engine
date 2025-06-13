import Vector2D from "./Vector2D";
import TextureType from "./TextureType"

export default class Texture{
  public textureType : TextureType;

  constructor(textureType: TextureType){
    this.textureType = textureType;
  }

  render(ctx: CanvasRenderingContext2D, position:Vector2D){
    this.textureType.renderTexture(ctx, position);
  }

  
  
}