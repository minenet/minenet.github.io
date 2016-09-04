function KeyboardInputManager() {
    this.events = {};

    if (window.navigator.msPointerEnabled) {
        //Internet Explorer 10 style
        this.eventTouchstart = "MSPointerDown";
        this.eventTouchmove = "MSPointerMove";
        this.eventTouchend = "MSPointerUp";
    } else {
        this.eventTouchstart = "touchstart";
        this.eventTouchmove = "touchmove";
        this.eventTouchend = "touchend";
    }

    this.listen();
}

KeyboardInputManager.prototype.on = function(event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function(event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function(callback) {
            callback(data);
        });
    }
};

KeyboardInputManager.prototype.listen = function() {
    var self = this;

    var map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // vim keybindings
        76: 1,
        74: 2,
        72: 3
    };

    document.addEventListener("keydown", function(event) {
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
            event.shiftKey;
        var mapped = map[event.which];

        if (!modifiers) {
            if (mapped !== undefined) {
                event.preventDefault();
                var feedbackContainer = document.getElementById('feedback-container');
                feedbackContainer.innerHTML = ' ';
                self.emit("move", mapped);
            }

            if (event.which === 32) self.restart.bind(self)(event);
        }
    });

    var retry = document.getElementsByClassName("retry-button")[0];
    retry.addEventListener("click", this.restart.bind(this));

    var hintButton = document.getElementById('hint-button');
    hintButton.addEventListener('click', function(e) {
        e.preventDefault();
        var feedbackContainer = document.getElementById('feedback-container');
        feedbackContainer.innerHTML = '<img src=img/spinner.gif />';
        self.emit('think');
    });

    var runButton = document.getElementById('run-button');
    runButton.addEventListener('click', function(e) {
        e.preventDefault();
        self.emit('run')
    })


    // Listen to swipe events
    var gestures = [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT,
        Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT
    ];

    var gameContainer = document.getElementsByClassName("game-container")[0];
    var handler = Hammer(gameContainer, {
        drag_block_horizontal: true,
        drag_block_vertical: true
    });

    gameContainer.addEventListener(this.eventTouchstart, function(event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
            event.targetTouches > 1) {
            return; // Ignore if touching with more than 1 finger
        }

        if (window.navigator.msPointerEnabled) {
            touchStartClientX = event.pageX;
            touchStartClientY = event.pageY;
        } else {
            touchStartClientX = event.touches[0].clientX;
            touchStartClientY = event.touches[0].clientY;
        }

        event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchmove, function(event) {
        event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchend, function(event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
            event.targetTouches > 0) {
            return; // Ignore if still touching with one or more fingers
        }

        var touchEndClientX, touchEndClientY;

        if (window.navigator.msPointerEnabled) {
            touchEndClientX = event.pageX;
            touchEndClientY = event.pageY;
        } else {
            touchEndClientX = event.changedTouches[0].clientX;
            touchEndClientY = event.changedTouches[0].clientY;
        }

        var dx = touchEndClientX - touchStartClientX;
        var absDx = Math.abs(dx);

        var dy = touchEndClientY - touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            // (right : left) : (down : up)
            self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
        }
    });

    // handler.on("swipe", function (event) {
    //   event.gesture.preventDefault();
    //   mapped = gestures.indexOf(event.gesture.direction);

    //   if (mapped !== -1) self.emit("move", mapped);
    // });
};

KeyboardInputManager.prototype.restart = function(event) {
    event.preventDefault();
    this.emit("restart");
};