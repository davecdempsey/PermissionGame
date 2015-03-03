/**
 * Created with JetBrains PhpStorm.
 * User: daviddempsey
 * Date: 2/6/13
 * Time: 4:47 PM
 * To change this template use File | Settings | File Templates.
 */

//set main namespace
goog.provide('fb_game');



//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.SpriteSheet');
goog.require('lime.Sprite');
goog.require('lime.transitions.Dissolve');



goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('box2d.BodyDef');
goog.require('box2d.BoxDef');
goog.require('box2d.CircleDef');
goog.require('box2d.CircleShape');
goog.require('box2d.PolyDef');
goog.require('box2d.Vec2');
goog.require('box2d.JointDef');
goog.require('box2d.MouseJointDef');
goog.require('box2d.World');



fb_game.size = {
    WIDTH: 1004,
    HEIGHT: 720
};

fb_game.ballSize = {
    S_RADIUS: 12,
    M_RADIUS: 18,
    L_RADIUS: 22

}


fb_game.createSplashScreen = function(){

    fb_game.started = false;
    fb_game.inGame = false;
    document.body.style.cursor = "wait";
    var menuScene = new lime.Scene(),

        layer = new lime.Layer().setPosition(fb_game.size.WIDTH * 0.5, fb_game.size.HEIGHT * 0.5),

        background = new lime.Sprite().setSize(fb_game.size.WIDTH,fb_game.size.HEIGHT).setFill('Sprites/bg.png');

    layer.appendChild(background);
    menuScene.appendChild(layer);

    return menuScene;

};


fb_game.menu = function(){

    fb_game.director = new lime.Director(document.body, fb_game.size.WIDTH, fb_game.size.HEIGHT);

    //fb_game.director.setDisplayFPS(false);

    var splashScene = fb_game.createSplashScreen();


    lime.scheduleManager.callAfter(function(dt){

        document.body.style.cursor = "auto";

        var target = new lime.Layer().setPosition(fb_game.size.WIDTH * 0.7,fb_game.size.HEIGHT * 0.9),

            circle = new lime.Circle().setSize(150,150).setFill('#080E73'),
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
                new lime.animation.FadeTo(.8).setDuration(.2),
                new lime.animation.ScaleTo(1.5).setDuration(.8)

            ));

            //listen for end event
            e.swallow(['mouseup','touchend'],function(){
                target.runAction(new lime.animation.Sequence(
                    new lime.animation.FadeTo(0),
                    new lime.animation.ScaleTo(.03)
                ));


                lime.scheduleManager.callAfter(function(dt){

                    fb_game.newGame();

                }, fb_game.director, 1500);

            });


        });

    }, fb_game.director, 2000);


    // set current scene active
    fb_game.director.makeMobileWebAppCapable();
    fb_game.director.replaceScene(splashScene);

};

fb_game.newGame = function(){

    var gameScene = fb_game.Game();

    fb_game.director.replaceScene(gameScene, lime.transitions.Dissolve);
};


// game.js code


