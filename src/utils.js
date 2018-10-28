import React from 'react';
export function getCurrentArea(world) {
  const areas = world.get('areas');
  const index = areas.findIndex(a => a.floor === world.get('current_floor'));
  return areas[index];
}

export function getCurrentLocation(currentArea) {
  const locationIndex = currentArea.get('current_location');
  return currentArea.get('map')[locationIndex[0]][locationIndex[1]];
}

export function setActions(currArea, character) {
  const currLocation = getCurrentLocation(currArea);
  const charSkills = character.get('skills') || [];
  const charItems = character.get('items') || [];
  const charDimItems = character.get('dimensional_items') || [];
  return [{
    label: 'Move',
    subActions: getMovementOptions(currArea.get('map'), currArea.get('current_location'))
  }, {
    label: 'Examine',
    subActions: [
      {
        label: 'Room',
        action: () => {
          // AppDispatcher.dispatch({
          //   type: AppActionTypes.SET_DESCRIPTION,
          //   description: buildRoomDescription(currArea)
          // });
        }
      },
      {
        label: 'Enemies',
        visible(locat) {
          return locat.get('enemies').length;
        },
        // TODO: Implement perception check and pass list of perceived enemies to render.
        // Should only be calculated on room enter.
        subActions: currLocation.get('enemies').map(e => ({
          label: e.name,
          action: () => {
            // AppDispatcher.dispatch({
            //   type: AppActionTypes.SET_DESCRIPTION,
            //   description: getEnemyDescription(e)
            // });
          }
        }))
      },
      {
        label: 'Items',
        visible(locat) {
          return locat.get('items').length;
        },
        subActions: currLocation.get('items').map(i => ({
          label: i.name,
          action: () => {
            // AppDispatcher.dispatch({
            //   type: AppActionTypes.SET_DESCRIPTION,
            //   description: getItemDescription(i)
            // });
          }
        }))
      },
    ],
  }, {
    label: 'Attack',
    subActions: getAttackOptions(currLocation),
    visible(locat) {
      return locat.get('enemies').length;
    }
  }, {
    label: 'Special',
    subActions: charSkills.map(skill => ({
      label: skill.name,
      tooltip: getSkillDescription(skill),
    })),
    visible(locat) {
      return locat.get('enemies').length && charSkills.length > 0;
    }
  }, {
    label: 'Use',
    visible: () => charItems.length > 0,
    subActions: charItems.map(i => ({
      label: i.name,
      tooltip: getItemDescription(i),
      action: () => {
      }
    }))
  }, {
    label: 'Pickup',
    subActions: getPickupOptions(currLocation),
    visible(locat) {
      return locat.get('items').length;
    }
  }, {
    label: 'Use Dimensional',
    visible: () => charDimItems.length > 0,
    subActions: charDimItems.map(i => ({
      label: i.name,
      action: () => {
      }
    }))
  }];
}

export function getMovementOptions(map, currentLocation) {
  const possibleOptions = [
    {
      label: 'North',
      direction: [currentLocation[0] + 1, currentLocation[1]],
      action: () => {
        // AppDispatcher.dispatch({
        //   type: AppActionTypes.CHANGE_LOCATION,
        //   newLocation: [currentLocation[0] + 1, currentLocation[1]],
        // });
      },
    }, {
      label: 'East',
      direction: [currentLocation[0], currentLocation[1] + 1],
      action: () => {
        // AppDispatcher.dispatch({
        //   type: AppActionTypes.CHANGE_LOCATION,
        //   newLocation: [currentLocation[0], currentLocation[1] + 1],
        // });
      },
    }, {
      label: 'West',
      direction: [currentLocation[0], currentLocation[1] - 1],
      action: () => {
        // AppDispatcher.dispatch({
        //   type: AppActionTypes.CHANGE_LOCATION,
        //   newLocation: [currentLocation[0], currentLocation[1] - 1],
        // });
      },
    }, {
      label: 'South',
      direction: [currentLocation[0] - 1, currentLocation[1]],
      action: () => {
        // AppDispatcher.dispatch({
        //   type: AppActionTypes.CHANGE_LOCATION,
        //   newLocation: [currentLocation[0] - 1, currentLocation[1]],
        // });
      },
    }
  ];
  return possibleOptions.filter((option) => {
    const o = option.direction;
    return map[o[0]] !== undefined && map[o[0]][o[1]] !== 1;
  });
}

export function buildRoomDescription(currArea) {
  const locat = getCurrentLocation(currArea);
  const enemies = locat.get('enemies');
  const items = locat.get('items');
  const eLen = enemies.length;
  const iLen = items.length;

  let eDes = '';
  let iDes = '';

  if (eLen === 1) { eDes = 'One enemy.'; } else if (eLen > 1) { eDes = 'Several enemies.'; }

  if (iLen === 1) { iDes = 'One item.'; } else if (iLen > 1) { iDes = 'Several items.'; }

  const description = [
    (<p key="desr0">You look around and see:</p>),
    (<p key="desr1">{`${locat.get('description')}`}</p>),
    (<p key="desr2">{eDes}</p>),
    (<p key="desr3">{iDes}</p>)
  ];
  return description;
}


export function getEnemyDescription(e) {
  return [
    <p key="0">
        Name:
      { e.name }
    </p>,
    <p key="00">
      Health:
      { e.health }
    </p>,
    <p key="1">
        Class:
      { e.class }
    </p>,
    <p key="2">
        Description:
      { e.description }
    </p>,
    <p key="3">
        Level:
      { e.level }
    </p>,
  ];
}


export function getAttackOptions(currLocation) {
  const options = [];
  if (currLocation) {
    const enemies = currLocation.get('enemies');
    enemies.forEach((enemy) => {
      options.push({
        label: `${enemy.name} (lv ${enemy.level} ${enemy.class})`,
        tooltip: getEnemyDescription(enemy),
        action: () => {
        }
      });
    });
  }
  return options;
}

export function getItemDescription(i) {
  // TODO: Add in multiple type support. Such as weapon modification and such.
  return [
    <p key="0">
      { i.description }
    </p>,
    <p key="1">
      Food:
      { i.food }
    </p>,
    <p key="2">
      Water:
      { i.water }
    </p>,
    <p key="3">
      Health:
      { i.health }
    </p>,
    <p key="4">
      Uses:
      { i.uses }
    </p>,
    <p key="5">
      Size:
      { i.space }
    </p>,
  ];
}

export function getSkillDescription(s) {
  return [
    <p key="0">
      { s.name }
      (lv
      { s.level }
      )

    </p>,
    <p key="1">
      { s.description }
    </p>,
  ];
}

export function getPickupOptions(currLocation) {
  const options = [];
  if (currLocation) {
    const items = currLocation.get('items');
    options.push({
      label: 'Take All',
      action: () => {
      }
    });
    items.forEach((item) => {
      options.push({
        label: `${item.name}`,
        tooltip: getItemDescription(item),
        action: () => {
        }
      });
    });
  }
  return options;
}
