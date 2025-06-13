import Vector2D from "./Vector2D";

export default abstract class TextureType{
  abstract renderTexture(ctx:CanvasRenderingContext2D, position: Vector2D):void;
}