fb_game.Game = function(){

    fb_game.inGame = true;

    fb_game.gameScene = new lime.Scene();

    document.body.style.cursor = "crosshair";

    //Placing Background
    fb_game.background = new lime.Sprite().setPosition(fb_game.size.WIDTH * 0.5,fb_game.size.HEIGHT * 0.5)
        .setSize(fb_game.size.WIDTH, fb_game.size.HEIGHT).setFill('Sprites/game_bg.png').setRenderer(lime.Renderer.CANVAS);


    //Placing Vendor/Vendor Booth
     fb_game.vendorBooth = new lime.Sprite().setAnchorPoint(0.5,0.10).setPosition(fb_game.size.WIDTH *.775,fb_game.size.HEIGHT * 0.115)
        .setSize(260, 290).setFill('Sprites/vendor_booth.png').setRenderer(lime.Renderer.CANVAS);

    fb_game.vendorLayer = new lime.Layer().setPosition(fb_game.size.WIDTH *.785,fb_game.size.HEIGHT * 0.277);
    fb_game.vendorHead = new lime.Sprite().setAnchorPoint(0.5,0.9).setSize(70, 75).setFill('Sprites/vendor_guy.png').setRenderer(lime.Renderer.CANVAS);

    fb_game.vendorLayer.appendChild(this.vendorHead);


    //Creating Deliveryman object
    fb_game.deliverymanLayer = fb_game.Deliveryman();

    //Creating Security Guy object
    fb_game.sec_guy = new fb_game.Player();

    //  box2d

    //setup physics world
    fb_game.setupPhysics();

    //Creating Cart object
    fb_game.cartLayer = fb_game.Cart();

    //Creating Permission objects
    fb_game.permissionLayer = fb_game.PermissionBalls();

    //Adding all layers and spirtes to scene
    fb_game.gameScene.appendChild(fb_game.background);
    fb_game.gameScene.appendChild(fb_game.vendorLayer);
    fb_game.gameScene.appendChild(fb_game.vendorBooth);
    fb_game.gameScene.appendChild(fb_game.deliverymanLayer);
    fb_game.gameScene.appendChild(fb_game.cartLayer);
    fb_game.gameScene.appendChild(fb_game.sec_guy);
    fb_game.gameScene.appendChild(fb_game.permissionLayer);
    //fb_game.gameScene.appendChild(fb_game.ground);


    return fb_game.gameScene;

};

fb_game.setupPhysics = function(){

    var gravity = new box2d.Vec2(0, 200);
    var bounds = new box2d.AABB();
    bounds.minVertex.Set(-fb_game.size.WIDTH, -fb_game.size.HEIGHT);
    bounds.maxVertex.Set(2*fb_game.size.WIDTH,2*fb_game.size.HEIGHT);
    fb_game.world = new box2d.World(bounds, gravity, false);


};

fb_game.cartDeliveryFunction = function(){
    if(fb_game.inGame){
        fb_game.deliverymanLayer.runAction(new lime.animation.MoveTo(fb_game.size.WIDTH * 0.58, fb_game.size.HEIGHT * 0.5).setSpeed(3).setEasing(lime.animation.Easing.LINEAR));
        fb_game.cartLayer.runAction(new lime.animation.MoveTo(fb_game.size.WIDTH * 0.8, fb_game.size.HEIGHT * 0.57 - 45).setSpeed(3).setEasing(lime.animation.Easing.LINEAR));

    }
};


// player.js code
fb_game.Player = function(){

    var sec_guy = new lime.Sprite().setPosition(fb_game.size.WIDTH *.5,fb_game.size.HEIGHT * 0.9).setSize(144, 274).setFill('Sprites/sec_guy.png').setRenderer(lime.Renderer.CANVAS);

    if(fb_game.inGame)
    {
        goog.events.listen(fb_game.gameScene,'mousemove',function(e){

            var pos = fb_game.sec_guy.getPosition();
            fb_game.sec_guy.runAction(new lime.animation.MoveTo(e.position.x, pos.y).setSpeed(1).setEasing(lime.animation.Easing.LINEAR));
        });

        goog.events.listen(fb_game.gameScene,['mouseup','touchend'],function(e){

            var debrisLayer = new lime.Layer().setOpacity(0).setPosition(fb_game.sec_guy.getPosition()).setAnchorPoint(.5,.5),
                debrisSprite = new lime.Sprite().setSize(45,45).setAnchorPoint(.5,.5).setRenderer(lime.Renderer.CANVAS);

            var randomNum = Math.floor((Math.random()*4)+1);

            switch(randomNum){
                case 1:
                    debrisSprite.setFill('Sprites/apple.png');
                    break;
                case 2:
                    debrisSprite.setFill('Sprites/banana.png');
                    break;
                case 3:
                    debrisSprite.setFill('Sprites/banana.png');
                    break;
                case 4:
                    debrisSprite.setFill('Sprites/apple.png');
                    break;
            }

            debrisLayer.appendChild(debrisSprite);
            fb_game.gameScene.removeChild(fb_game.sec_guy);
            fb_game.gameScene.appendChild(debrisLayer);
            fb_game.gameScene.appendChild(fb_game.sec_guy);
            debrisLayer.runAction(fb_game.thrwDbrs(e, debrisLayer, debrisSprite));

        });
    }
    return sec_guy;
};



