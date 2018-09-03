import React from 'react';
import Actions from './components/Actions';
import { getCurrentArea, getCurrentLocation } from '../utils';

function WorldView(props) {
  const description = props.worldInfo.get('world_description');
  const currArea = getCurrentArea(props.worldInfo.get('world'));
  const currLocation = getCurrentLocation(currArea);
  return (
    <section>
      <section className="world__content">
        { description }
      </section>
      <Actions currLocation={currLocation} { ...props } ></Actions>
    </section>
  );
}

export default WorldView;
