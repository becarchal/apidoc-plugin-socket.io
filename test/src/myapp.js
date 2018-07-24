// This is an example app with apiDoc annotations.

/**
 * @api {get} /do/something
 * @apiGroup User
 * @apiWebsocket true
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {get} /do/off
 * @apiGroup User
 * @apiWebsocket false
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {get} /do/cmd-func
 * @apiGroup User
 * @apiWebsocket {user:look}
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {post,websockt} /do/all
 * @apiGroup User
 * @apiWebsocket {user:find} ws://localhost:8000/df
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {get,websockt} /do/suffix
 * @apiGroup User
 * @apiWebsocket /df
 */
function doSomething() {
    console.log('best app ever');
}
