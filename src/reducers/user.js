import * as constants from '../constants/user'

const initialState = {
  loading: false,
  error: null,
  groupsUpdating: false,
  errorGroupsUpdating: null,

  userId: '',
  userInfo: {
    twitterMatchGroups: [],
    instagramMatchGroups: [],
    info: {
      email: '',
      firstName: '',
      lastName: '',
    },
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case constants.USER_FETCHING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case constants.USER_FETCH_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...action.user,
          twitterMatchGroups: action.user.twitterMatchGroups || [],
          instagramMatchGroups: action.user.instagramMatchGroups || [],
        },
        loading: false,
        error: null,
      };

    case constants.USER_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case constants.UPDATING_USER_MATCH_GROUPS:
      return {
        ...state,
        groupsUpdating: true,
        errorGroupsUpdating: null,
      };

    case constants.UPDATE_USER_MATCH_GROUPS_SUCCESS:
      return {
        ...state,
        groupsUpdating: false,
        errorGroupsUpdating: null,
      };

    case constants.UPDATE_USER_MATCH_GROUPS_ERROR:
      return {
        ...state,
        groupsUpdating: false,
        errorGroupsUpdating: action.error,
      };

    default:
      return state;
  }
}
