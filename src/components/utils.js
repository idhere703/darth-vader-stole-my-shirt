import $ from 'jquery';
const utils = {};

// This ought to annoy the crap out of anyone reading it.
utils.showText = (target, message, index, interval) => {
    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(() => {
            utils.showText(target, message, index, interval);
        }, interval);
    }
};

utils.watchForSpacebar = (target, fn) => {
    $(target).keyup((evt) => {
        // Spacebar.
        if (evt.keyCode === 32) {
            fn(evt);
        }
    });
};

utils.watchForArrowKeys = (target, fn) => {
    // left = 37
    // up = 38
    // right = 39
    // down = 40
    $(target).keyup((evt) => {
        if (evt.keyCode === 37) {
            fn(evt)
        } else if (evt.keyCode === 38) {
            fn(evt)
        } else if (evt.keyCode === 39) {
            fn(evt)
        } else if (evt.keyCode === 40) {
            fn(evt)
        }
    });
};

export default utils;