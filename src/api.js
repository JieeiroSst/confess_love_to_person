const koaStatic = require('koa-static');
const Koa = require('koa');
const Router = require("@koa/router");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const health = require("koa-ping-healthcheck");
const serverless = require("serverless-http");
const koaBunyanLogger = require('koa-bunyan-logger');

const { love } = require("../api")
const { PORT } = require("./config")

const app = new Koa();
const router = new Router();

router.get(`/.netlify/functions/api`, love);

app
    .use(parser())
    .use(cors())
    .use(router.routes())
    .use(health())
    .use(koaBunyanLogger())
    .use(koaBunyanLogger.requestIdContext())
    .use(koaBunyanLogger.requestLogger({
        updateLogFields: function (fields) {
            fields.client_version = this.request.get('X-Client-Version');
        },
        updateResponseLogFields: function (fields, err) {
            if (err) {
                fields.last_db_query = this.db.lastDbQuery();
            }
        }
    }))
    .use(koaStatic('./dist'));

app.listen(PORT, () => console.log("Koa listening on...", `http://localhost:${PORT}`, "#eee8aa"));

module.exports.handler = serverless(app);