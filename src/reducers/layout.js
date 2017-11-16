import * as types from '~/src/actionTypes/layout';

export default function(state = {}, action) {
  switch (action.type) {
    case types.LAYOUT_COLLAPSED:
      return { ...state, collapsed: action.collapsed };

    default:
      return state;
  }
};
