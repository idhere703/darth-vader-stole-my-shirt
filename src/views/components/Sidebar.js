import React from 'react';
import ReactSidebar from 'react-sidebar';

function Sidebar(props) {
    return (
        <ReactSidebar 
            sidebar={ props.content } 
            open={ props.sidebarOpen } 
            onSetOpen={ props.onSetSidebarOpen } 
            styles={ props.styles } 
            pullRight={ props.isRight } >
          { props.children }
        </ReactSidebar>
        );
}

export default Sidebar;