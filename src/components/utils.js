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

export default utils;