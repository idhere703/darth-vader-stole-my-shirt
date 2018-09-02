function getCurrentArea(world) {
  const areas = world.get('areas');
  const index = areas.findIndex(a => a.floor === world.get('current_floor'));
  return areas[index];
}

function getCurrentLocation(currentArea) {
  const locationIndex = currentArea.get('current_location');
  return currentArea.get('map')[locationIndex[0]][locationIndex[1]];
}

export { getCurrentArea, getCurrentLocation };