import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { USER_FETCH, UPDATE_USER_MATCH_GROUPS } from '../constants/user';
import { userFetch, userUpdateMatchingGroups } from './user';

export function* sagas() {
  yield [
    fork(takeLatest, USER_FETCH, userFetch),
    fork(takeLatest, UPDATE_USER_MATCH_GROUPS, userUpdateMatchingGroups),
  ];
}
