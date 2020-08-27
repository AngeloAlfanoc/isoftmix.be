import * as serviceWorker from './serviceWorker';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// import UnderConstruction from './UnderConstruction';


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.register();

