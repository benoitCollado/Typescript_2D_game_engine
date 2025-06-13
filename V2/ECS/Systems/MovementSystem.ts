import { ComponentType, TransformComponent, VelocityComponent } from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { EventMessage, EventType } from "../Event/Event";
import EventQueue from "../Event/EventQueue";
import { System } from "./System";

export class MovementSystem extends System{
  
  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType, EventMessage>){
    super(entityManager, componentManager,eventQueue);
  }
  
  update(deltaTime: number): void {
    //récupérer toutes les entités avec Position et Velocity
    const entities = this.componentManager.getEntitiesWithComponents([
      ComponentType.Transform,
      ComponentType.Velocity
    ]);

    for(const entity of entities){
      const transform = this.componentManager.getComponent(entity, ComponentType.Transform) as TransformComponent;
      const velocity = this.componentManager.getComponent(entity, ComponentType.Velocity) as VelocityComponent;

      transform.position.x += velocity.velocity.x * deltaTime;
      transform.position.y += velocity.velocity.y * deltaTime;

      console.log(velocity);
      console.log(deltaTime);

      console.log("x : " + velocity.velocity.x * deltaTime);
      console.log("y : " + velocity.velocity.y * deltaTime);
    }
  }
}