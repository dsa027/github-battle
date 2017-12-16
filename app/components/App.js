var React = require('react');
var Popular = require('./Popular')
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Popular = require('./Popular');
var Battle = require('./Battle');
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/popular' component={Popular}/>
            <Route path='/battle' component={Battle}/>
            <Route render={() => {
              return <p>Not Found (404)</p>
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
