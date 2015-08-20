var React = require('react');
var axios = require('axios');
var rootUrl = 'http://localhost:3000'

module.exports.login = function(email, password) {
  var url = rootUrl + '/api/login';
  var data = {email:email, password:password};

  return axios.post( url, data)
};

module.exports.signup = function(name, email, password) {
  var url = rootUrl + '/api/signup';
  var data = {name: name, email:email, password:password};

  return axios.post( url, data)
};

module.exports.logout = function(){
  var url  = rootUrl + '/api/logout';
  return axios.post(url);
};

module.exports.getUser = function() {
  var url  = rootUrl + '/api/user';
  return axios.get(url);
};

module.exports.updateLesson = function(lesson) {
  var url  = rootUrl + '/api/lesson/' + lesson.lesson_url;
  return axios.put(url, lesson);
};

module.exports.createLesson = function(lesson) {
  var url  = rootUrl + '/api/lesson/' + lesson.lesson_url;
  return axios.post(url, lesson);
};

module.exports.createExercise = function(exercise) {
  var url = rootUrl + '/api/exercise';
  return axios.post(url, exercise);
};

module.exports.updateExercise = function(exercise, exercise_id) {
  console.log("In apis", exercise, exercise_id);
  var url = rootUrl + '/api/exercise/' + exercise_id;
  return axios.put(url, exercise_id);
};

module.exports.updateUser = function(result) {
  var url  = rootUrl + '/api/user/';
  var obj = {
    addLesson: result.addLesson,
    unfollowLesson: result.unfollowLesson,
    lesson_url : result.lesson_url,
    _id : result._id
  }
  return axios.put(url, obj);
}

module.exports.getStatus = function(){
  var url  = rootUrl + '/api/authenticate';
  return axios.post(url);
};

module.exports.getLesson = function(lessonUrl) {
  var url  = rootUrl + '/api/lesson/'+lessonUrl; 
  return axios.get(url);
};
