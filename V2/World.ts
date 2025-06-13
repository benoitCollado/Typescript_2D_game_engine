import ComponentManager from "./ECS/Components/ComponentManager";
import { EntityManager } from "./ECS/EntityManager";
import GridMovementSystem from "./ECS/Systems/GridMovementSystem";
import EventQueue from "./ECS/Event/EventQueue";
import PlayerControllerSystem from "./ECS/Systems/PlayerControllerSystem";
import TileMapRenderSystem from "./ECS/Systems/TileMapRenderSystem";
import { RenderSystem } from "./ECS/Systems/RenderSystem";
import { System } from "./ECS/Systems/System";
import { EventMessage, EventType } from "./ECS/Event/Event";
import InputSystem from "./ECS/Systems/InputSystem";

// le monde qui contient tout 
export class World{
  private systems: System[] = [];

  public entityManager : EntityManager;
  public componentManager : ComponentManager;
  public eventQueue: EventQueue<EventType, EventMessage>;
  
  
  constructor(context: CanvasRenderingContext2D){
    //Ajouter les systèmes dans l'ordre de leur execution
    this.componentManager = new ComponentManager();
    this.entityManager = new EntityManager();
    this.eventQueue = new EventQueue<EventType,EventMessage>();
    //this.systems.push(new MovementSystem(this.entityManager, this.componentManager));
    this.systems.push(new InputSystem(this.entityManager, this.componentManager, this.eventQueue));
    this.systems.push(new PlayerControllerSystem(this.entityManager, this.componentManager, this.eventQueue));
    this.systems.push(new GridMovementSystem(this.entityManager, this.componentManager, this.eventQueue));
    this.systems.push(new TileMapRenderSystem(this.entityManager, this.componentManager,this.eventQueue,context));
    this.systems.push(new RenderSystem(this.entityManager, this.componentManager,this.eventQueue, context));
  }

  init():void{
    for(const system of this.systems){
        system.init();
    }
  }

  update(deltaTime:number): void{
    //Executer tous les systèmes
    for(const system of this.systems){
        system.update(deltaTime);
    }
    this.eventQueue.free();
    
  }
}