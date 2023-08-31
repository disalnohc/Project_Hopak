import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Repair from './Repair';
import Login from './Login';
import Cleanroom from './Cleanroom';
import Security from './Security';
import Roomplan from './Roomplan';
import RoomDetail from './RoomDetail';
import Tenantdetails from './Tenantdetails';
import News from './News';
import Electricity from './Electricity';
import Water from './Water';
import Personnel from './Personnel';
import Calender from './Calender';
import Register from './Register';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/repair" component={Repair} />
        <PrivateRoute path="/Cleanroom" component={Cleanroom} />
        <PrivateRoute path="/Security" component={Security} />
        <PrivateRoute path="/Roomplan" component={Roomplan} />
        <PrivateRoute path="/Tenantdetails" component={Tenantdetails} />
        <PrivateRoute path="/News" component={News} />
        <PrivateRoute path="/Electricity" component={Electricity} />
        <PrivateRoute path="/Water" component={Water} />
        <PrivateRoute path="/Personnel" component={Personnel} />
        <Route path="/" exact component={Roomplan} />
        <Route path="/room/:id" component={RoomDetail} />
        <Route path="/Calender" component={Calender} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = checkAuthentication();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const checkAuthentication = () => {

  return true; 
};

export default App;
