import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const Action = ({
  actions,
  action,
  runAction,
  index
}) => (
  <li
    key={`action-${index}`}
    onClick={
      () => runAction(actions, action)
    }
  >
    {
      action.tooltip ? (
        <div>
          <div data-tip data-for={`${index}`} className="world__actions--list-item">
            {action.label}
          </div>
          <ReactTooltip
            id={`${index}`}
            aria-haspopup="true"
            place="top"
            type="dark"
            effect="float"
            delayShow={500}
          >
            { action.tooltip }
          </ReactTooltip>
        </div>
      ) : (
        <div className="world__actions--list-item">
          {action.label}
        </div>
      )
    }
  </li>
);

Action.propTypes = {
  index: PropTypes.number.isRequired,
  actions: PropTypes.array.isRequired,
  action: PropTypes.object.isRequired,
  runAction: PropTypes.func.isRequired,
};

export default Action;
