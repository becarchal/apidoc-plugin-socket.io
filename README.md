# apidoc-plugin-bic-ws

__Only a simple plugin for websocket support.__

`@apiWebsocket [true] [description]`

apidoc search in global node modules dir and local `node_modules` for modules that start with `apidoc-plugin-`. (local installed plugins have higher priority)

With a plugin you can add features like new parsers or filters and workers.

A plugin can use apidoc-core [hooks](https://github.com/apidoc/apidoc-core/blob/master/hooks.md).
Hooks can be used to extend or transform data.

## Install
`npm install apidoc-plugin-bic-ws --save-dev`

## Example Use
```javascript
/**
 * @api {get} /api GetAPI
 * @apiWebsocket true
 */
 ```

Other more extension refer to the template html
