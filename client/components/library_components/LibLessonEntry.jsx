var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions');
var Router = require('react-router')
var Link = Router.Link;
var Navigation = Router.Navigation;

var _ = require('lodash');
var Moment = require('moment');

var LibLessonEntry = React.createClass({
  mixins: [Navigation],


  publish: function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("publish clicked!");
    Actions.togglePublish(this.props.lesson);
  },

  deleteLesson: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Actions.deleteLesson(this.props.lesson);
  },

  gotoConfigure: function () {
    Actions.sendLesson(this.props.lesson);
    this.transitionTo('/configure');
  },

  gotoLesson: function() {
    this.transitionTo('/' + this.props.lesson.lesson_url);
  },

  render: function() {
    var lesson = this.props.lesson;

    var commentCount = _.reduce(
      lesson.comments, function(total, comment){
        return total + comment.replies.length + 1
      }, 0);

    var createdDate;
    if(lesson.published_at) {
      createdDate = Moment(lesson.created_at).format('MMMM Do YYYY, h:mm a')
    } else {
      createdDate = 'Not published'
    }

    var video_id = lesson.video_url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    var publishDisplay = lesson.publish ?
        <li> Published on: {createdDate} </li>
      : <p onClick={this.publish}>Publish</p>;

    var imgUrl = 'http://img.youtube.com/vi/' + video_id + '/mqdefault.jpg'

    return (
      <li className="lib-lesson-entry" onClick={lesson.publish ? this.gotoLesson : this.gotoConfigure}>
        <img className="media pull-left videoSnippet" src={imgUrl} />
        <ul className="lib-lesson-info list-unstyled">
          <li className="lib-less-title">
            <a className ="titleAnchor">
              {lesson.title || 'title not found'}
            </a>
          </li>
          <li className="lib-less-author">
            Author: {lesson.teacher.name || 'anonymous'}
          </li>
          <li className="lib-lesson-stats">
            Comments: {commentCount}    Exercises: {lesson.exercises.length}
          </li>
          {publishDisplay}
        </ul>
        <span className="fa fa-trash-o pull-right" id="trashcan" onClick={this.deleteLesson}></span>
      </li>
    );
  }

})

module.exports = LibLessonEntry;


