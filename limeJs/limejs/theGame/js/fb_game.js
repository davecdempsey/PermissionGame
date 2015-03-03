//set main namespace
goog.provide('game');

// box2d requirements
goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Dynamics.b2Body');
goog.require('Box2D.Dynamics.b2FixtureDef');
goog.require('Box2D.Dynamics.b2Fixture');
goog.require('Box2D.Dynamics.b2World');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Dynamics.Joints.b2MouseJointDef');
goog.require('Box2D.Dynamics.Joints.b2RevoluteJointDef');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Collision.b2AABB');

// lime requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Polygon');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.fill.LinearGradient');
goog.require('lime.transitions.Dissolve');
goog.require('lime.GlossyButton');

goog.require('goog.math');


game.WIDTH = 1004;
game.HEIGHT = 720;
game.deniedPosition = 0;
game.acceptedPosition = 0;
game.animationCounter = 1;
game.app = [];
game.count;
game.user;
game.userId;
medBox = 1.075;
smallBox = 0.95;
largeBox = 1.2;
game.version;

game.beginning = true;

game.apps = {
    "app1": {


        "name": "Fortune Cookies",
        "executed": false,
        "img": "imgs/apps/fortuneCookies.png",
        "description": "This application enables you to check your daily fortune and horoscope.",
        "permissions": {
            "p1": {
                "name": "user_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of events you are attending",
                "required": true
            },
            "p2": {
                "name": "user_email",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your primary  email  address",
                "required": true
            },
            "p3": {
                "name": "user_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your birthday",
                "required": true
            },
            "p4": {
                "name": "user_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all of  the pages you have liked",
                "required": true
            },
            "p5": {
                "name": "user_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your current city as the location property",
                "required": true
            },
            "p6": {
                "name": "user_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the photos you have uploaded, and photos  you have been tagged in",
                "required": true
            },
            "p7": {
                "name": "user_relationships",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size":smallBox,
                "description": "your family and personal relationships and relationship status",
                "required": true
            },
            "p8": {
                "name": "user_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your status  messages",
                "required": true
            },
            "p9": {
                "name": "user_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "read access to your check-ins",
                "required": true
            },
            "p10": {
                "name": "friends_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends birthday",
                "required": true
            },
            "p11": {
                "name": "friends_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all of the pages your friends have liked",
                "required": true
            },
            "p12": {
                "name": "friends_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends' current city as the location property",
                "required": true
            },
            "p13": {
                "name": "friends_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends photos which you can see",
                "required": true
            },
            "p14": {
                "name": "friends_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends status messages which you can see",
                "required": true
            },
            "p15": {
                "name": "friends_work_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends work history which you can see",
                "required": true
            },
            "p16": {
                "name": "friends_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "read access to your friends check-ins which you can see",
                "required": true
            },
            "p17": {
                "name": "friends_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "access to the list of  events  your friends are attending",
                "required": true
            },

            "p18": {
                "name": "read_stream",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access all the posts in  your News Feed",
                "required": false
            },
            "p19": {
                "name": "publish_actions",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "post content, comments, and likes to your stream and to the streams of your friends",
                "required": false
            },
            "p20": {
                "name": "user_friendlists",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": " friend lists you have created",
                "required": false
            }
        }
    },

    "app2": {


        "name": "Schoolfeed",
        "executed": false,
        "img": "imgs/apps/schoolFeed.png",
        "description": "This application enables you to reconnect with your high school friends.",
        "permissions": {
            "p1": {
                "name": "user_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the photos you have uploaded, and photos you have been tagged in",
                "required": true
            },
            "p2": {
                "name": "user_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all the pages you have liked",
                "required": true
            },
            "p3": {
                "name": "user_email",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your primary email address",
                "required": true
            },
            "p4": {
                "name": "user_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your birthday",
                "required": true
            },
            "p5": {
                "name": "user_education_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your education history",
                "required": true
            },
            "p6": {
                "name": "user_hometown",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your hometown",
                "required": true
            },
            "p7": {
                "name": "user_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your current city as the location property",
                "required": true
            },

            /*
            "p8": {
                "name": "user_interests",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size":1,
                "description": "your list of interests",
                "required": true
            },
            "p9": {
                "name": "user_activities",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size":1,
                "description": "your list of activities",
                "required": true
            },
            */


            "p10": {
                "name": "friends_education_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends education history as the education property",
                "required": true
            },
            "p11": {
                "name": "friends_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends birthday",
                "required": true
            },
            "p12": {
                "name": "friends_hometown",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends hometown",
                "required": true
            },
            "p13": {
                "name": "friends_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends photos which you can see",
                "required": true
            },
            "p14": {
                "name": "read_stream",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access all the posts in your News Feed",
                "required": false
            },
            "p15": {
                "name": "publish_actions",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "post content, comments, and likes to your stream and to the streams of your friends",
                "required": false
            },
            "p16": {
                "name": "user_friendlists",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": " access any friend lists you have created",
                "required": false
            }
        }
    },

    "app3": {
        "name": "Yearbook",
        "executed": false,
        "img": "imgs/apps/yearbook.png",
        "description": "This application enables you to view high school Yearbooks, Photos and Classmates!",
        "permissions": {
            "p1": {
                "name": "user_email",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your primary email address",
                "required": true
            },

            /*
            "p2": {
                "name": "user_about_me",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size":1,
                "description": "'AboutMe' section of your profile",
                "required": true
            },
            */

            "p3": {
                "name": "user_education_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your education history",
                "required": true
            },
            "p4": {
                "name": "user_work_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your work history",
                "required": true
            },
            "p5": {
                "name": "user_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your birthday",
                "required": true
            },
            "p6": {
                "name": "user_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your current city as the location property",
                "required": true
            },
            "p7": {
                "name": "user_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the photos you have uploaded, and photos you have been tagged in",
                "required": true
            },
            "p8": {
                "name": "user_videos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the videos you have uploaded, and videos you have been tagged in",
                "required": true
            },
            "p9": {
                "name": "friends_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends photos which you can see",
                "required": true
            },
            "p10": {
                "name": "friends_videos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends videos which you can see",
                "required": true
            },
            "p11": {
                "name": "friends_education_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends education history as the education property",
                "required": true
            },
            "p12": {
                "name": "publish_actions",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "post content, comments, and likes to your stream and to the streams of your friends",
                "required": false
            }
        }
    },

    "app4": {
        "name": "They / Their / They're",
        "executed": false,
        "img": "imgs/apps/They_Their_Theyre.png",
        "description": "This application scans your Facebook profile and information, and highlights your actions on Facebook that could hurt your privacy, security and reputation.",

        "permissions": {
            "p1": {
                "name": "user_email",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "access your primary email address",
                "required": true
            },
            "p2": {
                "name": "user_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your birthday",
                "required": true
            },
            "p3": {
                "name": "user_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all of the pages you have liked",
                "required": true
            },
            "p4": {
                "name": "user_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your current city as the location property",
                "required": true
            },
            "p5": {
                "name": "user_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the photos you have uploaded, and photos you have been tagged in",
                "required": true
            },
            "p6": {
                "name": "user_relationships",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your family and personal relationships and relationship status",
                "required": true
            },
            "p7": {
                "name": "user_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your status messages",
                "required": true
            },
            "p8": {
                "name": "user_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "read access to your check-ins",
                "required": true
            },
            "p9": {
                "name": "friends_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends birthday ",
                "required": true
            },
            "p10": {
                "name": "friends_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all the pages your friends have liked",
                "required": true
            },
            "p11": {
                "name": "friends_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends current city as the location property",
                "required": true
            },
            "p12": {
                "name": "friends_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends photos which you can see",
                "required": true
            },
            "p13": {
                "name": "friends_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends status messages which you can see",
                "required": true
            },
            "p14": {
                "name": "friends_work_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends work history which you can see",
                "required": true
            },
            "p15": {
                "name": "friends_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "read access to your friends check-ins which you can see",
                "required": true
            },
            "p16": {
                "name": "friends_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of events your friends are attending",
                "required": true
            },
            "p17": {
                "name": "user_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of events you are attending",
                "required": true
            },
            "p18": {
                "name": "publish_actions",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "post content, comments, and likes to your stream and to the streams of your friends",
                "required": false
            },
            "p19": {
                "name": "read_stream",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access all the posts in your News Feed",
                "required": false
            },
            "p20": {
                "name": "user_friendlists",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access any friend lists you have created",
                "required": false
            }
        }
    },

    "app5": {
        "name": "secure.me",
        "executed": false,
        "img": "imgs/apps/secure_me.png",
        "description": "This application is based on a quiz to test knowedge of when to use the words there, their and they're.",
        "permissions": {
            "p1": {
                "name": "user_email",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your primary email address",
                "required": true
            },
            "p2": {
                "name": "user_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your birthday",
                "required": true
            },
            "p3": {
                "name": "user_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all the pages you have liked",
                "required": true
            },
            "p4": {
                "name": "user_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your current city",
                "required": true
            },
            "p5": {
                "name": "user_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "the photos you have uploaded, and photos you have been tagged in",
                "required": true
            },
            "p6": {
                "name": "user_relationships",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your family and personal relationships and relationship status",
                "required": true
            },
            "p7": {
                "name": "user_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your status messages",
                "required": true
            },
            "p8": {
                "name": "user_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "read access to your check-ins",
                "required": true
            },
            "p9": {
                "name": "friends_birthday",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends birthday ",
                "required": true
            },
            "p10": {
                "name": "friends_likes",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of all of the pages your friends have liked",
                "required": true
            },
            "p11": {
                "name": "friends_location",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends current city as the location property",
                "required": true
            },
            "p12": {
                "name": "friends_photos",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends photos which you can see",
                "required": true
            },
            "p13": {
                "name": "friends_status",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends status messages which you can see",
                "required": true
            },
            "p14": {
                "name": "friends_work_history",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "your friends status messages which you can see",
                "required": true
            },
            "p15": {
                "name": "friends_checkins",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "your friends check-ins which you can see",
                "required": true
            },
            "p16": {
                "name": "friends_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of events your friends are attending",
                "required": true
            },
            "p17": {
                "name": "user_events",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": smallBox,
                "description": "list of events you are attending",
                "required": true
            },
            "p18": {
                "name": "publish_actions",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "post content, comments, and likes to your stream and to the streams of your friends",
                "required": false
            },
            "p19": {
                "name": "read_stream",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access all the posts in your News Feed",
                "required": false
            },
            "p20": {
                "name": "user_friendlists",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size": largeBox,
                "description": "access any friend lists you created",
                "required": false
            }

            /*
            "p21": {
                "name": "manage_notifications",
                "accepted": true,
                "box": null,
                "inTruck": false,
                "size":1,
                "description": "read your  notifications and mark them as read",
                "required": false
            }
            */
        }
    }
};

