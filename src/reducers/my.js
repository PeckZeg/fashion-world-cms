import * as types from '~/actionTypes/my';

export default function(state = {}, action) {
  switch (action.type) {
    case types.MY_TOKEN:
      return { ...state, token: action.token };

    case types.MY_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};
