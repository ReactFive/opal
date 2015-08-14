var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var LessonConfigStore = require('../../stores/LessonConfigStore.js');
var Actions = require('../../actions.js');
var Navigation = Router.Navigation;

var AddVideoBox = React.createClass({
    mixins: [Navigation],

    getInitialState: function(){
      return {
        title: '',
        video_url: '',
        lesson_url: '',
        published: false      
      }
    },

    onInputChange: function(e){
      this.setState({title: React.findDOMNode(this.refs.title).value})
      this.setState({video_url: React.findDOMNode(this.refs.video_url).value})
      this.setState({lesson_url: React.findDOMNode(this.refs.lesson_url).value})
    },

    handleSubmit: function(e){
      e.preventDefault();
      Actions.createLesson({
        title: this.state.title,
        video_url: this.state.video_url,
        lesson_url: this.state.lesson_url,
        published: this.state.published
      });
      debugger;
      this.transitionTo('/configure');

    },
    
  render: function() {
    return (
      <div className="lesson-create col-xs-8 col-xs-offset-1">
        <div className="panel panel-default">
          <div className="panel-header text-center">
            <h3>CREATE A LESSON</h3>
            </div>
          <div className="panel-body">
          <form className="form-horizontal">
            
            <div className="form-group">
              <label htmlFor="lesson" className="col-sm-3 control-label"><strong>Lesson Title:</strong></label>
              <div className="col-sm-9">
              <input
                id="lesson"
                className="form-control"
                type="text" 
                placeholder="What is the name of your new Lesson?"
                ref="title" 
                value={this.state.title}
                onChange={this.onInputChange} />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="video_url" className="col-sm-3 control-label"><strong>Video URL:</strong></label>
              <div className="col-sm-9">
                <input
                id="video_url"
                  className="form-control"
                  type="url"
                  placeholder="Input your video URL here. We currently only support YouTube videos."
                  name="newVideoUrl" ref="video_url"
                  value={this.state.video_url}
                  onChange={this.onInputChange} />
              </div>
           </div>
            
            <div className="form-group">
              <label htmlFor="lesson_url" className="col-sm-3 control-label"><strong>Key words for URL</strong></label>
              <div className="col-sm-9">
                <input
                  id="lesson_url"
                  className="form-control"
                  type="text"
                  placeholder="/shakespeare-in-the-movies-lesson2"
                  name="newVideoUrl"
                  ref="lesson_url"
                  value={this.state.lesson_url}
                  onChange={this.onInputChange} />
              </div>
            </div>

            <button
              type="submit" 
              className="btn btn-primary pull-right"
              onClick={this.handleSubmit}>Save & Continue</button>
          </form>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AddVideoBox;