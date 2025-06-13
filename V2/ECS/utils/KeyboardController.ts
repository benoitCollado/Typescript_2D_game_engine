import { InputType } from "../Components/Component";
import { EventType } from "../Event/Event";
import InputController, { KeyState } from "./InputController"

export default class KeyBoardController extends InputController {

  public inputType: InputType = InputType.KeyBoard;
  
  constructor() {
    super();
    this.initEventListener();
    console.log("KeyBoardController initialized");

  }
  

  public initEventListener() {
    window.addEventListener("keydown", (event) => {
      const key = event.key;
      let keyState: KeyState;
      if(this.keys.has(key)){
        keyState = this.keys.get(key) as KeyState;
        if(!keyState.pressed){
          keyState = {pressed: true};
          this.keyEventQueue.emit(key,"justPressed");
        }else{
          keyState = {pressed: true};
        }
      }else {
        keyState = {pressed:true};
        this.keyEventQueue.emit(key,"justPressed");
      }
      this.keys.set(key,keyState);
      
    });

    window.addEventListener("keyup", (event) => {
      const key = event.key;
       if(this.keys.has(key)){
         const oldState = this.keys.get(key) as KeyState;
         if(oldState.pressed){
           this.keyEventQueue.emit(key,"justRelease");
         }
         this.keys.set(key, {pressed:false})
       }
    });
  } 
}
    
