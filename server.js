const koaStatic = require('koa-static');
const Koa = require('koa');
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
    ctx.redirect('love.html')
});

app
    .use(router.routes())
    .use(koaStatic('./public'));

const port = 3000
app.listen(port, () => console.log(`App is running ${port}`));