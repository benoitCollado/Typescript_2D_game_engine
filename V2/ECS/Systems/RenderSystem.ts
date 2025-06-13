import { ComponentType, TransformComponent, RenderComponent } from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { EventType, EventMessage } from "../Event/Event";
import EventQueue from "../Event/EventQueue";
import { System } from "./System";

export class RenderSystem extends System{

  private context : CanvasRenderingContext2D;
  private frames:number = 0;
  private accum : number = 0;
  private fps: number = 0;

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType, EventMessage>, context: CanvasRenderingContext2D){
    super(entityManager, componentManager, eventQueue);
    this.context = context;
    context.filter = "None";
  }

  update(deltaTime: number): void {
    this.context.save();
    this.context.scale(1.5,1.5);
    this.context.imageSmoothingEnabled = false;
    this.frames++
    this.accum += deltaTime;

    const entities = this.componentManager.getEntitiesWithComponents([
      ComponentType.Transform,
      ComponentType.Render
    ]);
    for(const entity of entities){
      const position = this.componentManager.getComponent(entity, ComponentType.Transform) as TransformComponent;
      const render = this.componentManager.getComponent(entity, ComponentType.Render) as RenderComponent;
      this.context.fillStyle = render.color;
      if(render.shape === 'rectangle'){
        this.context.fillRect(position.position.x, position.position.y, render.width, render.height);
      }else if(render.shape === 'circle'){
        this.context.beginPath();
        this.context.arc(position.position.x, position.position.y, render.width ,0, 2*Math.PI);
        this.context.fill();
      }
    }
    if(this.accum > 1){
      this.fps = this.frames /this.accum;
      this.frames = 0;
      this.accum = 0;
    }
    this.context.fillStyle = "rgba(255,255,255,1)";
    this.context.font = "32px arial";
    this.context.fillText("FPS : " + Math.round(this.fps),50,50);
    this.context.restore();
}

  
  
  
}