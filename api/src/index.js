const Loki = require("lokijs");
const Koa = require("koa");
const Route = require('koa-route');
const Websockify = require('koa-websocket');
 
const app = Websockify(new Koa());

// https://techfort.github.io/LokiJS/
const db = new Loki('myDb.db');
const createCollection = name => db.addCollection(name)

const mouse = createCollection('mouse');



app.ws.use(function(ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  return next(ctx);
});

app.ws.use(Route.all('/hello', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send('Hello World');
}));

app.ws.use(Route.all('/echo', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.on('message', function(message) {
    // do something with the message from client
    ctx.websocket.send(message)
  });
}));

app.ws.use(Route.all('/mouse-position', function (ctx) {
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.on('message', function(message) {
    // do something with the message from client
    mouse.insert(JSON.parse(message))
    console.log(mouse.count())
  });
}));

app.listen(1234);
