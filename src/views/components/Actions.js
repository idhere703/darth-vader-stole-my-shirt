import React from 'react';
import ReactTooltip from 'react-tooltip'

function Actions(props) {
  const actions = props.worldInfo.get('actions');
  const breadcrumbs = props.worldInfo.get('action_breadcrumbs');

  function runAction(actions, action) {
    if (action.subActions) {
      return props.openSubmenu(actions, action);
    }

    if (typeof action.action === 'function') return action.action();
  }

  return (
    <section className="world__actions">
      { breadcrumbs.map((b, i) => {
        return (
          <span className="world__actions--breadcrumb" key={b.bIndex} onClick={() => props.breadcrumbClicked(b.preState, b.bIndex)}>
            {`${i !== 0 ? ' / ' : ''}${b.label}`}
          </span>
        );
      }) }
      <section className="world__actions--content">
        <ul>
          {
            actions.filter(a => {
              if (a.visible !== undefined) return a.visible(props.currLocation);
              return true;
            })
              .map((a, i) => {
                return (
                  <li key={i} onClick={() => runAction(actions, a)}>
                    {
                      a.tooltip ? (
                        <div>
                          <div data-tip data-for={`${i}`} className="world__actions--list-item">&#8594; {a.label}</div>
                          <ReactTooltip id={`${i}`} aria-haspopup='true' place="top" type="dark" effect="float" delayShow={500}>{ a.tooltip }</ReactTooltip>
                        </div>
                      ) : (
                        <div className="world__actions--list-item">&#8594; {a.label}</div>
                      )
                    }
                  </li>
                );
              })}
        </ul>
      </section>
    </section>
  );
}

export default Actions;