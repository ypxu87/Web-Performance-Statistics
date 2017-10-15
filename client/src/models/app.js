
export default {

  namespace: 'app',

  state: {
    currentItem: 'welcome',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    changePage(state, action) {
      return { ...state, currentItem: action.payload };
    },
  },

};
