import { call, put } from 'redux-saga/effects';

import UserAPI from '../api/user';
import * as constants from '../constants/user';

export function* userFetch(action) {
  yield put({type: constants.USER_FETCHING});

  try {
    const user = yield call(UserAPI.getUser);

    yield put({
      type: constants.USER_FETCH_SUCCESS,
      user,
    });
  } catch (error) {
    yield put({
      type: constants.USER_FETCH_ERROR,
      error,
    });
  }
}

export function* userUpdateMatchingGroups(action) {
  yield put({type: constants.UPDATING_USER_MATCH_GROUPS});

  try {
    yield UserAPI.updateUserMatchingGroups(action.data);

    yield put({
      type: constants.UPDATE_USER_MATCH_GROUPS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_USER_MATCH_GROUPS_ERROR,
      error,
    });
  }
}
