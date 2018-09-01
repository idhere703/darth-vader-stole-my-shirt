import React from 'react';

function getCurrentLocation(world) {
  const areas = world.get('areas');
  const currentArea = areas[world.get('current_floor')];
  const locationIndex = currentArea.get('current_location');
  return currentArea.get('map')[locationIndex[0]][locationIndex[1]];
}

const hasLocation = (locat) => (typeof locat === 'object' && locat !== null);

function getDescription(locat) {
  return `You look around and see: ${locat.get('description')}`;
}

function getEnemiesDescription(locat) {
  const enemies = locat.get('enemies');
  const eLen = enemies.length;
  if (!eLen) return '';
  else if (eLen === 1) return `You see one enemy: `;
  return `You see several enemies: `
}

function getItemsDescription(locat) {
  const items = locat.get('items');
  const iLen = items.length;
  if (!iLen) return '';
  else if (iLen === 1) return `You see one item:`;
  return `You see several items: `;
}


function WorldView(props) {
  const currLocation = getCurrentLocation(props.worldInfo.get('world'));
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
      <section className="world__actions">

      </section>
    </section>
  );
}

export default WorldView;
