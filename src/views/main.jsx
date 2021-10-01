import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import DrawPanelComponent from '../components/drawpanel'
import ToolbarComponent from '../components/toolbar'
function Main() {
    return (
        <div>
            <div className="py-5 vh-100 row">
                <div className="col-xl-1 col-lg-2 col-md-2 col-sm-3 mb-5">
                    <ToolbarComponent/>
                </div>
                <div className="border col-xl-11 col-xl-10 col-md-10 col-sm-9 rounded px-0 h-100">
                    <DrawPanelComponent/>
                </div>
            </div>
        </div>
    )
}

export default Main