game.createSplashScreen = function(){

    game.inGame = false;
    document.body.style.cursor = "wait";
    var menuScene = new lime.Scene(),

        layer = new lime.Layer().setPosition(game.WIDTH * 0.5, game.HEIGHT * 0.5),

        background = new lime.Sprite().setSize(game.WIDTH,game.HEIGHT).setFill('Sprites/bg.png');

    layer.appendChild(background);
    menuScene.appendChild(layer);

    return menuScene;



};

game.menu = function(){


    var splashScene = game.createSplashScreen();


    lime.scheduleManager.callAfter(function(dt){

        document.body.style.cursor = "auto";

        var target = new lime.Layer().setPosition(game.WIDTH * 0.85,game.HEIGHT * 0.85),

            circle = new lime.Circle().setSize(150,150).setFill('#4867D6'),
            lbl = new lime.Label().setSize(160,25).setFontSize(30).setText('Start!');

        //add circle and label to target object
        target.appendChild(circle);
        target.appendChild(lbl);

        //add target and title to the menuScene

        splashScene.appendChild(target);


        //add menuScene interaction
        goog.events.listen(target,['mousedown','touchstart'],function(e){

            //animate
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(.81).setDuration(.2),
                new lime.animation.ScaleTo(1.5).setDuration(.81)

            ));

            //listen for end event
            e.swallow(['mouseup','touchend'],function(){
                target.runAction(new lime.animation.Sequence(
                    new lime.animation.FadeTo(0),
                    new lime.animation.ScaleTo(.03)
                ));


                lime.scheduleManager.callAfter(function(dt){

                    game.showTut();


                }, game.director, 1500);

            });


        });

    }, game.director, 2000);


    // set current scene active
    game.director.makeMobileWebAppCapable();
    game.director.replaceScene(splashScene);

};

