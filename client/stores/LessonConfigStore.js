var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var AuthStore = require('./AuthStore');
var _ = require('lodash');

var LessonConfigStore = Reflux.createStore({
  listenables: [Actions],

  sendLesson: function(lesson){
    this.lesson = lesson;
    console.log("LessonConfigStore has received the lesson: ", this.lesson)
  },

  triggerConfigStore: function() {
    this.trigger(this.lesson);
  },

  createExercise: function(exercise) {
    var newExercise = {
      exercise : exercise,
      time : exercise.time,
      text : exercise.type,
      lesson_id : this.lesson._id
    };
    
    this.lesson.exercises.push(newExercise);
    console.log("sending exercise to database", newExercise);
    Api.createExercise(newExercise)
    .then(this.triggerConfigStore)
  },

  onUpdateExercise: function(exercise) {
    var updatedExercise = {
      exercise: exercise,
      time: exercise.time,
      text: exercise.type
    };
    var exercise_id = excercise.id;
    Api.updateExercise(updatedExercise, exercise_id)
    .then(this.triggerConfigStore);
  },

  onPublish: function(lesson){
    return Api.updateLesson({
      lesson_url : lesson.lesson_url,
      publish : true
    })
  },

});

module.exports = LessonConfigStore;
