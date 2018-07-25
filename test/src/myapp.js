// This is an example app with apiDoc annotations.
//for websocket request only
/**
 * @api {websocket} do:somthing for do somthing
 * @apiGroup User
 * @apiName doSomething
 * @apiWebsocket ws://localhost:8082
 */
function doSomething() {
    console.log('best app ever');
}
// when global config using: wsRequest
/**
 * @api {websocket} do:anything for do anything
 * @apiGroup User
 * @apiName doAnything
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {websocket} do:otherThing for do otherThing
 * @apiGroup User
 * @apiName doOtherThing
 * @apiWebsocket /subpath/subversion
 */
function doSomething() {
    console.log('best app ever');
}

//for websocket and http both:
/**
 * @api {get,websocket} user/look look a user
 * @apiGroup User
 * @apiName lookUser
 */
function doSomething() {
    console.log('best app ever');
}
/**
 * @api {get,websocket} user/find find a user
 * @apiGroup User
 * @apiName findUser
 * @apiWebsocket {ws_user:ws_find}
 */
function doSomething() {
    console.log('best app ever');
}
