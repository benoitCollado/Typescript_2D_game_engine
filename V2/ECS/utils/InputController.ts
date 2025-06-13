import { InputType } from "../Components/Component";
import { EventType } from "../Event/Event";
import EventQueue from "../Event/EventQueue";

export default abstract class InputController{
  public keys : Map<string,KeyState> = new Map();
  public keyEventQueue: EventQueue<string,"justPressed"|"justRelease"|"pressed"> = new EventQueue();
  public abstract inputType: InputType ;
  public eventType: EventType = EventType.Input;
  constructor(){
  }
  public abstract initEventListener():void;
  public update():void{
    const entries = this.keys.entries();
    for(let value = 0; value < this.keys.size; value ++){
      const couple = entries.next().value;
      if(couple && couple[1].pressed){
        this.keyEventQueue.emit(couple[0], "pressed");
      }
    }
  }
  public updateController():void{
      this.keyEventQueue.free();
    }
  
}

export interface KeyState{
  pressed : Boolean;
}
