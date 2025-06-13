import Vector2D from "./Vector2D";

export interface Segment {
  min: number;
  max: number;
}

export default class Shape{
  public vertices : Vector2D[];
  public origin :Vector2D; 

  constructor(vertices : Vector2D[], origin : Vector2D = new Vector2D(0,0)){
    this.vertices = vertices;
    this.origin = origin;
  }
         
  getAxes(): Vector2D[]{
    const axes : Vector2D[] = [];
    for(let i = 0; i < this.vertices.length; i++){
      const p1 : Vector2D = this.vertices[i];
      const p2 : Vector2D  = this.vertices[(i + 1 ) % this.vertices.length];
      const edge : Vector2D = p2.substract(p1);
      const normal : Vector2D = edge.perp();
      normal.normalize();
      axes.push(normal);
    }
    return axes;
  }

  projectOnAxes(axis: Vector2D, position: Vector2D):Segment{
    let min = Infinity;
    let max = -Infinity;

    for(let vertex of this.vertices){
      const projection = axis.dot(vertex.add(position).substract(this.origin));
      if(projection < min) min = projection;
      if(projection > max) max = projection;
    }

    return {min, max};
  }

}