import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {

    const routes = [{
        path : '/demo',
        title : '文字滚动',
        component : dynamic({
            app,
            models: () => [
                import('./models/indexPage.js')
            ],
            component: () => import('./routes/IndexPage.js')
        })
    }];

    return (
        <Router history={history}>
            <Switch>
                {
                    routes.map(item => {
                        return (
                            <Route key={item.name} exact path={item.path} component={item.component}/>
                        )
                    })
                }
            </Switch>
        </Router>
    );
}

export default RouterConfig;