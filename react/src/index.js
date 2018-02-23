import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const rootElement = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement,
  );
};


render(App);
// if (module.hot) {
//   module.hot.accept();
// }
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextRootContainer = require('./components/App.js').default;

    render(NextRootContainer);
  });
  // module.hot.accept();
}
