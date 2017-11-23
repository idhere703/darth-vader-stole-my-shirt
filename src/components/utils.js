import $ from 'jquery';
const utils = {};

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

export default utils;