fb_game.thrwDbrs = function(e, debrisLayer, debrisSprite){
    this.throwDebris = new lime.animation.Spawn(
        new lime.animation.FadeTo(1).setDuration(.2),
        new lime.animation.ScaleTo(.8).setDuration(.8),
        new lime.animation.RotateTo(360),
        new lime.animation.MoveTo(e.position).setEasing(lime.animation.Easing.LINEAR));


    this.throwDebris.addEventListener(lime.animation.Event.STOP, function(e){

        fb_game.checkPermissionCollisions(debrisLayer, debrisSprite);
        fb_game.gameScene.removeChild(debrisLayer);
    });


    return this.throwDebris;
};



// deliveryman.js code


fb_game.Deliveryman = function(){

    //creating deliveryman himself
    this.deliverymanLayer = new lime.Layer().setPosition(fb_game.size.WIDTH * 0.0,fb_game.size.HEIGHT * 0.5);
    this.deliverymanSprite = new lime.Sprite().setSize(180,180).setRenderer(lime.Renderer.CANVAS).setFill('Sprites/fb_guy.png');

    this.deliverymanLayer.appendChild(this.deliverymanSprite);

    return this.deliverymanLayer;
};



// cart.js code

fb_game.Cart = function(){

    //creating the cart object
    fb_game.cartLayer = new lime.Layer();
    fb_game.cartBottomSize = 220;
    fb_game.cartBottomStartX = fb_game.size.WIDTH *0.22 + 30;
    fb_game.cartBottomStartY = fb_game.size.HEIGHT * 0.57;

    var cartBottom = new fb_game.createBox(fb_game.cartBottomStartX,fb_game.cartBottomStartY,fb_game.cartBottomSize,10,0,0); // (x, y, width, height, rotation, density)

    var cartLeftSide = new fb_game.createBox(fb_game.size.WIDTH *0.22 - 95,fb_game.size.HEIGHT * 0.57 - 70,150,10,-75,0);

    var cartRightSide = new fb_game.createBox(fb_game.size.WIDTH *0.22 + 155,fb_game.size.HEIGHT * 0.57 - 70,150,10,75,0);

    // Joints to keep the cart together
    //var leftJointDef = new box2d.JointDef();
    //var posX = cartBottom.getPosition().x - (cartBottom.width / 2);
    //var posY = cartBottom.getPosition().y;
    //leftJointDef.body1 = cartLeftSide;
    //leftJointDef.body2 = cartBottom;
    //leftJointDef.target.Set(posX, posY);
    //leftJointDef.maxForce = 0;


    //var leftJoint = fb_game.world.CreateJoint(leftJointDef);

    //var rightJoint = new box2d.JointDef();



    var ground = new fb_game.createBox(fb_game.size.WIDTH *0.5,fb_game.size.HEIGHT * 0.65,fb_game.size.WIDTH,10,0,0);

    fb_game.cartLayer.appendChild(cartBottom);
    fb_game.cartLayer.appendChild(cartLeftSide);
    fb_game.cartLayer.appendChild(cartRightSide);
    fb_game.cartLayer.appendChild(ground);

    lime.scheduleManager.schedule(function(dt) {
        if(dt>100) dt=100; // long delays(after pause) cause false collisions
        fb_game.world.Step(dt / 1000, 3);

        fb_game.updateFromBody(cartBottom);
        fb_game.updateFromBody(cartLeftSide);
        fb_game.updateFromBody(cartRightSide);
        fb_game.updateFromBody(ground);


    },this);



    return fb_game.cartLayer;
};


