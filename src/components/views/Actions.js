import React from 'react';
import PropTypes from 'prop-types';
import Action from './Action';

function Actions({
  currLocation,
  actions,
  action_breadcrumbs = [],
  runAction,
  breadcrumbClicked
}) {
  return (
    <section className="world__actions">
      { action_breadcrumbs.map((b, i) => (
        <span
          className="world__actions--breadcrumb"
          key={b.bIndex}
          onClick={() => breadcrumbClicked(b.preState, b.bIndex)}
        >
          {`${i !== 0 ? ' / ' : ''}${b.label}`}
        </span>
      )) }
      <section className="world__actions--content">
        <ul>
          {
            // TODO: Replace with action to get list of visible actions.
            actions.filter((a) => {
              if (a.visible !== undefined) return a.visible(currLocation);
              return true;
            }).map((a, i) => (<Action runAction={runAction} action={a} index={i} />))}
        </ul>
      </section>
    </section>
  );
}

Actions.propTypes = {
  currLocation: PropTypes.object.isRequired,
  actions: PropTypes.array.isRequired,
  action_breadcrumbs: PropTypes.array.isRequired,
  runAction: PropTypes.func.isRequired,
  breadcrumbClicked: PropTypes.func.isRequired
};

export default Actions;