game.showApp = function(){

    game.inGame = false;
    game.deniedPosition = 0;
    game.acceptedPosition = 0;
    game.animationCounter = 1;
    game.count = 0;
    game.thePermissions = null;
    game.perms = null;
    game.stopped = false;


    var currentApp;


    for (var key in game.apps) {



        var required = 0;
        var extended = 0;

        currentApp = game.apps[key];

        console.log("App: " + currentApp.name);

        for(var pKey in currentApp.permissions){
            if(currentApp.permissions[pKey].required){
                required++;
            }
            else{
                extended++;
            }

        }
        console.log("Required: " + required);

        console.log("Extended: " + extended);

        if(!game.apps[key].executed){
            break;
        }


    }

    var lbl = new lime.Label().setSize(160,25).setFontSize(30).setText(currentApp.name).setPosition(game.WIDTH * 0.5, game.HEIGHT * 0.1),
        background = new lime.Sprite().setPosition(game.WIDTH * 0.5 ,game.HEIGHT * 0.5).setFill(currentApp.img),
        showAppScene = new lime.Scene(),
        discription = new lime.Label().setSize(500,50).setFontSize(20).setText(currentApp.description).setPosition(game.WIDTH * 0.5, game.HEIGHT * 0.3);

    showAppScene.appendChild(lbl);
    showAppScene.appendChild(background);

    showAppScene.appendChild(discription);



    lime.scheduleManager.callAfter(function(dt){

        game.Game(currentApp);

    }, game.director, 5000);


    game.director.replaceScene(showAppScene, lime.transitions.Dissolve);
};

game.showTut = function(){

    var theCount = 1;

    var showTut = new lime.Scene(),

        layer = new lime.Layer().setPosition(game.WIDTH * 0.5, game.HEIGHT * 0.5),
        background = new lime.Sprite().setSize(game.WIDTH,game.HEIGHT).setFill('Sprites/Tutorial/T0.png');


    function tutorial(count){
        background.setFill('Sprites/Tutorial/T' + count + '.png');
        theCount += 1;
    }




    var target = new lime.Layer().setPosition(game.WIDTH * 0.85,game.HEIGHT * 0.85),

        circle = new lime.Circle().setSize(80,80).setFill('#4867D6'),
        lbl = new lime.Label().setSize(160,25).setFontSize(30).setText('Next');

    //add circle and label to target object
    target.appendChild(circle);
    target.appendChild(lbl);



    //add menuScene interaction
    goog.events.listen(target,['mousedown','touchstart'],function(e){

        //animate
        target.runAction(new lime.animation.Spawn(
            new lime.animation.FadeTo(.81).setDuration(.2),
            new lime.animation.ScaleTo(1.5).setDuration(.81)

        ));

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Sequence(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1)
            ));


            lime.scheduleManager.callAfter(function(dt){

                if(theCount < 6)
                    tutorial(theCount);
                else
                    game.showApp();


            }, game.director, 1500);

        });


    });

    layer.appendChild(background);
    showTut.appendChild(layer);

    // add target to showTut sceen
    showTut.appendChild(target);

    game.director.replaceScene(showTut, lime.transitions.Dissolve);


}

game.gameResults = function(currentApp){

    document.body.style.cursor = "auto";

    var required = "Required: ";
    var extended = "Optional: ";
    var gameInstalled = true;
    var acceptedString = "";
    var acceptedRString = "";
    var acceptedEString = "";
    var deniedRString = "";
    var deniedEString = "";
    var deniedString = "";
    var resultsScene = new lime.Scene(),

        layer = new lime.Layer().setPosition(game.WIDTH * 0.5, game.HEIGHT * 0.5),
        acceptedLayer = new lime.Layer().setPosition(game.WIDTH * 0.78 + 30, game.HEIGHT * 0.5),
        deniedLayer = new lime.Layer().setPosition(game.WIDTH * 0.2, game.HEIGHT * 0.5),

        background = new lime.Sprite().setSize(game.WIDTH,game.HEIGHT).setFill('Sprites/game_bg.png'),
        deniedBoard = new lime.Sprite().setFill('Sprites/chalkBoard.png'),
        acceptedBoard = new lime.Sprite().setFill('Sprites/chalkBoard.png'),

        deniedPermissions = new lime.Label().setFontSize(17).setFontColor('#FFFFFF').setPosition(0, 0).setSize(150, 400),
        acceptedPermissions = new lime.Label().setFontSize(17).setFontColor('#FFFFFF').setPosition(0, 0).setSize(150, 400),


        app = new lime.Sprite().setPosition(game.WIDTH * 0.5 ,game.HEIGHT * 0.5).setFill(currentApp.img),

        appName = new lime.Label().setSize(160,25).setFontSize(30).setText(currentApp.name).setPosition(game.WIDTH * 0.5 - 15, game.HEIGHT * 0.33).setFontWeight('bold').setSize(50, 25);

    for(var key in currentApp.permissions){
        if (currentApp.permissions[key].accepted){
            if(currentApp.permissions[key].required){

                acceptedRString += " " + currentApp.permissions[key].name + " ";
            }
            else{
                acceptedEString += " " + currentApp.permissions[key].name + " ";

            }

            //acceptedString += " " + currentApp.permissions[key].name;
        }

        else{
            if(currentApp.permissions[key].required){
                deniedRString += " " + currentApp.permissions[key].name + " ";
            }
            else{
                deniedEString += " " + currentApp.permissions[key].name + " ";

            }
            //deniedString += " " + currentApp.permissions[key].name;

            if(currentApp.permissions[key].required){
                gameInstalled = false;
            }

        }
        
       var psize = game.version == 0 || game.version == 2 ? medBox * 25 : currentApp.permissions[key].size * 25;
        $.post("send.php",
             {
              UserID: game.userId,
              GroupID: game.version,
              AppID:currentApp.name,
              PermissionName: currentApp.permissions[key].name,
              PermissionType: currentApp.permissions[key].required == true ? "Required" : "Extended",
	      PermissionSize: psize,
              Decision: currentApp.permissions[key].accepted == true ? "Allowed" : "Denied"
             },
            function(data,status){
             //alert("Data: " + data + "\nStatus: " + status);
            console.log(data);
            });
     
        
        // AppID: currentApp.name;
        // Permission name: currentApp.permissions[key].name
        // Permission type: currentApp.permissions[key].required (bool)
        
        // if boxes are fixed sized the size of the boxes are medBox
        // if not the small boxes are smallBox and large are largeBox
        
        // medBox = 1.075;
        // smallBox = 0.95;
        // largeBox = 1.2;
        // Permission size: currentApp.permissions[key].size (mult by 25) 
        
        // if they didnt shoot. (allowed)
        // Allowed : currentApp.permissions[key].accepted (bool)
        
        // game version: game.version
        // 0 size is fixed size and highlight
        // 1 is not fixed and highlight
        // 2 size is fixed and there is no highlight
        // 3 is not fixed an there is highlight
        
        // username: game.userId
          
          

        
    }

    deniedString = required + deniedRString + extended + deniedEString;
    acceptedString = required + acceptedRString + extended + acceptedEString;


    deniedPermissions.setText(deniedString).setAlign('left');
    acceptedPermissions.setText(acceptedString).setAlign('left');

    acceptedLayer.appendChild(acceptedBoard);
    acceptedLayer.appendChild(acceptedPermissions);
    deniedLayer.appendChild(deniedBoard);
    deniedLayer.appendChild(deniedPermissions);
    layer.appendChild(background);
    resultsScene.appendChild(layer);
    resultsScene.appendChild(deniedLayer);
    resultsScene.appendChild(acceptedLayer);
    resultsScene.appendChild(appName);
    resultsScene.appendChild(app);




    lime.scheduleManager.callAfter(function(dt){

        if(!gameInstalled){
            alert("The app cannot be Installed because one of the required permissions was denied");
        }
        else{
            alert("The app can be Installed because all of the required permissions were allowed");

        }

        document.body.style.cursor = "auto";

        var target = new lime.Layer().setPosition(game.WIDTH * 0.90,game.HEIGHT * 0.90),

            circle = new lime.Circle().setSize(100,100).setFill('#4867D6'),
            lbl = new lime.Label().setSize(160,25).setFontSize(20).setText('Next App');


        //add circle and label to target object
        target.appendChild(circle);
        target.appendChild(lbl);

        //add target and title to the menuScene
        resultsScene.appendChild(target);


        //add menuScene interaction
        goog.events.listen(target,['mousedown','touchstart'],function(e){

            //animate
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(.81).setDuration(.2),
                new lime.animation.ScaleTo(1.5).setDuration(.81)

            ));

            //listen for end event
            e.swallow(['mouseup','touchend'],function(){
                target.runAction(new lime.animation.Sequence(
                    new lime.animation.FadeTo(0),
                    new lime.animation.ScaleTo(.03)
                ));


                lime.scheduleManager.callAfter(function(dt){

                    if(!(game.apps.app5.executed)){
                        game.showApp();

                    }
                    else{
                        game.popup(false);
                    }


                }, game.director, 1500);

            });


        });

    }, game.director, 2000);


    game.director.replaceScene(resultsScene);



};