fb_game.createBox = function(x, y, width, height, rotation, density){
    var box = (new lime.Sprite).setFill('#330000').setSize(width, height);
    box.setPosition(x,y).setRotation(rotation);

    var bodyDef = new box2d.BodyDef;
    bodyDef.position.Set(x, y);
    bodyDef.rotation = -rotation / 180 * Math.PI;

    var shapeDef = new box2d.BoxDef;
    shapeDef.restitution = 0.5;
    shapeDef.density = density; //static
    shapeDef.friction = 0.5;
    shapeDef.extents.Set(width / 2, height / 2);

    bodyDef.AddShape(shapeDef);

    var body = fb_game.world.CreateBody(bodyDef);
    box._body = body; // just a reference
    return box;
};


// permissionObjects.js code
fb_game.PermissionBalls = function(){
    fb_game.ballLayer = new lime.Layer();
    fb_game.startingPoint = fb_game.cartBottomStartY - 280;

    var nameBall = new fb_game.permissionObject(0, true, fb_game.getRandom(), fb_game.startingPoint), //(securityId, basic, x, y)
        genderBall = new fb_game.permissionObject(2, true, fb_game.getRandom(), fb_game.startingPoint),
        profilePicture = new fb_game.permissionObject(1, true, fb_game.getRandom(), fb_game.startingPoint),
        network = new fb_game.permissionObject(28, true, fb_game.getRandom(), fb_game.startingPoint),
        friends = new fb_game.permissionObject(29, true, fb_game.getRandom(), fb_game.startingPoint),
        userIDBall = new fb_game.permissionObject(3, true, fb_game.getRandom(), fb_game.startingPoint),
        emailBall = new fb_game.permissionObject(4, true, fb_game.getRandom(), fb_game.startingPoint),
        birthdayBall = new fb_game.permissionObject(23, true, fb_game.getRandom(), fb_game.startingPoint),
        likesBall = new fb_game.permissionObject(5, true, fb_game.getRandom(), fb_game.startingPoint),
        location = new fb_game.permissionObject(6, true, fb_game.getRandom(), fb_game.startingPoint),
        relationship = new fb_game.permissionObject(7,true, fb_game.getRandom(), fb_game.startingPoint),
        checkins = new fb_game.permissionObject(8, true, fb_game.getRandom(), fb_game.startingPoint),
        events = new fb_game.permissionObject(9, true, fb_game.getRandom(), fb_game.startingPoint),
        photosBall = new fb_game.permissionObject(10, true, fb_game.getRandom(), fb_game.startingPoint),
        statusupdates = new fb_game.permissionObject(11, true, fb_game.getRandom(), fb_game.startingPoint),
        friendsBDayBall = new fb_game.permissionObject(12,true, fb_game.getRandom(), fb_game.startingPoint),
        friendsLikesBall = new fb_game.permissionObject(13, true, fb_game.getRandom(), fb_game.startingPoint),
        friendsLocations = new fb_game.permissionObject(14, true, fb_game.getRandom(), fb_game.startingPoint),
        friendsWork = new fb_game.permissionObject(15, true, fb_game.getRandom(), fb_game.startingPoint),
        storiesSharedCheckins = new fb_game.permissionObject(16, true, fb_game.getRandom(), fb_game.startingPoint),
        storiesSharedEvents = new fb_game.permissionObject(17, true, fb_game.getRandom(), fb_game.startingPoint),
        storiesSharedPhotos = new fb_game.permissionObject(18, true, fb_game.getRandom(), fb_game.startingPoint),
        storiesSharedStatusUpdates = new fb_game.permissionObject(19, true, fb_game.getRandom(), fb_game.startingPoint),

        postBall = new fb_game.permissionObject(20, false, fb_game.getRandom(), fb_game.startingPoint),
        accessPosts = new fb_game.permissionObject(21, false, fb_game.getRandom(), fb_game.startingPoint),
        accessCustomFriendsList = new fb_game.permissionObject(22, false, fb_game.getRandom(), fb_game.startingPoint);



    fb_game.firstFall = true;

    var i = 0;

    fb_game.startCart = false;

    while(i < fb_game.ballLayer.getNumberOfChildren()){
        new fb_game.droppingInCart(fb_game.ballLayer.getChildAt(i++));

    }

    return fb_game.ballLayer;

};


