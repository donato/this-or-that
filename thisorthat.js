function randomByte() {
    if (crypto && crypto.getRandomValues) {
        // decent browsers
        let byte = new Uint8Array(1);
        crypto.getRandomValues(byte);
        return byte[0];
    } else if (crypto && crypto.randomBytes) {
        // nodejs
        let byte = crypto.randomBytes(1);
        return byte[0];
    } else {
        // crippled browsers
        return Math.floor(Math.random() * 1000 % 256);
    }
}

function choose(n) {
    while (true) {
        let byte = randomByte();
        let bucketSize = Math.floor(256/n);

        if (byte <= bucketSize * n) {
            return Math.ceil(byte / bucketSize);
        }
    }
}

/*
thisorthat
A method to help A/B/...n test in javascript by choosing between n config objects
and persisting it locally.

@param name: This is a key used when storing values. It's purpose is to allow you to use multiple thisorthat's on the same page
@param arrConfs: Array of possible configurations
@param modifier: Method which modifies the chosen object to include the specified index
 */
function thisorthat(name, arrConfs, modifier) {
    modifier = modifier || function defaultModifier(obj, idx) { obj['thisorthat'] = idx; };

    let idx;
    if (typeof(Storage) !== "undefined") {
        let key = 'thisorthat.' + name;
        idx = window.localStorage.getItem(key);
        if (idx instanceof String) {
            idx = parseInt(idx);
        } else {
            idx = choose(arrConfs.length);
            window.localStorage.setItem(key, idx);
        }
        obj = arr_confs[idx];
        modifier(obj, idx);
        return obj;
    } else {
        // If we cannot remember the same user past page-refreshes,
        //   then don't include in A/B test, just use the default conf
        return arr_confs[0];
    }
}