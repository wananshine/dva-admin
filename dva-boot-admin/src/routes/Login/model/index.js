import { routerRedux } from 'dva';
import { login, getCode } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    // message: '',
    token: '',
    user: {}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
            try {
                const response =  dispatch({
                    type: 'getCode'
                });
                console.log('response:',response)
            } catch (e) {
            }

          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *getCode(_, { call, put }) {
          try {
              const response = yield call(getCode);
              if(response && response.code === 200){
                  yield put({
                      type: 'loginSuccess',
                      payload: response,
                  });
              }
              console.log('response:',response);
          } catch (e) {
          }
    },
    *login({ payload } , { call, put }) {
        try {
            const response = yield call(login, payload);
            $$.setStore('Token', `Bearer ${response.token}`);
            yield put(routerRedux.replace('/'));
            // if (status) {
            //     $$.setStore('user', data);
            //     // yield put(routerRedux.replace('/'));
            // } else {
            //     yield put({
            //         type: 'loginError',
            //         payload: { message }
            //     });
            // }
        } catch (e) {
            yield put({
                type: 'loginError'
            });
        }
    },
    *logout(_, { put }) {}
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        // message: '',
        token: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        // message: payload.message
      };
    }
  }
};
