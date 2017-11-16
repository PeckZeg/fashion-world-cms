import * as actions from '~/src/actions/layout';

export const onLayoutCollapsed = dispatch => ({
  onLayoutCollapsed: collapsed => dispatch(
    actions.setLayoutCollapsed(collapsed)
  )
});
