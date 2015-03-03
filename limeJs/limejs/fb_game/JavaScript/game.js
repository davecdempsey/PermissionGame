/**
 * Created with JetBrains PhpStorm.
 * User: daviddempsey
 * Date: 2/6/13
 * Time: 4:47 PM
 * To change this template use File | Settings | File Templates.
 */

//set main namespace
goog.provide('fb_game.Game');


//get requirements
goog.require('fb_game.Deliveryman');
goog.require('fb_game.Player');

goog.require('lime.Scene');
goog.require('lime.Sprite');




fb_game.Game = function(){

    lime.Scene.call(this);

    document.body.style.cursor = "crosshair";

    //Creating Deliveryman object
    this.deliveryman = new fb_game.Deliveryman();


    //Placing Background
    this.background = new lime.Sprite().setPosition(fb_game.size.WIDTH * 0.5,fb_game.size.HEIGHT * 0.5)
        .setSize(fb_game.size.WIDTH, fb_game.size.HEIGHT).setFill(fb_game.deliverymanSpriteSheet.getFrame('bg.png')).setRenderer(lime.Renderer.CANVAS);


    //Placing Vendor/Vendor Booth
    this.vendorBooth = new lime.Sprite().setAnchorPoint(0.5,0.10).setPosition(fb_game.size.WIDTH *.775,fb_game.size.HEIGHT * 0.115)
        .setSize(260, 290).setFill('Sprites/vendor_booth.png').setRenderer(lime.Renderer.CANVAS);

    this.vendorLayer = new lime.Layer().setPosition(fb_game.size.WIDTH *.785,fb_game.size.HEIGHT * 0.277);
    this.vendorHead = new lime.Sprite().setAnchorPoint(0.5,0.9).setSize(70, 75).setFill('Sprites/vendor_guy.png').setRenderer(lime.Renderer.CANVAS);

    this.vendorLayer.appendChild(this.vendorHead);

    //Placing Security Guy
    this.sec_guy = new Player();


    //Adding all layers and spirtes to scene
    this.appendChild(this.deliveryman);
    this.appendChild(this.background);
    this.appendChild(this.vendorLayer);
    this.appendChild(this.vendorBooth);
    this.appendChild(this.sec_guy);

};

goog.inherits(fb_game.playGame, lime.Scene);

