import { fabric } from "fabric";
import { combineReducers } from "redux";
import { AddCircle, AddRectFunc, AddText, AddTriangle } from "../shared/draw";
import GlassesIcon from '../assets/imgs/props/glass.svg'

function setReducer(state = { canvas: null, color:"#ff0000" }, action) {
    switch (action.type) {
        case "INIT": {
            return { ...state, canvas: action.canvas };
        }
        case "CURSOR": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = false;
            return { ...state };
        }
        case "SHAPE": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = false;
            switch (action.shape) {
                case "RECT":
                    AddRectFunc( state.canvas, action.color);                    
                    break;
                case "TRIANGLE":
                    AddTriangle( state.canvas, action.color);                    
                    break;
                case "CIRCLE":
                    AddCircle( state.canvas, action.color);                    
                    break;
                default:
                    break;
            }
            return { ...state };
        }
        case "PROPS": {
            if(!state.canvas){
                return state;
            }
            switch (action.props) {
                case "GLASSES":
                    fabric.Image.fromURL(GlassesIcon, function(oImg) {
                        oImg.set({ left: 100, top: 100, angle: 10 });
                        oImg.scale(5);
                        state.canvas.add(oImg);  
                    });       
                    break;
                default:
                    break;
            }
            return { ...state };
        }
        case "TEXT": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = false; 
            AddText(state.canvas, action.color);
            return { ...state };
        }
        case "BRUSH": {
            if(!state.canvas){
                return state;
            }
            state.canvas.freeDrawingBrush = new fabric.PencilBrush(state.canvas);
            state.canvas.freeDrawingBrush.width = 35;
            state.canvas.freeDrawingBrush.color = action.color;
            state.canvas.isDrawingMode = true;
            return { ...state };
        }
        case "COLOR": {
            if(!state.canvas){
                return state;
            }
            const { color, width } = action;
            if (color) {
                state.color = color;
                state.canvas.freeDrawingBrush.color = color;
            }
            console.log(action.color);
            state.canvas.freeDrawingBrush.color = action.color;
            return { ...state };
        }
        case "SPRAY": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = true;
            // state.canvas.freeDrawingBrush = new fabric.SprayBrush(state.canvas);
            state.canvas.freeDrawingBrush = new fabric.CircleBrush(state.canvas);
            state.canvas.freeDrawingBrush.color = action.color;
            state.canvas.freeDrawingBrush.width = 35;
            return { ...state };
        }
        case "ERASER": {
            if(!state.canvas){
                return state;
            }
            state.canvas.freeDrawingBrush = new fabric.PencilBrush(state.canvas);
            state.canvas.freeDrawingBrush.width =20;
            state.canvas.freeDrawingBrush.color = "#ffffff";
            state.canvas.isDrawingMode = true;
            return { ...state };
        }
        case "IMAGE": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = false;
            console.log(action.url);
            fabric.Image.fromURL(action.url, function(image) {
                image.scaleToWidth(480);
                state.canvas.add(image);
            }, { crossOrigin: 'anonymous' });
            return { ...state };
        }
        case "CLEAR": {
            if(!state.canvas){
                return state;
            }
            state.canvas.isDrawingMode = false;
            var selection = state.canvas.getActiveObject();
            if (selection?.type === 'activeSelection') {
                selection.forEachObject(function(element) {
                    state.canvas.remove(element);
                });
            }
            else{
                state.canvas.remove(selection);
            }
            state.canvas.discardActiveObject();
            state.canvas.requestRenderAll();
            return { ...state };
        }
        case "DOWNLOAD": {
            if(!state.canvas){
                return state;
            }
            const a = document.createElement("a");
            const uri = state.canvas.toDataURL({format: 'png', multiplier: 4});
            console.log(uri);
            a.href = uri
            a.download = "Online_Drawer.png";
            a.click();
            return { ...state };
        }
        default:
            return state;
    }
}

export const reducers = combineReducers({
    setReducer
})