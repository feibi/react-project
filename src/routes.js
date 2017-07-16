import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Index from './pages/index/'
import List from 'bundle-loader?lazy!./pages/list/'
import lazyLoad from './until/lazyLoadRoute'

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/list" exact component={lazyLoad(List)}/>
        </Switch>
      </div>
    )
  }
}

export default Routes
