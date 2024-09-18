export let ctx: CanvasRenderingContext2D;

export class ContextUtilities {
  public static initialize(canvasID: string): HTMLCanvasElement {
    let canvas: HTMLCanvasElement;
    if (canvasID !== undefined) {
      canvas = document.getElementById(canvasID) as HTMLCanvasElement;
      if (canvas === undefined) {
        throw new Error("Can't find canvas with the id : " + canvasID);
      }
    } else {
      canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
    }

    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    console.log("Canvas context initialized");
    if (ctx === undefined) {
      throw new Error(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
      );
    }

    return canvas;
  }
}
