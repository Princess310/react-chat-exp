// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: 'chat',
      name: 'chatPage',
      onEnter(nextState, replace, callback) {
        const importModules = import('containers/ChatPage/sagas');

        importModules.then((sagas) => {
          if (this.loadedSagas) {
            callback();
            return;
          }

          this.loadedSagas = injectSagas(sagas.default);
          callback();
        });

        importModules.catch(errorLoading);
      },
      onLeave() {
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel());
          delete this.loadedSagas;
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ChatPage/reducer'),
          import('containers/ChatPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('chat', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'login',
      name: 'loginPage',
      onEnter(nextState, replace, callback) {
        const importModules = import('containers/LoginPage/sagas');

        importModules.then((sagas) => {
          if (this.loadedSagas) {
            callback();
            return;
          }

          this.loadedSagas = injectSagas(sagas.default);
          callback();
        });

        importModules.catch(errorLoading);
      },
      onLeave() {
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel());
          delete this.loadedSagas;
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('loginPage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'wechat',
      name: 'wechatLogin',
      onEnter(nextState, replace, callback) {
        const importModules = import('containers/WeChatLogin/sagas');

        importModules.then((sagas) => {
          if (this.loadedSagas) {
            callback();
            return;
          }

          this.loadedSagas = injectSagas(sagas.default);
          callback();
        });

        importModules.catch(errorLoading);
      },
      onLeave() {
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel());
          delete this.loadedSagas;
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/WeChatLogin/reducer'),
          import('containers/WeChatLogin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('wechatLogin', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
