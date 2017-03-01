let {thisorthat} = require ('thisorthat.js');

let config_a = {
    min: 1,
    max: 100,
    image: false
};
let config_b = {
    min: 1,
    max: 100,
    image: true
};
let possible_configs = [
    config_a,
    config_b
];


// Given a tuple of objects, choose one and persist that choice across sessions
chosen_config = thisorthat('my_app', possible_configs)

