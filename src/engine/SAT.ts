import { BodyComponent } from "./ECS/BodyComponent";
import { Shape, Segment } from "./Shape";
import {Vector2D} from "./vector2D";

export default function resolveSAT(polygonA : BodyComponent, polygonB : BodyComponent): Vector2D | null{
  const axes = [...polygonA.shape.getAxes(), ...polygonB.shape.getAxes()];
  //console.log(axes);
  let minOverlap = Infinity;
  let smallestAxis : Vector2D | null = null;

  for(const axis of axes){
    const projectionA : Segment = polygonA.shape.projectOnAxes(axis, polygonA.position);
    const projectionB : Segment = polygonB.shape.projectOnAxes(axis, polygonB.position);

    if(projectionA.max < projectionB.min || projectionA.min > projectionB.max){
      //console.log("dans le SAT avant la fin ");
      return null;
    }

    const overlap = Math.min(projectionA.max, projectionB.max)-Math.max(projectionA.min, projectionB.min);

    if(overlap < minOverlap){
      minOverlap = overlap;
      smallestAxis = axis;
    }
  }
  if(smallestAxis){
    //console.log(polygonA.entity.name, " ", polygonB.entity.name);
    return smallestAxis.multiply(minOverlap);
  }
  return null;
}