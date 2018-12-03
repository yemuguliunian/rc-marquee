import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';
import _ from 'lodash';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  	
});

// 2. Plugins
// app.use({});

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
