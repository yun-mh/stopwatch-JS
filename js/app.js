// TIME CONTROLLER
var timeController = (function() {

    var time = {
        hour : 0,
        min : 0,
        sec : 0,
        smallsec : 0
    };

    return {
        timeInit: function() {
            time.hour = 0;
            time.min = 0;
            time.sec = 0;
            time.smallsec = 0;
            UIController.dispInit();
        },
        counter: function() {
            time.smallsec++;
            UIController.displaySmlsec(UIController.addZero(time.smallsec));
            if (time.smallsec === 100) {
                time.smallsec = 0;
                time.sec++;
                time.sec !== 60 ? UIController.displaySec(UIController.addZero(time.sec)) :  UIController.displaySec(UIController.addZero(0));
                if (time.sec === 60) {
                    time.sec = 0;
                    time.min++;
                    time.min !== 60 ? UIController.displayMin(UIController.addZero(time.min)) : UIController.displayMin(UIController.addZero(0));
                    if (time.min === 60) {
                        time.min = 0;
                        time.hour++;
                        UIController.displayHour(UIController.addZero(time.hour));
                    }
                }
            }
        }
    }
})();



// UI CONTROLLER
var UIController = (function() {
    
    var isPressed = false;

    var DOMclass = {
        btnStart: '.button.button-start',
        btnReset: '.button.button-reset',
        btnStop: '.button.button-stop',
        dispHour: '.display-hour',
        dispMin: '.display-minute',
        dispSec: '.display-second',
        dispSmlSec: '.display-millisec'
    }

    return {
        getDOMclass: function() {
            return DOMclass;
        },
        changeBtn: function() {
            var start = document.querySelector(DOMclass.btnStart);
            var stop = document.querySelector(DOMclass.btnStop);
            var reset = document.querySelector(DOMclass.btnReset);
            isPressed = !isPressed;
            if(isPressed) {
                start.style.display = 'none';
                stop.style.display = 'inline';
                reset.style.visibility = 'hidden';
            } else {
                stop.style.display = 'none';
                start.style.display = 'inline';
                reset.style.visibility = 'visible';
            }
        },
        displaySmlsec: function(smallsec) {
            var smsec = smallsec;
            document.querySelector(DOMclass.dispSmlSec).textContent = smsec;
        },
        displaySec: function(sec) {
            var second = sec;
            document.querySelector(DOMclass.dispSec).textContent = second;
        },
        displayMin: function(min) {
            var minute = min;
            document.querySelector(DOMclass.dispMin).textContent = minute;
        },
        displayHour: function(h) {
            var hour = h;
            document.querySelector(DOMclass.dispHour).textContent = hour;
        },
        addZero: function(num) {
            num = num.toString();
            if (num.length === 1) {
                num = '0' + num;
                return num;
            } else if (num.length === 3) {
                num = '00';
                return num;
            } else {
                return num;
            }
        },
        dispInit: function() {
            this.displayHour('00');
            this.displayMin('00');
            this.displaySec('00');
            this.displaySmlsec('00');
        }
    }
})();



// APP CONTROLLER
var appController = (function(timeCtrl, UICtrl) {
    // Setup the event listeners
    var setEventListener = function() {
        
        timeCtrl.timeInit();

        var stopwatch;

        var DOM = UICtrl.getDOMclass();

        var startCount = function() {
            stopwatch = setInterval(timeCtrl.counter, 10);
        };

        var stopCount = function() {
            clearInterval(stopwatch);
        };

        var resetCount = function() {
            // Initialize time values 
            timeCtrl.timeInit();
        };

        // Start the counter
        document.querySelector(DOM.btnStart).addEventListener('click', function() {
            // 1. Count
            startCount();
            // 2. Change the start button to the stop button
            UICtrl.changeBtn();
        });

        // Stop the counter
        document.querySelector(DOM.btnStop).addEventListener('click', function() {
            // 1. Stop counting
            stopCount();
            // 2. Change UI
            UICtrl.changeBtn();
        });

        // Reset the counter
        document.querySelector(DOM.btnReset).addEventListener('click', resetCount);
    }

    var stop = function() {
        // Stop the count
        document.querySelector(DOM.btnStop).addEventListener('click', function() {
            // 1. Stop counting
            stopCount();
            // 2. Change UI
            UICtrl.changeBtn();
        });
    }

    return {
        init: function() {
            setEventListener();
        }
    }
})(timeController, UIController);

appController.init();