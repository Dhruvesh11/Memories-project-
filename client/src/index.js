import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import {createStore,applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const root=ReactDOM.createRoot(document.getElementById('root'));
const store= createStore(reducers,compose(applyMiddleware(thunk)));
root.render(
    <Provider store={store}>
      <App />
     </Provider> 
);