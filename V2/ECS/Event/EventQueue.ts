import { EventMessage, EventType } from "./Event";

export default class EventQueue<T,U> {
  private queue : Map<T, U[]> = new Map();
  constructor(){
  }

  emit(eventType: T ,event: U){
    if(this.queue.has(eventType)){
      let eventArray = this.queue.get(eventType);
      if (eventArray) {
        eventArray.push(event);
      }else{
        this.queue.set(eventType, [event]);
      }
    }else{
      this.queue.set(eventType, [event])
    }
  }

  getEvents() : [T,U[]][]{
    let arrayMap : [T,U[]][] = []
  
      const entries = this.queue.entries();
      for(let entrie of entries){
        arrayMap.push(entrie)
      }

    return arrayMap;
  }
  
  getEventsType(eventType: T): U[] | undefined{
    return this.queue.get(eventType);
  }
  
  free():void{
    this.queue.clear()
  }

  getLength():number{
    return this.queue.size;
  }
}