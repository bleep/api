import Koa from "koa";
import { connect } from "mongoose";
import router from "./routers";

const init = async () => {
  const port = process.env.PORT || 5000;
  const dbUrl = process.env.MONGO_DB_CONNECTION_URL || "";

  await connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const app = new Koa();

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.body = { message: e.message };
      ctx.status = e.status || 500;
      console.error(e);
    }
  });

  app.use(router.routes());
  app.listen(port);

  console.log(`Server running on port ${port}`);
};

init();
