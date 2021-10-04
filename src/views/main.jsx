import React from 'react'
import DrawPanelComponent from '../components/drawpanel'
import ToolbarComponent from '../components/toolbar'
function Main() {
    return (
        <div>
            <p className="font-weight-bold text-red font-size-xl pt-5">#NFT DOGE</p>
            <div className="py-2 panel-height row">              
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
