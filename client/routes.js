var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

var App = require('./components/App');
var LandingPage = require('./components/LandingPage.jsx');
var LessonView = require('./components/LessonView.jsx');
var LibraryView = require('./components/library_components/library-view.jsx');
var SignupView = require('./components/signup/SignupView.jsx')

var routes = (
    <Route handler={App}>
      <Route path='/' handler={LandingPage} />
      <Route path='/register' handler={SignupView} />
      <Route path='/lesson' handler={LessonView} />
      <Route path='/library' handler={LibraryView} />
    </Route>
);

module.exports = routes;