game.Game = function(currentApp){

    var fixedSize = false;
    var highlightOptional = true;

    if(game.version == 0){
        fixedSize = true;
    }
    else if (game.version == 2){
        fixedSize = true;
        highlightOptional = false;
    }
    else if (game.version == 3){
        highlightOptional = false;
    }

    console.log("Version: " + game.version);
    console.log("Fixed: " + fixedSize);
    console.log("Highlight: " + highlightOptional);

    var largeBoxes = 0;
    var vendorChange = 0;
    var largeBoxesDenied = 0;
    var currentFace = 0;

    game.inGame = true;

    // creating game scene
    game.gameScene = new lime.Scene();
    var layer = new lime.Layer;
    layer.setPosition(0, 0);

    var boxLayer = new lime.Layer;
    boxLayer.setPosition(0, 0);


    var dLayer = new lime.Layer;
    dLayer.setPosition(0, 0);

    document.body.style.cursor = "crosshair";


    //Placing Background
    var background = new lime.Sprite().setPosition(game.WIDTH * 0.5,game.HEIGHT * 0.5)
        .setSize(game.WIDTH, game.HEIGHT).setFill('Sprites/game_bg.png').setRenderer(lime.Renderer.CANVAS);


    // placing the vendor in the truck
    var vendorLayer = new lime.Layer().setPosition(0,0);
    var vendorHead = new lime.Sprite().setPosition(game.WIDTH - 175, game.HEIGHT - 500).setSize(70, 75).setFill('Sprites/vendor_guy0.png').setRenderer(lime.Renderer.CANVAS);
    var app = new lime.Sprite().setPosition(game.WIDTH - 205, game.HEIGHT - 360).setFill(currentApp.img).setSize(50, 50);
    var thirdParty = new lime.Label().setFontSize(16).setText('App_Developer').setFontWeight('bold').setFontColor('#000000').setPosition(game.WIDTH - 175, game.HEIGHT - 390).setSize(50, 50);
    vendorLayer.appendChild(vendorHead);


    //Creating Deliveryman object
    var deliveryman = new lime.Sprite().setSize(180,180).setRenderer(lime.Renderer.CANVAS).setFill('Sprites/guy0.png').setPosition(game.WIDTH * 0.0,game.HEIGHT * 0.5);


    function updateFromBodyDeliveryMan(shape, deliveryMan){
        var pos = shape._body.GetPosition();
        deliveryMan.setPosition(pos.x - 210 , pos.y - 67);
    }

    //Creating Safe
    var safe = new lime.Sprite().setPosition(150, game.HEIGHT/3 - 15).setSize(168.5, 250).setFill('Sprites/vaultEmpty.png').setRenderer(lime.Renderer.CANVAS);
    safe.setOpacity(1);


    //Creating Truck
    var truck = new lime.Sprite().setPosition(game.WIDTH - 230, game.HEIGHT/3 + 32).setSize(425, 350).setFill('Sprites/truck2.png').setRenderer(lime.Renderer.CANVAS);
    truck.setOpacity(1);

    // Creating pause button
    var pauseButton = new lime.GlossyButton().setColor('#4867D6').setSize(100,40).setPosition(game.WIDTH / 2 - 30, 50).setText('Pause').setOpacity(.7);

    //Creating Security Guy object
    var sec_guy = new game.Player();

    //Creating label to show box info
    // placing the chalkboard for permission info
    var infoLayer = new lime.Layer().setPosition(game.WIDTH * 0.4,game.HEIGHT * 0.35);
    var chalkboard = new lime.Sprite().setSize(174, 180).setFill('Sprites/chalkBoard.png').setPosition(game.WIDTH * 0.4 - 2,game.HEIGHT * 0.35 + 20).setOpacity(0);
    game.infoLbl = new lime.Label().setSize(150, 100).setFontSize(20).setText('').setFontWeight('bold').setFontColor('#FFFFFF').setAlign('left');
    infoLayer.appendChild(game.infoLbl);


    // box2d (Gravity)
    game.perms = [];
    game.thePermissions = [];
    game.stopped = false;
    var bounds = new Box2D.Collision.b2AABB();
    bounds.lowerBound = new Box2D.Common.Math.b2Vec2(-game.WIDTH, -game.HEIGHT);
    bounds.upperBound = new Box2D.Common.Math.b2Vec2(2*game.WIDTH,2*game.HEIGHT);


    var gravity = new Box2D.Common.Math.b2Vec2(0, 100.00);
    var world = new Box2D.Dynamics.b2World(gravity, true);

    var calledEndGame = false;
    var inTruck = false;
    var cartMoving = false;
    var calledOnce = true;
    var totalWaitTime = 0;

    var defaultOptions = {
        'density' : 1.0,
        'friction' : 0.5 ,
        'restitution' : 0.5,
        'type' : Box2D.Dynamics.b2BodyDef.b2_dynamicBody
    };

    var timeStep;
    var gamePaused = false;

    // listening for the push of the pause button
    goog.events.listen(pauseButton, lime.Button.Event.CLICK, function() {
        if(cartMoving){
            if(gamePaused){
                pauseButton.setColor('#4867D6');
                gamePaused = false;
            }
            else{
                pauseButton.setColor('#48aed6');
                gamePaused = true;
            }
        }

    },false, this);

    // pausing the game function
    function pauseGame(dt){
        if(gamePaused){
            timeStep = 0;
            pauseButton.setText("Unpause");
        }
        else{
            timeStep = dt;
            pauseButton.setText("Pause");
        }
        return timeStep;
    }

    // creating box2d box
    function createBox(x, y, width, height, rotation, options){
        var box = new lime.Sprite().setFill(0,100,0).setSize(width, height);

        layer.appendChild(box);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( width/2 , height/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        box.perm = false;

        return box;
    }

    // creating permission box
    function createPermissionBox(x, y, width, rotation, options, perm){

        var file = "imgs/perms/" + perm.name + ".png" || "";

        var boxS;
        if(fixedSize){
            boxS = medBox * 25;
        }
        else{
            boxS = width;
        }

        //console.log("Box Size: " + boxS);

        var box = new lime.Sprite().setFill(file).setSize(boxS, boxS);

        if(!perm.required){
            perm.highlighted = true;
        }


        if(highlightOptional){
            perm.highlighted = true;
            var requiredBox = new lime.Sprite().setFill("imgs/perms/required.png").setSize(boxS+7,boxS+7);
            box.requiredBox = requiredBox;
        }
        else{
            perm.highlighted = false;
        }


        if(perm.accepted){
            vendorLayer.appendChild(box);
            if(!perm.required && perm.highlighted)
                vendorLayer.appendChild(requiredBox);

        }
        else{
            layer.appendChild(box);
            if(!perm.required && perm.highlighted)
                layer.appendChild(requiredBox);

        }

        perm.box = box;


        if(perm.accepted && !perm.inTruck){
            makePermissionInfo(perm);
            makePermissionClickable(perm, box);
        }


        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( boxS/2 , boxS/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);


        box._body = body;
        box._perm = perm;
        box.perm = true;

        game.perms.push(box)

        return box;
    }

    // show info
    function makePermissionInfo(perm){
        
        
        
       game.gameScene.listenOverOut(perm.box,function(e){ chalkboard.setOpacity(1); game.infoLbl.setText(perm.description); }, function(e){ 
                chalkboard.setOpacity(0);
                game.infoLbl.setText(''); });
    /*
        goog.events.listen(perm.box,['mouseover'],function(e){

            chalkboard.setOpacity(1);

            game.infoLbl.setText(perm.description);

            //console.log("e ");
            //console.log(e);


            e.swallow(['mouseout'], function(x){

                chalkboard.setOpacity(0);
                game.infoLbl.setText('');

                //console.log("x ");
                //console.log(x);

                goog.events.unlisten(perm.box, ['mouseover']);

            });


        });

    
   
        
        		goog.events.listen(this, ['mouseover'], function(e) { 
			chalkboard.setOpacity(1); //highlight
                        game.infoLbl.setText(this.description);
                    
			var key = goog.events.listen(this, ['mousemove'], function(e)
                        {
				//if (!this.hitTest(e))
				//{
					chalkboard.setOpacity(0);
                                        game.infoLbl.setText('');
					goog.events.unlistenByKey(key);
                                        //alert("ok");
				//}	

			},null,this);
			
		});
*/
    
        
        
        /*
        if(!perm.required && perm.highlighted){
            goog.events.listen(perm.box.requiredBox,['mouseover'],function(e){

                chalkboard.setOpacity(1);

                game.infoLbl.setText(perm.description);

                //console.log("e ");
                //console.log(e);


                e.swallow(['mouseout'], function(x){

                    chalkboard.setOpacity(0);
                    game.infoLbl.setText('');

                    //console.log("x ");
                    //console.log(x);

                    goog.events.unlisten(perm.box.requiredBox, ['mouseover']);

                });


            });
        }
        */
    }

    // making the permissions show info
    function makePermissionClickable(perm, box){
        if(!game.stopped && !gamePaused)
        {
            goog.events.listen(perm.box,['mousedown','touchstart'],function(e){

                if(!gamePaused){
                    e.swallow(['mouseup','touchend','touchcancel'],function(){

                        // changing the vendors face
                        if(perm.size == largeBox){

                            largeBoxesDenied++;

                            vendorChange = largeBoxesDenied / largeBoxes;


                            for(var i = 0; i < 7; i++){

                                if(vendorChange > (i * (1/5))){
                                    if(i > currentFace && currentFace != 4){
                                        currentFace++;
                                        vendorHead.setFill('Sprites/vendor_guy' + currentFace + '.png');
                                    }
                                }
                                else{
                                    break;
                                }
                            }

                        }

                        // removing permission info
                        chalkboard.setOpacity(0);
                        game.infoLbl.setText('');



                        this.setHidden(true);

                        if(!perm.required && perm.highlighted){
                            box.requiredBox.setHidden(true);
                        }

                        world.DestroyBody(this._body);


                        var number = game.perms.indexOf(perm.box);
                        var temp = game.perms[number];
                        game.perms[number] = game.perms[game.perms.length - 1];
                        game.perms[game.perms.length - 1] = temp;
                        game.perms.pop();

                        var posy = game.HEIGHT/6 - 50;
                        if (game.deniedPosition == 0)
                        {
                            var posx = 106;
                            game.deniedPosition = 1;
                        }
                        else if(game.deniedPosition == 1)
                        {
                            var posx = 157;
                            game.deniedPosition = 2;
                        }
                        else if(game.deniedPosition == 2)
                        {
                            var posx = 205;
                            game.deniedPosition = 0;
                        }

                        game.posx = posx;
                        game.posy = posy;

                        perm.accepted = false;

                        var deniedBox= createPermissionBox(posx, posy, 25 * perm.size, 0, defaultOptions, perm);

                        //game.perms.push(deniedBox);

                    });
                }


            });
        }

    }

    // creating the floor of the world
    function createFloor(x, y, width, height, rotation){
        var floorOptions = {
            'density' : 1.0 ,
            'friction' : 0.5 ,
            'restitution' : 0.2,
            'type' : Box2D.Dynamics.b2BodyDef.b2_staticBody
        };
        return createBox(x, y, width, height, rotation, floorOptions);
    }

    // creating the cart base
    function createCarBase(x, y, width, height, length, handle, rotation, options){
        var box = new lime.Polygon().setPoints(0,0, 0, height/2, width/2, height/2, width/2, -length - height/2, width/2 - height ,-length - height/2, width/2 - height, -height/2, -width/2+height , -height/2, -width/2+height, -length- height/2, -width/2-handle, -length- height/2,-width/2-handle, -length+ height/2, -width/2, -length+ height/2, -width/2, height/2, 0, height/2).
            setPosition(100,100).setFill(0, 51, 102);//(94,94,94);

        layer.appendChild(box);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( width/2 , height/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    // creating the rest of the cart
    function createCar(x, y, width, height, radius){
        var overAllCar = {bodyParts:[]};

        var length = width/2;
        var handle = 2*height;
        //var carBox = createBox(x, y, width, height, 0, defaultOptions); //x, y, width, height, rotation, options
        var carBox = createCarBase(x, y, width, height, length, handle, 0, defaultOptions);
        overAllCar.bodyParts.push(carBox);
        overAllCar.carBox = carBox;

        var offset = 0;
        //Left Wheel
        var cx = x - (width/2) + offset*width, cy = y + height/2;
        var leftWheelCircle = createWheel(cx, cy, radius, defaultOptions);
        leftWheelCircle.perm = false;
        overAllCar.bodyParts.push(leftWheelCircle);

        //Right Wheel
        cx = x + (width/2) - offset*width, cy = y + height/2;
        var rightWheelCircle = createWheel(cx, cy, radius, defaultOptions);
        rightWheelCircle.perm = false;
        overAllCar.bodyParts.push(rightWheelCircle);

        //create revolute joint between Left Wheel and Car Lower Body
        var joint_def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        joint_def.bodyA = leftWheelCircle._body;
        joint_def.bodyB = carBox._body;

        //connect the centers - center in local coordinate - relative to body is 0,0
        joint_def.localAnchorA = new Box2D.Common.Math.b2Vec2(0, 0);
        joint_def.localAnchorB = new Box2D.Common.Math.b2Vec2(- ((width/2) - offset*width),  height/2);

        joint_def.maxMotorTorque = 500100.0;
        joint_def.motorSpeed = 0;
        joint_def.enableMotor = true;

        var leftJoint = world.CreateJoint(joint_def);
        overAllCar.leftJoint = leftJoint;

        //create revolute joint between Right Wheel and Car Lower Body
        var joint_def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        joint_def.bodyA = rightWheelCircle._body;
        joint_def.bodyB = carBox._body;

        //connect the centers - center in local coordinate - relative to body is 0,0
        joint_def.localAnchorA = new Box2D.Common.Math.b2Vec2(0, 0);
        joint_def.localAnchorB = new Box2D.Common.Math.b2Vec2(((width/2) - offset*width),  height/2);
        joint_def.maxMotorTorque = 500100.0;
        joint_def.motorSpeed = 0;
        joint_def.enableMotor = true;
        var rightJoint = world.CreateJoint(joint_def);
        overAllCar.rightJoint = rightJoint;


        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.density = defaultOptions.density;
        fixtureDef.friction = defaultOptions.friction;
        fixtureDef.restitution = defaultOptions.restitution;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(-width/2,-length-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2+height,-length-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2+height,-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2,-height/2)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);


        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(width/2-height,-length-height/2),
            new Box2D.Common.Math.b2Vec2(width/2,-length-height/2),
            new Box2D.Common.Math.b2Vec2(width/2,-height/2),
            new Box2D.Common.Math.b2Vec2(width/2-height,-height/2)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);


        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(-width/2 - handle, -height/2-length),
            new Box2D.Common.Math.b2Vec2(-width/2, -height/2-length),
            new Box2D.Common.Math.b2Vec2(-width/2, -length),
            new Box2D.Common.Math.b2Vec2(-width/2 - handle, -length)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);
        return overAllCar;
    }

    // creating the wheels for the cart
    function createWheel(x, y, radius, options){
        var circle = (new lime.Circle)
            .setFill("imgs/wheel.png")
            .setSize(radius*2, radius*2);

        layer.appendChild(circle);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        var shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
        fix_def.shape = shape;

        body_def.position.Set(x , y);
        body_def.linearDamping = 0.5;
        body_def.angularDamping = 0.5;

        body_def.type = options.type;

        var body = world.CreateBody( body_def );
        body.CreateFixture(fix_def);

        circle._body = body; // just a reference, no API logic
        return circle;
    }

    // creating the permissions
    function createPermissions(){
        game.count = 0;

        for (var key in currentApp.permissions) {
            game.count++;
            if(currentApp.permissions[key].size == largeBox)
                largeBoxes++;
        }

       

        game.count -= 1;

        var i = 0;
        for (var key in currentApp.permissions) {
            dropInCart(currentApp.permissions[key], i, false, i);
            game.thePermissions.push(currentApp.permissions[key]);
            i++;

        }

    }


    // updating the box2d objects
    function updateFromBody(shape){
        var pos = shape._body.GetPosition();
        var rot = shape._body.GetAngle();
        shape.setRotation(-rot / Math.PI * 180);
        shape.setPosition(pos.x, pos.y);

        if(shape.perm){

            //console.log("Inside shape.perm");

            if(!shape._perm.required && shape._perm.highlighted){

                if(shape.notCalled){
                    console.log("Inside shape._perm.required");
                    console.log(shape._perm);
                    shape.notCalled = false;
                }

                shape.requiredBox.setRotation(-rot / Math.PI * 180);
                shape.requiredBox.setPosition(pos.x, pos.y);
            }
        }
    }

    // starts the cart moving
    function moveCart(){
        game.car.speedDown();
        //console.log("started");
        world.DestroyBody(rightCart._body);
        world.DestroyBody(leftCart._body);

        moveDeliveryGuy();

        pauseButton.setOpacity(1);
        cartMoving = true;

    }

    // Moving the Delivery Guy
    function moveDeliveryGuy(){
        if (game.animationCounter == 10){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 20){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 30){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 40){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 50){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 60){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }

        /*
        else if (game.animationCounter == 70){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        else if (game.animationCounter == 80){
            deliveryman.setFill('Sprites/guy' + game.animationCounter + '.png');
            game.animationCounter++;
        }
        */

        else  if(game.animationCounter > 60){
            game.animationCounter = 1;
        }

        else{
            game.animationCounter++;
        }
    }

    // Dropping boxes in cart
    function dropInCart (perm, wait, endOfGame, count){
        if(endOfGame){
            var waitTime = 5 * 220 * wait;
        }
        else{
            var waitTime = 5 * 220 * wait;

        }

        if(perm.accepted){
            totalWaitTime = waitTime;
        }

        lime.scheduleManager.callAfter(function(dt){
            if(endOfGame){

                if(perm.accepted){

                    perm.box.setHidden(true);
                    world.DestroyBody(perm.box._body);

                    var number = game.perms.indexOf(perm.box);
                    var temp = game.perms[number]
                    game.perms[number] = game.perms[game.perms.length - 1];
                    game.perms[game.perms.length - 1] = temp;
                    game.perms.pop();


                    var posy = 90;

                    if (game.deniedPosition == 0)
                    {
                        var posx = 705;
                        game.deniedPosition = 1;
                    }
                    else if(game.deniedPosition == 1)
                    {
                        var posx = 655;
                        game.deniedPosition = 2;
                    }
                    else if(game.deniedPosition == 2)
                    {
                        var posx = 610;
                        game.deniedPosition = 0;
                    }

                    game.posx = posx;
                    game.posy = posy;

                    if(!perm.required && perm.highlighted){
                        perm.box.requiredBox.setHidden(true);
                    }
                    
                    var acceptedBox = createPermissionBox(posx, posy, 25 * perm.size, 0, defaultOptions, perm);
                    game.perms.push(acceptedBox);
                }

                if(count == game.count && !inTruck){
                    inTruck = true;


                    lime.scheduleManager.callAfter(function(dt){
                        moveTruck();

                        lime.scheduleManager.callAfter(function(dt){
                            currentApp.executed = true;
                            game.gameResults(currentApp);
                        }, game.director, 9000);

                    }, game.director, totalWaitTime);



                }

            }
            else{

                var posx = goog.math.uniformRandom(138, 280);


                var b1= createPermissionBox(posx, 370, 25 * perm.size, 0, defaultOptions, perm);

                if(count == game.count){
                    moveCart();

                }

            }

        }, game.director, waitTime);
    }

    // End of the game function
    function endGame(){

        game.car.stop();

        // preventing the cart to move after it reaches the end of the screen
        var stopCart = createFloor(745, game.HEIGHT/2 + 50, 5, game.HEIGHT/7, 0).setFill('#000000').setOpacity(0);
        updateFromBody(stopCart);

        cartMoving = false;
        pauseButton.setOpacity(.7);
        //console.log("stoped");
        game.stopped = true;

        deliveryman.setFill('Sprites/guy0.png');

        var i = 0;
        var count = 0;

        // putting permission boxes in truck
        for(var key in currentApp.permissions){
            var perm = currentApp.permissions[key];

            perm.inTruck = true;

            if(perm.accepted){
                dropInCart(perm, i, true, count);
                i++;
            }
            else{
                dropInCart(perm, 0, true, count);
            }
            count++;


        }

    }

    // Moving truck function
    function moveTruck(){
        lime.scheduleManager.callAfter(function(dt){

            console.log("moving truck");
            game.gameScene.removeChild(safe);
            safe.setFill('Sprites/vault.png');
            game.gameScene.appendChild(safe);

            vendorLayer.appendChild(truck);
            vendorLayer.appendChild(app);
            vendorLayer.appendChild(thirdParty);

            var pos = truck.getPosition();
            vendorLayer.runAction(new lime.animation.MoveTo(game.WIDTH + 100, pos.y - 230).setSpeed(1).setEasing(lime.animation.Easing.LINEAR));

        }, game.director, 4000);
    }

    var groundBox = createFloor(game.WIDTH/2, game.HEIGHT * 0.77, game.WIDTH, 10, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var leftGround = createFloor(0,game.HEIGHT/2, 10, game.HEIGHT, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var rightGround = createFloor(game.WIDTH,game.HEIGHT/2, 10, game.HEIGHT, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)

    var groundDenied = createFloor(160, game.HEIGHT/2 -18, 200, 1, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var leftDenied = createFloor(80, game.HEIGHT/4 + 35, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var middleOneDenied = createFloor(130, game.HEIGHT/4 + 35, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var middleTwoDenied = createFloor(178, game.HEIGHT/4 + 35, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var rightDenied = createFloor(226, game.HEIGHT/4 + 35, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)

    var leftCart = createFloor(120, game.HEIGHT/2 + 50, 1, game.HEIGHT/7, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var rightCart = createFloor(330, game.HEIGHT/2 - 30, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)

    var groundAccepted = createFloor(game.WIDTH/2 + 150, game.HEIGHT/3 + 65, 150, 1, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var leftAccepted = createFloor(game.WIDTH/2 + 80, game.HEIGHT * 0.5 - 135, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var rightAccepted = createFloor(game.WIDTH/2 + 225, game.HEIGHT * 0.5 - 135, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var middleOneAccepted = createFloor(game.WIDTH/2 + 130, game.HEIGHT * 0.5 - 135, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)
    var middleTwoAccepted = createFloor(game.WIDTH/2 + 175, game.HEIGHT * 0.5 - 135, 1, game.HEIGHT/3, 0).setFill('#000000').setOpacity(0); //(x, y, width, height, rotation)

    game.car = createCar(215, game.HEIGHT*0.73 - 5, 215, 10, 12); //x, y, width, height, radius

    game.car.bodyParts.forEach(function(element, index, array){
        updateFromBody(element);
    });

    game.rightWheel = game.car.bodyParts[2].getPosition();

    game.perms.forEach(function(element, index, array){
        updateFromBody(element);
    });

    game.car.SPEED_LOW = -2;
    game.car.SPEED_HIGH = -4;

    game.car.speedUp = function(){
        game.car.leftJoint.SetMotorSpeed(game.car.SPEED_HIGH);
        game.car.rightJoint.SetMotorSpeed(game.car.SPEED_HIGH);
    }

    game.car.speedDown = function(){
        game.car.leftJoint.SetMotorSpeed(game.car.SPEED_LOW);
        game.car.rightJoint.SetMotorSpeed(game.car.SPEED_LOW);
    }

    game.car.stop = function(){
        game.car.leftJoint.SetMotorSpeed(0);
        game.car.rightJoint.SetMotorSpeed(0);
        game.car.leftJoint.EnableMotor(false);
        game.car.rightJoint.EnableMotor(false);
        game.car.leftJoint.SetMaxMotorTorque(-10);
        game.car.rightJoint.SetMaxMotorTorque(-10);
    }


    // functions being called
    createPermissions();

    // Updating Body
    updateFromBody(groundBox);
    updateFromBody(leftGround);
    updateFromBody(rightGround);
    updateFromBody(groundDenied);
    updateFromBody(leftDenied);
    updateFromBody(rightDenied);
    updateFromBody(middleOneDenied);
    updateFromBody(middleTwoDenied);

    updateFromBody(groundAccepted);
    updateFromBody(leftAccepted);
    updateFromBody(rightAccepted);
    updateFromBody(middleOneAccepted);
    updateFromBody(middleTwoAccepted);


    updateFromBody(rightCart);
    updateFromBody(leftCart);

    updateFromBodyDeliveryMan(game.car.bodyParts[0], deliveryman);

    lime.scheduleManager.schedule(function(dt) {

        // getting dt if the game is paused
        dt = pauseGame(dt);

        if(dt>100)
            dt=100; // long delays(after pause) cause false collisions

        world.Step(dt / 1000, 8, 3);
        world.ClearForces();

        if(game.rightWheel.x > 975 && !calledEndGame){
            endGame();
            calledEndGame = true;

            game.perms.forEach(function(element, index, array){
                updateFromBody(element);
            });

        }

        else if(inTruck && calledOnce){
            console.log("Moving Truck");
            calledOnce = false;

        }
        else if(game.inGame){

            game.car.bodyParts.forEach(function(element, index, array){
                updateFromBody(element);
            });


            game.perms.forEach(function(element, index, array){
                updateFromBody(element);
            });

            updateFromBodyDeliveryMan(game.car.bodyParts[0], deliveryman);

            game.rightWheel = game.car.bodyParts[2].getPosition();

            // animating the delivery guy
            if(cartMoving && !gamePaused){
                moveDeliveryGuy();
            }
        }

    },this);


    //Adding all layers and sprites to scene
    game.gameScene.appendChild(background);
    game.gameScene.appendChild(safe);
    game.gameScene.appendChild(truck);
    game.gameScene.appendChild(thirdParty);
    game.gameScene.appendChild(app);
    game.gameScene.appendChild(layer);
    game.gameScene.appendChild(vendorLayer);
    game.gameScene.appendChild(deliveryman);
    game.gameScene.appendChild(chalkboard);
    game.gameScene.appendChild(infoLayer);
    game.gameScene.appendChild(sec_guy);
    game.gameScene.appendChild(pauseButton);


    game.director.replaceScene(game.gameScene, lime.transitions.Dissolve);

}

// player.js code
game.Player = function(){

    var sec_guy = new lime.Sprite().setPosition(game.WIDTH *.5,game.HEIGHT * 0.97).setSize(144, 274).setFill('Sprites/sec_guy.png').setRenderer(lime.Renderer.CANVAS);

    if(game.inGame)
    {
        goog.events.listen(game.gameScene,'mousemove',function(e){

            var pos = sec_guy.getPosition();
            sec_guy.runAction(new lime.animation.MoveTo(e.position.x, pos.y).setSpeed(1).setEasing(lime.animation.Easing.LINEAR));
        });

    }
    return sec_guy;
};

// Dialog function
$(document).ready(function () {

    // if user clicked on button, the overlay layer or the dialogbox, close the dialog
    //$('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
    $('a.btn-ok, #button').click(function () {
        game.userId = document.userInput.userName.value;
       /*
        $.post("send.php",
        {
         UserID: game.userId,
         AppID:"1",
         PermissionName: "user_email",
         PermissionType: "Required",
	 PermissionSize: "1",
         Decision: "Allowed"
        },
        function(data,status){
        //alert("Data: " + data + "\nStatus: " + status);
         console.log(data);
        });
  */
        if(!game.userId == ""){
            $('#dialog-overlay, #dialog-box').hide();
            game.menu();
        }


        return false;
    });

    // if user resize the window, call the same function again
    // to make sure the overlay fills the screen and dialogbox aligned to center
    $(window).resize(function () {

        //only do it if the dialog box is not hidden
        if (!$('#dialog-box').is(':hidden')) popup();
    });


});

// entrypoint
game.popup = function(beginning) {

    if(beginning){
        game.user = 0;
    }
    else{
        game.user++;
    }
    
    // Determining the version in which the user will get
    game.version = goog.math.randomInt(4);
    console.log("number: " + game.version);

    game.director = new lime.Director(document.body, game.WIDTH, game.HEIGHT);

    game.director.setDisplayFPS(false);

    var splashScene = game.createSplashScreen();

    // get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();


    // set current scene active
    game.director.makeMobileWebAppCapable();
    game.director.replaceScene(splashScene);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('game.start', game.menu);