import React, { Component } from 'react';
import './Page.css'

class Page extends Component {
  render() {
    return (
      <div className="content">
        <div className="vertical-container">
          <div className="vertical-box">
            Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.
          </div>
          <div className="vertical-box">
            By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
