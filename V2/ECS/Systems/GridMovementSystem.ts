import {
  ComponentType,
  GridComponent,
  TileMapComponent,
  TransformComponent,
} from "../Components/Component";
import ComponentManager from "../Components/ComponentManager";
import { EntityManager } from "../EntityManager";
import { ActionEventMessage, EventMessage, EventType, GridStateEventType, StateEventMessage, StateEventMEssage } from "../Event/Event";
import EventQueue from "../Event/EventQueue";
import Vector2D from "../utils/Vector2D";
import { System } from "./System";

export default class GridMovementSystem extends System {
  public xSize = 10;
  public ySize = 10;
  public collisionMask: number[][] = [];

  constructor(entityManager: EntityManager, componentManager: ComponentManager, eventQueue: EventQueue<EventType, EventMessage>) {
    super(entityManager, componentManager, eventQueue);
    
  }

  init():void{
    const entitiesTileMap = this.componentManager.getEntitiesWithComponents([
      ComponentType.TileMap,
    ]);
    if(entitiesTileMap.length > 0){
      for(let TileMap of entitiesTileMap){
        const tileMapComponent = this.componentManager.getComponent(TileMap,ComponentType.TileMap) as TileMapComponent;
        if(tileMapComponent){
          console.log("un tilemap component");
          tileMapComponent.layers.forEach(layer => {
            console.log("dans un layer");
              for(let j = 0; j < layer.map.length; j++){
                if(this.collisionMask[j] === undefined){
                  this.collisionMask.push([]);
                }
                for(let i = 0; i < layer.map[j].length; i++){
                  if(this.collisionMask[j][i] === undefined ){
                    this.collisionMask[j][i] = 0;
                    console.log("avant l'autre");
                  }
                  if(this.collisionMask[j][i] === 0 && layer.map[j][i] > 0 && layer.blocking){
                    this.collisionMask[j][i] = 1;
                    console.log("on est là");
                  }
                }
              }
          });
        }
      }
    }
    console.log(this.collisionMask);
  }

