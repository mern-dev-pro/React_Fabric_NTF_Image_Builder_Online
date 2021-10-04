import React, { useEffect, useState } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import CursorIcon from '../assets/imgs/icons/Cursor.svg';
import GlassIcon from '../assets/imgs/props/glass.svg';
import TextIcon from '../assets/imgs/icons/T.svg';
import BrushIcon from '../assets/imgs/icons/Brush.svg';
import ColorIcon from '../assets/imgs/icons/color.png';
import SprayIcon from '../assets/imgs/icons/Spray.svg';
import ImageIcon from '../assets/imgs/icons/Image.svg';
import EraseIcon from '../assets/imgs/icons/Eraser.svg';
import ClearIcon from '../assets/imgs/icons/Clear.svg';
import ShapeIcon from '../assets/imgs/icons/Shape.svg';
import DownloadIcon from '../assets/imgs/icons/Download.svg'
import { Dropdown, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

function ToolbarComponent() {
    const [color, setColor] = useColor("hex", "#ff0000");
    const [show, setShow] = useState(false);
    const [selectedTool, setSelectedTool] = useState("CURSOR");
    const dispatch = useDispatch();

    const handleClose = () => { setShow(false); color?dispatch({type: 'COLOR', color: color?.hex}): "";}
    const handleShow = () => setShow(true);

    const photoUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          dispatch({type:"IMAGE", url: objectUrl})
        }
    };

    const buttons = [
        {
            name: "CURSOR",
            icon: CursorIcon,
            type: "button",
            onClick: () => { dispatch({type: 'CURSOR'}); setSelectedTool('CURSOR') }
        },
        {
            name: "SHAPE",
            icon: ShapeIcon,
            type: "dropdown",
            items: [
                {label: "Rect", value: "RECT"},
                {label: "Triangle", value: "TRIANGLE"},
                {label: "circle", value: "CIRCLE"},
            ],
            onClick: (type) => { setSelectedTool('SHAPE'); dispatch({type: 'SHAPE', color: color?.hex, shape: type}); } 
        },
        {
            name: "PROPS",
            icon: GlassIcon,
            type: "dropdown",
            items: [
                {label: "Glasses", value: "GLASSES"},
                {label: "Tobacco", value: "TOBACCO"},
                {label: "Chain", value: "CHAIN"},
                {label: "Cap_LA", value: "CAP_LA"},
                {label: "Cap_Lakers", value: "CAP_LAKERS"},
                {label: "Cap_NY", value: "CAP_NY"},
            ],
            onClick: (type) => { setSelectedTool('PROPS'); dispatch({type: 'PROPS', color: color?.hex, props: type}); } 
        },
        {
            name: "TEXT",
            icon: TextIcon,
            type: "button",
            onClick: () => { dispatch({type: 'TEXT', color: color?.hex}); setSelectedTool('TEXT') }
        },
        {
            name: "BRUSH",
            icon: BrushIcon,
            type: "button",
            onClick: () => { dispatch({type: 'BRUSH', color: color?.hex}); setSelectedTool('BRUSH') }
        },
        {
            name: "COLOR",
            icon: ColorIcon,
            type: "button",
            onClick: () => {handleShow()}
        },
        {
            name: "SPRAY",
            icon: SprayIcon,
            type: "button",
            onClick: () => { dispatch({type: 'SPRAY',color: color?.hex}); setSelectedTool('SPRAY') }
        },
        {
            name: "ERASER",
            icon: EraseIcon,
            type: "button",
            onClick: () => { dispatch({type: 'ERASER'}); setSelectedTool('ERASER') }
        },
        {
            name: "IMAGE",
            icon: ImageIcon,
            type: "button",
            onClick: () => { setSelectedTool('IMAGE') }
        },  
        {
            name: "CLEAR",
            icon: ClearIcon,
            type: "button",
            onClick: () => { dispatch({type: 'CLEAR'}); setSelectedTool('CLEAR') }
        },
        {
            name: "DOWNLOAD",
            icon: DownloadIcon,
            type: "button",
            onClick: () => { dispatch({type: 'DOWNLOAD'}); }
        },  
    ]
    return (
        <div className="toolbar shadow px-2 py-4 rounded">
            {
                buttons.map( button => (
                    <div className="text-center py-2" key={button.name}>
                        {
                            (button.type === "dropdown") ? <Dropdown>
                                <Dropdown.Toggle 
                                    variant="success" 
                                    id="dropdown-basic" 
                                    style={{backgroundColor:'transparent', border: "none", boxShadow: (selectedTool===button.name)?"inset 0px 3px 6px #00000029": ""}}
                                >
                                    <img src={button.icon} className="icon"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        button.items.map(item => (
                                            <Dropdown.Item key={item.label} onClick={() => {button.onClick(item.value)}}>{item.label}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>: <label>    
                                <div className="toolbar-button cursor-pointer p-2" onClick={button.onClick} style={{boxShadow: (selectedTool===button.name)?"inset 0px 3px 6px #00000029": ""}}>
                                    <img src={button.icon} className="icon"/>
                                </div>
                                {button.name === "IMAGE" && <input type="file" className="d-none" onChange={photoUpload}/>}
                            </label>

                        }
                    </div>
                ) )
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="text-center">
                        <ColorPicker width={460} height={100} color={color} onChange={setColor} hideHSV dark /> 
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ToolbarComponent;
