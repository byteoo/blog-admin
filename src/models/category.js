import {queryCategory} from '@/services/api';

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
