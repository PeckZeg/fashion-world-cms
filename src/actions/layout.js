import types from '~/src/actionTypes';

export const setLayoutCollapsed = collapsed => ({
  type: types.LAYOUT_COLLAPSED,
  collapsed
});