  update(deltaTime: number): void {
    const gridEntity = this.componentManager.getEntitiesWithComponents([
      ComponentType.Grid,
      ComponentType.Transform,
    ]);

    const actions = this.eventQueue.getEventsType(EventType.Action) as ActionEventMessage[];
    
    for (const entity of gridEntity) {
      const grid = this.componentManager.getComponent(
        entity,
        ComponentType.Grid,
      ) as GridComponent;
      const transform = this.componentManager.getComponent(
        entity,
        ComponentType.Transform,
      ) as TransformComponent;
      if (!grid.isMoving && grid.canAct) {
        let playerActions = undefined;
        if(actions){
          playerActions = actions.filter(action => action.entity === entity)
        }
        if(playerActions){
          for(let playerAction of playerActions){
            let newPositionGrid: Vector2D|undefined = undefined;
            let oldGridPosition: Vector2D|undefined = undefined;
            if(!grid.isMoving ){
              switch(playerAction.actionName){
                case "left":
                  newPositionGrid = this.worldToGrid(transform.position.add(new Vector2D(-1 * this.xSize, 0)));
                  if(this.collisionMask[newPositionGrid.y] !== undefined){
                    if(this.collisionMask[newPositionGrid.y][newPositionGrid.x]=== 0 ){
                      oldGridPosition = this.worldToGrid(transform.position);
                      this.collisionMask[oldGridPosition.y][oldGridPosition.x] = 0;
                      this.collisionMask[newPositionGrid.y][newPositionGrid.x] = 1;
                      grid.interpolation.setTarget(transform.position.add(new Vector2D(-1 * this.xSize, 0)));
                      grid.isMoving = true;
                      grid.canAct = false;
                      grid.currentDelay=0;
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"move",
                        entity: entity
                      } as StateEventMEssage);
                    }else{
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"moveFailed",
                        entity: entity
                      } as StateEventMEssage);
                    }
                  }
                  break;
                case "right":
                  newPositionGrid = this.worldToGrid(transform.position.add(new Vector2D(1 * this.xSize, 0)));
                  if(this.collisionMask[newPositionGrid.y] !== undefined){
                    if(this.collisionMask[newPositionGrid.y][newPositionGrid.x] === 0 ){
                      oldGridPosition = this.worldToGrid(transform.position);
                      this.collisionMask[oldGridPosition.y][oldGridPosition.x] = 0;
                      this.collisionMask[newPositionGrid.y][newPositionGrid.x] = 1;
                      grid.interpolation.setTarget(transform.position.add(new Vector2D(1 * this.xSize, 0)));
                      grid.isMoving = true;
                      grid.currentDelay=0;
                      grid.canAct = false;
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:,
                        entity: entity
                      } as StateEventMEssage);
                    } else{
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"moveFailed",
                        entity: entity
                      } as StateEventMEssage);
                    }
                  }
                  break;
                case "up":
                  newPositionGrid = this.worldToGrid(transform.position.add(new Vector2D(0 ,-1 * this.ySize)));
                  if(this.collisionMask[newPositionGrid.y] !== undefined){
                    if(this.collisionMask[newPositionGrid.y][newPositionGrid.x] === 0 ||this.collisionMask[newPositionGrid.y][newPositionGrid.x] === undefined){
                      oldGridPosition = this.worldToGrid(transform.position);
                      this.collisionMask[oldGridPosition.y][oldGridPosition.x] = 0;
                      this.collisionMask[newPositionGrid.y][newPositionGrid.x] = 1;
                      grid.interpolation.setTarget(transform.position.add(new Vector2D(0 ,-1 * this.ySize)));
                      grid.isMoving = true;
                      grid.currentDelay=0;
                      grid.canAct = false;
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"move",
                        entity: entity
                      } as StateEventMEssage);
                    }else{
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"moveFailed",
                        entity: entity
                      } as StateEventMEssage);
                    }
                  }
                  break;
                case "down":
                  newPositionGrid = this.worldToGrid(transform.position.add(new Vector2D(0 ,1 * this.ySize)));
                  if(this.collisionMask[newPositionGrid.y] !== undefined){
                    if(this.collisionMask[newPositionGrid.y][newPositionGrid.x] === 0 ){
                      oldGridPosition = this.worldToGrid(transform.position);
                      this.collisionMask[oldGridPosition.y][oldGridPosition.x] = 0;
                      this.collisionMask[newPositionGrid.y][newPositionGrid.x] = 1;
                      grid.interpolation.setTarget(transform.position.add(new Vector2D(0 ,1 * this.ySize)));
                      grid.isMoving = true;
                      grid.currentDelay=0;
                      grid.canAct = false;
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"move",
                        entity: entity
                      } as StateEventMEssage);
                    }else{
                      this.eventQueue.emit(EventType.State,{
                        eventType:EventType.State,
                        stateName:"moveFailed",
                        entity: entity
                      } as StateEventMEssage);
                    }
                  }
                  break;
                default:
                  break;
              }
            }else{
              break;
            }
          }
        }
      }
      if (grid.isMoving) {
        const newPosition = grid.interpolation.update(deltaTime);
        if (newPosition) {
          transform.position = newPosition;
          if (grid.interpolation.target.equivalent(grid.interpolation.origin) ) {
            grid.isMoving = false;
            this.eventQueue.emit(EventType.State,{
              eventType:EventType.State,
              stateName:GridStateEventType.StopMoving,
              entity: entity
            } as StateEventMessage<GridStateEventType>);
          }
        }
      }
      if(!grid.canAct){
        grid.currentDelay += deltaTime;
        if(grid.currentDelay > grid.delayAction){
          grid.canAct= true;
        }
      }
    }
  }

  worldToGrid(position: Vector2D): Vector2D {
    return new Vector2D(
      Math.round(position.x / this.xSize),
      Math.round(position.y / this.ySize),
    );
  }

  GridToWolrd(position: Vector2D): Vector2D {
    return new Vector2D(position.x * this.xSize, position.y * this.ySize);
  }
}
