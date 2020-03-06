import {queryCategory, addCategory, delCategory, updateCategory} from '@/services/api';

export default {
  namespace: 'category',
  state: {
    categoryList: [],
  },
  effects: {
    * fetch(_, {call, put}) {
      console.log("fetch")
      const response = yield call(queryCategory);
      console.log(response)
      yield put({
        type: 'save',
        payload: {
          categoryList: response
        },
      });
    },
    * delete({payload: id}, {call, put}) {
      yield call(delCategory, id);
      yield put({type: 'fetch'});
    },
    * update({payload}, {call, put}) {
      yield call(updateCategory, payload);
      yield put({type: 'fetch'});
    },
    * create({payload}, {call, put, select}) {
      yield call(addCategory, payload);
      yield put({type: 'fetch'});
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },

  },
};