fb_game.getRandom = function(){
    var randomNumber = goog.math.randomInt(fb_game.cartBottomSize - fb_game.ballSize.L_RADIUS) + fb_game.cartBottomStartX - (fb_game.cartBottomSize / 2) + fb_game.ballSize.L_RADIUS;

    return randomNumber;
};



fb_game.droppingInCart = function(child)
{
    var duration = (fb_game.ballLayer.getChildIndex(child) + 1);

    var show = new lime.animation.FadeTo(1).setDuration(2);

    if(!(child == null)){

        lime.scheduleManager.callAfter(function(dt){
            child.runAction(show);
        }, fb_game.director, (duration * 2 * 300));

        goog.events.listen(show, lime.animation.Event.STOP, function() {


            new fb_game.addBox2D(child);

            if(fb_game.firstFall){
                lime.scheduleManager.schedule(function(dt){
                    if(dt>100) dt=100; // long delays(after pause) cause false collisions
                    fb_game.world.Step(dt / 1000, 3);


                    for(var i = 0; i < (fb_game.world.m_bodyCount - 5); i++)
                    {
                        fb_game.updateFromBody(fb_game.ballLayer.getChildAt(i));

                    }
                },this);
                fb_game.firstFall = false;
            }


        });


    }

};




fb_game.permissionObject = function (securityId, basic, x, y)
{
    this.basic = basic;
    this.accepted = true;

    switch(securityId){
        // basic info (name)
        case 0:
            this.size = 1;
            this.icon = 'name.png';
            break;
        // basic info (profile picture)
        case 1:
            this.size = 1;
            this.icon = 'profilePic.png';
            break;
        // basic info (gender)
        case 2:
            this.size = 1;
            this.icon = 'gender.png';
            break;
        // basic info (UserID)
        case 3:
            this.size = 1;
            this.icon = 'userId.png';
            break;
        // Email address
        case 4:
            this.size = 2;
            this.icon = 'email.png';
            break;
        // Likes
        case 5:
            this.size = 2;
            this.icon = 'likes.png';
            break;
        // Location
        case 6:
            this.size = 2;
            this.icon = 'location.png';
            break;
        // Relationship status
        case 7:
            this.size = 2;
            this.icon = 'relationship.png';
            break;
        // Check-ins
        case 8:
            this.size = 3;
            this.icon = 'checkIns.png';
            break;
        // Events;
        case 9:
            this.size = 3;
            this.icon = 'events.png';
            break;
        // Photos
        case 10:
            this.size = 3;
            this.icon = 'photos.png';
            break;
        // Status Updates
        case 11:
            this.size = 3;
            this.icon = 'statusUpdates.png';
            break;
        // Friend's Birthdays
        case 12:
            this.size = 2;
            this.icon = 'fBirtday.png';
            break;
        // Friends Likes
        case 13:
            this.size = 2;
            this.icon = 'fLikes.png';
            break;
        // Friends Locations
        case 14:
            this.size = 2;
            this.icon = 'fLocations.png';
            break;
        // Friends work histories
        case 15:
            this.size = 2;
            this.icon = 'fWork.png';
            break;
        // Stories shared with you (check-ins)
        case 16:
            this.size = 3;
            this.icon = 'sCheckIns.png';
            break;
        // Stories shared with you (events)
        case 17:
            this.size = 3;
            this.icon = 'sEvents.png';
            break;
        // Stories shared with you (photos)
        case 18:
            this.size = 3;
            this.icon = 'sPhotos.png';
            break;
        // Stories shared with you (status updates)
        case 19:
            this.size = 3;
            this.icon = 'sStatusUpdates.png';
            break;
        // Post on your behalf
        case 20:
            this.size = 3;
            this.icon = 'post.png';
            break;
        // Access posts in your news feed
        case 21:
            this.size = 3;
            this.icon = 'newsFeedPosts.png';
            break;
        // Access your custom friends list
        case 22:
            this.size = 2;
            this.icon = 'customF.png';
            break;
        // Your Birthday
        case 23:
            this.size = 2;
            this.icon = 'birthday.png';
            break;
        // Your Videos
        case 24:
            this.size = 3;
            this.icon = 'video.png';
            break;
        // Your Description
        case 25:
            this.size = 2;
            this.icon = 'description.png';
            break;
        // Your Education
        case 26:
            this.size = 2;
            this.icon = 'education.png';
            break;
        // Your Work
        case 27:
            this.size = 2;
            this.icon = 'work.png';
            break;
        // basic info (Network)
        case 28:
            this.size = 1;
            this.icon = 'network.png';
            break;
        // basic info (list of friends)
        case 29:
            this.size = 1;
            this.icon = 'listOfFriends.png';
            break;
        // Friends Videos
        case 30:
            this.size = 2;
            this.icon = 'fVideos.png';
            break;
        // Friends Status Updates
        case 31:
            this.size = 2;
            this.icon = 'fStatusUpdtates.png';
            break;
        // Friends education
        case 32:
            this.size = 2;
            this.icon = 'fEducation.png';
            break;
        // Friends Relationship status
        case 33:
            this.size = 2;
            this.icon = 'fRelationship.png';
            break;
        // Friends Description
        case 34:
            this.size = 2;
            this.icon = 'fDescription.png';
            break;
    }

    var color;

    if(basic){
        color = '#ccc';
    }
    else{
        color = '#FF0000';
    }

    var radius = fb_game.getSize(this.size);

    // lime object
    var circle = (new lime.Circle).setFill(color).setSize(radius*2, radius*2);
    circle.setPosition(x,y);
    circle.setOpacity(0).setRenderer(lime.Renderer.CANVAS);
    fb_game.ballLayer.appendChild(circle);

    return circle;

};

