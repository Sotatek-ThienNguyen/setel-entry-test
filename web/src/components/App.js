import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes";
import { Component } from "react";
import PrivateRoute from '../utils/privateRoutes';
import PublicRoute from '../utils/publicRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App"></div>
        <Switch>{this.showContentMenu(routes)}</Switch>
      </Router>
    );
  }

  showContentMenu = (routes) => {
    var result = null;

    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          route.public
          ? <PublicRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
          : <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }

    return result;
  };
}

export default App;
