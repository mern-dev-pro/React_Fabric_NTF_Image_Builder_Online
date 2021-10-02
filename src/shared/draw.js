//Draw Rect
import { fabric } from "fabric";
export function AddRectFunc(canvas, color) {
    var rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: color,
      width: 200,
      height: 100,
      objectCaching: false,
      stroke: color,
      strokeWidth: 4,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
}
export function AddTriangle(canvas, color) {
  var rect = new fabric.Triangle({
    left: 150,
    top: 150,
    width: 150,
    height: 100,
    fill: color,
    stroke: color,
    strokeWidth: 3,
    cornerColor: color,
    angle: 45,
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
}
export function AddCircle(canvas, color) {
  var rect = new fabric.Circle({
    left: 150,
    top: 150,
    radius: 100,
    fill: color,
    stroke: color,
    strokeWidth: 3,
    originX: 'center', 
    originY: 'center' 
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
}
export function AddText(canvas, color) { 
  canvas.add(new fabric.IText('Type Here', { 
      left: 50,
      top: 100,
      fontFamily: 'arial black',
      fill: color,
      fontSize: 50
  }));
}