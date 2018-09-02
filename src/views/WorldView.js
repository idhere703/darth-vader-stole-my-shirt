import React from 'react';
import Actions from './components/Actions';
import { getCurrentArea, getCurrentLocation } from '../utils';

const hasLocation = (locat) => (typeof locat === 'object' && locat !== null);

function getDescription(locat) {
  return `You look around and see: ${locat.get('description')}`;
}

function getEnemiesDescription(locat) {
  const enemies = locat.get('enemies');
  const eLen = enemies.length;
  if (!eLen) return '';
  else if (eLen === 1) return `You see one enemy.`;
  return `You see several enemies.`
}

function getItemsDescription(locat) {
  const items = locat.get('items');
  const iLen = items.length;
  if (!iLen) return '';
  else if (iLen === 1) return `You see one item.`;
  return `You see several items.`;
}

function WorldView(props) {
  const currArea = getCurrentArea(props.worldInfo.get('world'));
  const currLocation = getCurrentLocation(currArea);
  let description = '';
  let enemiesDescription = '';
  let itemsDescription = '';
  if (hasLocation(currLocation)) {
    description = (<p>{getDescription(currLocation)}</p>);
    enemiesDescription = (<p>{getEnemiesDescription(currLocation)}</p>);
    itemsDescription = (<p>{getItemsDescription(currLocation)}</p>);
  }
  return (
    <section>
      <section className="world__content">
        { description }
        { enemiesDescription }
        { itemsDescription }
      </section>
      <Actions currLocation={currLocation} { ...props } ></Actions>
    </section>
  );
}

export default WorldView;
