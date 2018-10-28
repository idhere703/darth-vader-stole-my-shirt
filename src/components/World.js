import React from 'react';
import PropTypes from 'prop-types';
import Actions from './views/Actions';
import { getCurrentArea, getCurrentLocation } from '../utils';

function WorldView({
  world,
  world_description,
  actions,
  action_breadcrumbs,
  runAction,
  breadcrumbClicked
}) {
  const currArea = getCurrentArea(world);
  const currLocation = getCurrentLocation(currArea);
  return (
    <section>
      <section className="world__content">
        { world_description }
      </section>
      <Actions
        currLocation={currLocation}
        actions={actions}
        action_breadcrumbs={action_breadcrumbs}
        runAction={runAction}
        breadcrumbClicked={breadcrumbClicked}
      />
    </section>
  );
}

WorldView.propTypes = {
  world: PropTypes.object.isRequired,
  world_description: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  action_breadcrumbs: PropTypes.array,
  runAction: PropTypes.func.isRequired,
  breadcrumbClicked: PropTypes.func.isRequired
};


export default WorldView;
