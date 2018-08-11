import React from 'react';
import NavView from './NavView';

function AppView(props) {
    return (
        <div>
            <h1 id="header" className="header">Darth Vader Stole My Shirt</h1>
            <NavView { ...props } />
        </div>
        );
}

export default AppView;
