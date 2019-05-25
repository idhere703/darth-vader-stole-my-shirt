import React from 'react';
import { setDescription, changeLocationAction, basicAttackAction } from './data/actions';

// HELPER FUNCTIONS:
// Helper function to update the current location within the world.
function updateCurrentLocation(world, locationUpdateObj) {
  const areaIndex = getAreaIndex(world);
  const locationIndex = world.areas[areaIndex].get('current_location');
  const rowIndex = locationIndex[0];
  const colIndex = locationIndex[1];
  return world.set('areas', world.areas.map((a, ai) => {
    if (ai !== areaIndex) return a;
    return a.set('map', a.get('map').map((row, ri) => {
      if (ri !== rowIndex) return row;
      return row.map((locat, ci) => {
        if (ci !== colIndex) return locat;
        return locat.mergeDeep(locationUpdateObj);
      });
    }));
  }));
}

function getAreaIndex(world) {
  const areas = world.get('areas');
  const currentFloor = world.get('current_floor');
  return areas.findIndex(a => a.floor === currentFloor);
}
// END OF HELPER FUNCTIONS

export function getCurrentArea(world) {
  return world.get('areas')[getAreaIndex(world)];
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
        action: () => setDescription(buildRoomDescription(currArea))
      },
      {
        label: 'Enemies',
        visible(locat) {
          return locat.get('enemies').length;
        },
        // TODO: Implement perception check and pass list of perceived enemies to render.
        // Should only be calculated on room enter.
        subActions: currLocation.get('enemies').map(e => ({
          label: `${e.name} (lv ${e.level})`,
          action: () => setDescription(getEnemyDescription(e))
        }))
      },
      {
        label: 'Items',
        visible(locat) {
          return locat.get('items').length;
        },
        subActions: currLocation.get('items').map(i => ({
          label: i.name,
          action: () => setDescription(getItemDescription(i))
        }))
      },
    ],
  }, {
    label: 'Attack',
    subActions: getAttackOptions(currLocation, character),
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
      action: () => changeLocationAction([currentLocation[0] + 1, currentLocation[1]])
    }, {
      label: 'East',
      direction: [currentLocation[0], currentLocation[1] + 1],
      action: () => changeLocationAction([currentLocation[0], currentLocation[1] + 1])
    }, {
      label: 'West',
      direction: [currentLocation[0], currentLocation[1] - 1],
      action: () => changeLocationAction([currentLocation[0], currentLocation[1] - 1])
    }, {
      label: 'South',
      direction: [currentLocation[0] - 1, currentLocation[1]],
      action: () => changeLocationAction([currentLocation[0] - 1, currentLocation[1]])
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

  if (eLen === 1) {
    eDes = 'One enemy.';
  } else if (eLen > 1) {
    eDes = 'Several enemies.';
  }

  if (iLen === 1) {
    iDes = 'One item.';
  } else if (iLen > 1) {
    iDes = 'Several items.';
  }

  const description = [
    (<p key="desr0">You look around and see:</p>),
    (
      <p key="desr1">
        { `${locat.get('description')}` }
      </p>
    ),
    (
      <p key="desr2">
        { eDes }
      </p>
    ),
    (
      <p key="desr3">
        { iDes }
      </p>
    )
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


export function getAttackOptions(currLocation, character) {
  const options = [];
  if (currLocation) {
    const enemies = currLocation.get('enemies');
    enemies.forEach((enemy) => {
      const hitChance = parseInt(getHitChance(character, enemy) * 100, 10);
      options.push({
        label: `${enemy.name} (lv ${enemy.level} ${enemy.class}) Hit(${hitChance}%) H(${enemy.health})`,
        tooltip: getEnemyDescription(enemy),
        action: () => basicAttackAction(character, enemy.id)
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

// Reduce passed prop to no less than zero.
export function reduceProp(char, prop, newVal) {
  if (char && prop && typeof newVal === 'number') {
    const newProp = char.get(prop) - newVal;
    if (newProp < 0) {
      return char.set(prop, 0);
    }
    return char.set(prop, newProp);
  }
  return char;
}

export function changeLocation(state, action) {
  const s1 = state.updateIn(['world', 'areas'], (areas) => {
    const index = areas.findIndex(a => a.floor === state.get('world').current_floor);
    // Only allow update if the space isn't blocked.
    const currLoc = getLocation(areas[index], action.newLocation);
    if (isValidLocation(currLoc)) {
      areas[index] = areas[index].set('current_location', action.newLocation);
    }
    return areas;
  });
  // Reset actions
  const s2 = s1.set('actions', setActions(getCurrentArea(s1.get('world')), s1.get('character')));
  // Reset breadcrumbs
  const s3 = s2.set('action_breadcrumbs', []);
  // Build room description.
  return s3.set('world_description', buildRoomDescription(getCurrentArea(s3.get('world'))));
}

export function isValidLocation(location) {
  return location !== undefined && location !== 1;
}

export function getLocation(area, location) {
  const locationIndex = location || area.get('current_location');
  const map = area.get('map');
  return map[locationIndex[0]] && map[locationIndex[0]][locationIndex[1]];
}

// CHARACTER
export function levelUp(character, baseSkillPointIncrease = 5) {
  // If the amount of exp doesn't match up to what we need. Just return.
  if (character.get('experience_points') < character.get('needed_exp')) return character;
  // Increase level by one.
  const newLevel = parseInt(character.get('level'), 10) + 1;
  // Increase skill points by the base and wisdom / 3.
  const currSkillPoints = character.get('skill_points');
  const newSkillPoints = currSkillPoints + baseSkillPointIncrease + (character.get('wisdom') / 3);
  // Get a list of all the stats to increase.
  const statIncreases = [
    'attack', 'defense', 'health', 'max_health', 'wisdom', 'stealth', 'perception', 'speed', 'accuracy',
  ].reduce((stats, stat) => {
    const currStat = character[stat];
    stats[stat] = currStat + (currStat * character.potential[stat]);
    return stats;
  }, {});
  const newChar = character.mergeDeep({
    level: newLevel,
    needed_exp: character.get('needed_exp') + (newLevel >= 10 ? (newLevel * (newLevel - 1) / 2) * 1000 : (newLevel * 1000)),
    experience_points: 0,
    skill_points: newSkillPoints
  }, statIncreases);
  return newChar;
}

export function damageDone(actor, target) {
  // TODO: Add in 'glancing blows'?
  const damage = target.get('attack') - actor.get('defense');
  return damage >= 0 ? damage : 0;
}

// TODO: Move basehit to enums file for easy default reference.
export function getHitChance(actor, target, baseHit = 0.5) {
  return ((actor.get('accuracy') - (target.get('speed') / 2)) / 100) + baseHit;
}

// NON PURE FUNCTIONS
export function hitOrMiss(actor, target, baseHit = 0.5, enemy = true) {
  const neededHit = Math.random();
  // Don't worry about hit if it's an ally. Just the passed base hit.
  if (enemy === false) return baseHit >= neededHit;
  // TODO: Calculate the additional effects of status.
  // So if I'm buffing accuracy on the actor, add that into the calculations.
  const hit = getHitChance(actor, target, baseHit);
  return hit >= neededHit;
}

export function attackCharacter(actor, target, action) {
  // TODO: Add status effects to list of 'attacks'.
  switch (action.attType) {
    case 'basic':
      if (hitOrMiss(actor, target, action.baseHit) === true) {
        const damage = damageDone(actor, target);
        const afterDamage = reduceProp(target, 'health', damage);
        const key = `${target.id}-${afterDamage.health}`;
        if (afterDamage.get('health') > 0) {
          return {
            target: afterDamage,
            description: (
              <p key={key}>
                {`Damaged ${target.name} for ${damage} damage.\n${target.name} H(${afterDamage.health})`}
              </p>
            )
          };
        }
        return {
          target: null,
          description: (
            <p key={key}>
              {`Attack killed ${target.name}.\n`}
            </p>
          )
        };
      }
      return {
        target,
        description: (
          <p>
            {`Attack on ${target.name} missed.\n`}
          </p>
        )
      };
    default:
      return { target };
  }
}

export function basicAttack(state, action) {
  const location = getCurrentLocation(getCurrentArea(state.get('world')));
  let world_description = '';
  const world = updateCurrentLocation(state.get('world'), location.set(
    'enemies',
    location.get('enemies').map((e) => {
      if (e.id !== action.targetId) return e;
      // TODO: Remove target when health reaches zero.
      // TODO: Add target drops to map on target death.
      // TODO: Add experience points to the actor on target death.
      // TODO: Level up actor after certain experience point gain.
      const { target, description } = attackCharacter(action.actor, e, {
        attType: 'basic'
      });
      world_description = description;
      return target;
      // Remove all dead enemies.
    }).filter(e => e !== null)
  ));
  return { world, world_description };
}
