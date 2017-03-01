# This Or That

ThisOrThat is a helper to make a/b/n testing a little easiers. Given an array of objects, it will choose an index into that array, and persist it across user sessions.
In cases where it cannot store locally, it will exclude the user from A/B testing.


```js
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
    
    // Given an array of objects, choose one and persist that choice across sessions
    chosen_config = thisorthat('my_app', [config_a, config_b]);
    
    console.log(chosen_config.image);      // either true or false
    console.log(chosen_config.thisorthat); // the index of the chosen config
```