fb_game.addBox2D = function(circle){
    var x = circle.getPosition().x;
    var y = circle.getPosition().y;

    // box2d object
    var bodyDef = new box2d.BodyDef;
    bodyDef.position.Set(x, y);
    bodyDef.angularDamping = .001;

    var shapeDef = new box2d.CircleDef;
    shapeDef.radius = circle.getSize().width/2;
    shapeDef.density = circle.getSize().width/2;
    shapeDef.restitution = .5;
    shapeDef.friction = 0.5;
    bodyDef.AddShape(shapeDef);

    var body = fb_game.world.CreateBody(bodyDef);
    circle._body = body; // just a reference, no API logic

};

// mapping the lime object to the box2d object
fb_game.updateFromBody = function(shape){
    var pos = shape._body.GetCenterPosition();
    var rot = shape._body.GetRotation();
    shape.setRotation(-rot / Math.PI * 180);
    shape.setPosition(pos);
};




fb_game.getSize = function(size){
    switch(size){
        case 1:
            return fb_game.ballSize.S_RADIUS;
            break;
        case 2:
            return fb_game.ballSize.M_RADIUS;
            break;
        case 3:
            return fb_game.ballSize.L_RADIUS;
            break;
        default:
            return fb_game.ballSize.L_RADIUS;
    }
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('fb_game.menu', fb_game.menu);
