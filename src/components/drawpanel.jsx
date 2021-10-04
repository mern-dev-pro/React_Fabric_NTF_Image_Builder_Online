import React, { useRef, useEffect } from 'react'
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import DogImage from '../assets/imgs/background/dog.svg';
import { AddText } from '../shared/draw';

const DrawPanelComponent = props => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    var canvas = new fabric.Canvas('canvas');
    canvas.setWidth(containerRef.current.offsetWidth);
    canvas.setHeight(containerRef.current.offsetHeight);
    canvas.add(new fabric.Text('very tips, much thanks 🐕\nDLgEWDm7k12iPxMjpxteucPNH5qpFQdTqS', { 
      left: 30,
      top: (containerRef.current.offsetHeight - 50),
      fontFamily: 'arial black',
      fill: "#000000",
      fontSize: 15
    }));
    var center = canvas.getCenter();
    canvas.setBackgroundImage(DogImage, canvas.renderAll.bind(canvas), {
      scaleX:0.7,
      scaleY:0.7,
      top: center.top,
      left: center.left,
      originX: 'center',
      originY: 'center'
    });
    fabric.Object.prototype.transparentCorners = true;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';
    dispatch({type: "INIT", canvas: canvas});
    return () => {
      canvas.dispose();
    };
  }, []);

  return(
    <div 
      className="w-100 h-100"
      ref={containerRef}
    >
      <canvas
        id="canvas"
      />
    </div>
  )
}


export default DrawPanelComponent