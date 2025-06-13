import { ComponentType, InputComponent, InputType } from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { EventType, EventMessage, InputEventMessage } from "../Event/Event";
import EventQueue from "../Event/EventQueue";
import { System } from "./System";

export default class InputSystem extends System{

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType, EventMessage>){
    super(entityManager, componentManager, eventQueue);
  }

  update(deltaTime: number): void {
    const entities = this.componentManager.getEntitiesWithComponents([
      ComponentType.Input
    ]);

    const inputComponent: InputComponent = this.componentManager.getComponent(entities[0], ComponentType.Input) as InputComponent;

    inputComponent.inputMethods.forEach(inputMethod => {
      inputMethod.update();
      const events = inputMethod.keyEventQueue.getEvents()
      events.forEach(value => {
        value[1].forEach(status => {
         const message  = {eventType:EventType.Input,
              inputMethod: inputMethod.inputType,
              keyCode: value[0],
              status: status
             } as InputEventMessage
          this.eventQueue.emit(EventType.Input, message);
        })
      })
      inputMethod.updateController();
    });
}
}