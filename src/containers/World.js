import { connect } from 'react-redux';
import WorldView from '../components/World';
import { openSubmenu, breadcrumbClicked } from '../data/actions';

const mapDispatchToProps = dispatch => ({
  runAction: (actions, action) => {
    // If we have subactions, dispatch the open.
    if (action.subActions) return dispatch(openSubmenu(actions, action));
    // If we have a final action, run the action.
    if (typeof action.action === 'function') return action.action();
  },
  breadcrumbClicked: (actions, index) => dispatch(breadcrumbClicked(actions, index))
});
const mapStateToProps = state => ({
  world: state.get('world'),
  world_description: state.get('world_description'),
  actions: state.get('actions'),
  action_breadcrumbs: state.get('action_breadcrumbs'),
});

const WorldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldView);

export default WorldContainer;
