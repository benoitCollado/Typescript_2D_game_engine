import { World } from "./World";

export class Game{
  
  public worlds: Map<string, World> = new Map();
  public currenWorld: World | undefined;
  public name : string;
  public context: CanvasRenderingContext2D;
  public canvas : HTMLCanvasElement;
  private lastTime : number = 0;
  
  constructor(name:string){
    this.name = name;
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.context.imageSmoothingEnabled = false;
  }

  createWorld(name:string): World{
    this.worlds.set(name, new World(this.context));
    
    return this.worlds.get(name) as World;
  }

  getWolrd(name:string):World | undefined{

    if(this.worlds.has(name)){
      return this.worlds.get(name);
    }else{
      return undefined;
    }
  }

  setCurrentWorld(name:string):void{
    if(this.worlds.has(name)){
      this.currenWorld = this.worlds.get(name);
    }
  }

  initWorld():void{
    if(this.currenWorld){
      this.currenWorld.init();
    }
    
  }

  run(timeellapsed:number):void{
    
    if(this.currenWorld){
      const deltaTime = timeellapsed - this.lastTime;
      this.currenWorld.update(deltaTime) 
      this.lastTime = timeellapsed;
      requestAnimationFrame(time => this.run(time/1000));
    }
  }

  public resize() {
    if (this.canvas !== undefined) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  
}