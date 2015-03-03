/**
 * Created with JetBrains PhpStorm.
 * User: daviddempsey
 * Date: 2/8/13
 * Time: 2:01 PM
 * To change this template use File | Settings | File Templates.
 */


//set main namespace
goog.provide('fb_game.Deliveryman');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');


fb_game.Deliveryman = function(){
    lime.Sprite.call(this);

    this.deliverymanLayer = new lime.Layer().setPosition(fb_game.size.WIDTH * 0.0,fb_game.size.HEIGHT * 0.5);
    this.deliverymanSprite = new lime.Sprite().setSize(180,180).setRenderer(lime.Renderer.CANVAS).setFill('Sprites/fb_guy.png');
    this.deliverymanLayer.appendChild(this.deliverymanSprite);
};

goog.inherits(fb_game.Deliveryman, lime.Sprite);

//create deliveryman moving function
