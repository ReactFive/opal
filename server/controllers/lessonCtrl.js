var mongoose = require('mongoose');
var Lesson = require('mongoose').model('Lesson');
var User = require('mongoose').model('User');

exports.getAllLessons = function(req, res) {
  Lesson.find({})
  .exec(function (err, collection) {
    if (err) {
      res.status(500);
      return res.send(err);
    } else {
      return res.status(200).json(collection);
    }
  });
};

exports.getLessonByUrl = function(req, res, next) {
  var lessonUrl = req.params.url;
  Lesson.findOne({'lesson_url':lessonUrl})
  .populate('exercises')
  .exec(function(err, lesson) {
    if (!lesson) {
      err = new Error('That lesson does not exist');
      res.status(404);
      return res.send({reason:err.toString()});
    }
    if(err) {
      res.status(500);
      return res.send(err);
    } else {
      if (lesson.publish) {
        res.status(200).send(lesson);
      } else {
        res.status(401).send('Lesson not published')
      }
    }
  });
};

exports.updateLesson = function(req, res, next){
  Lesson.findOne({'lesson_url':req.params.url})
  .exec(function(err, lesson){
    //Ensure only the teacher can update certain parts of a lesson
    var owner = lesson.teacher.id.toString() === req.user._id.toString()   
    //Only update parts of the lesson supplied in req.body
    if (!owner || !req.body.hasOwnProperty('video_url')) {
      req.body.video_url = lesson.video_url
    }
    if (!owner || !req.body.hasOwnProperty('publish') || lesson.publish) {
      req.body.publish = lesson.publish
    //Set publish date
    } else {
      Lesson.findOneAndUpdate(
        {'lesson_url':req.params.url}, 
        {published_at : Date.now()},
        {upsert: true, 'new': true}, function(err, res){
          if (err) {console.log(err)}
        })
    }
    if (!req.body.hasOwnProperty('comments')) {req.body.comments = lesson.comments}
    Lesson.update({'lesson_url' : req.params.url}, {
      $set : 
        {
          title : req.body.title,
          video_url : req.body.video_url,
          publish : req.body.publish,
          comments : req.body.comments
        }
      }, function(err, raw){
        if (err) {
          console.log(err)
          res.sendStatus(500)
        }
        //Sends lesson back if update was successful
        Lesson.findOne({'lesson_url':req.params.url})
        .exec(function(err, lesson){
          if (err) {console.log(err)
          res.status(200).send(lesson)
          }
        })
      }
    )
  })
}

exports.createLesson = function(req, res, next){
    console.log(req.user)

    var newLesson = new Lesson ({
      title : req.body.title || "Your lesson",
      lesson_url : req.params.url,
      video_url : req.body.video_url || null,
      published : req.body.published || false,
      teacher: {
        id: req.user._id,
        name: req.user.local.name
      }
    });

    newLesson.save(function(err, lesson){
      if(err) {
        if(err.toString().indexOf('E11000') > -1) {
          //lesson_url is the only one required to be unique on the schema, so if we get this E11000 error
          //from mongolabs it's because the submitted lesson url already exists. 
          err = new Error('This lesson url already exists');
          console.log(err);
          res.status(409);
          return res.send({reason:err.toString()});
        } else {
          err = new Error('There was a problem creating your lesson');
          res.status(500);
          return res.send({reason:err.toString()});
        }
      }
      //ADDING THE LESSON ID TO THE USER'S DOCUMENT
      User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          lessons: lesson._id
        }
      }, {}, function(err, obj) {
        if (err) {
          console.log(500, err);
        } else {
          console.log(obj);
        }
      });
      res.status(201);
      res.json(lesson);
    });
}