/*

stream-countdown-overlay : Countdown Overlay for Twitch Streams

Copyright (c) 2018 Queued Pixel <git@queuedpixel.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var debug            = false;
var width            = 4800;
var height           = 2700;
var countdownMinutes = 10;
var countdownSeconds = 0;
var countdownBuffer  = 5000;

var numberFormat = new Intl.NumberFormat( "en-US", { useGrouping: false, minimumIntegerDigits: 2 } );

var game;
var fpsText;
var messageText;
var countdownText;
var soonText;
var startTime = new Date();
var countdownTime = (( countdownMinutes * 60 ) + countdownSeconds ) * 1000;

function start()
{
    game = new Phaser.Game( width, height, Phaser.AUTO, "", { preload: preload, create: create, update: update } );
};

function preload()
{
    window.onresize = resize;
};

function create()
{
    resize();

    if ( debug ) game.time.advancedTiming = true;
    game.stage.disableVisibilityChange = true;

    var fpsTextProperties = { font: "100px Monospace", fill: "#FFFFFF" };
    fpsText = game.add.text( 50, 50, null, fpsTextProperties );
    fpsText.anchor.set( 0, 0 );

    var messageTextProperties = { font: "500px Single Sleeve, Sans", fill: "#FFFFFF" };
    messageText = game.add.text( width / 2, height / 2, "Stream Starting", messageTextProperties );
    messageText.anchor.set( 0.5, 0.5 );
    game.add.tween( messageText.scale ).to( { x: 0.9, y: 0.9 }, 1000, "Sine.easeInOut", true, 0, -1, true );

    var countdownTextProperties = { font: "400px Monospace", fill: "#FFFFFF" };
    countdownText = game.add.text( width / 2, height * ( 4 / 5 ), null, countdownTextProperties );
    countdownText.anchor.set( 0.5, 0.5 );

    var soonTextProperties = { font: "500px Single Sleeve, Sans", fill: "#FFFFFF" };
    soonText = game.add.text( width / 2, height * ( 31 / 40 ), null, soonTextProperties );
    soonText.anchor.set( 0.5, 0.5 );
};

function update()
{
    if ( debug ) fpsText.text = game.time.fps;

    var curTime = new Date();
    var remainingTime = ( countdownTime + countdownBuffer ) - ( curTime.valueOf() - startTime.valueOf() );
    if ( remainingTime > countdownTime ) remainingTime = countdownTime;

    if ( remainingTime >= 1000 )
    {
        var seconds = Math.floor( remainingTime / 1000 );
        var minutes = Math.floor( seconds / 60 );
        seconds = seconds % 60;
        countdownText.text = numberFormat.format( minutes ) + ":" + numberFormat.format( seconds );
        soonText.text = "";
    }
    else
    {
        countdownText.text = "";
        soonText.text = "Soon";
    }
};

function resize()
{
    game.scale.setGameSize( window.innerWidth, window.innerHeight );
    game.scale = new Phaser.ScaleManager( game, width, height );
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};
