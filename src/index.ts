import Koa, { Context, HttpError, Next } from "koa";
import { MongoError } from "mongodb";
import { connect } from "mongoose";
import router from "./router";
import cors from "@koa/cors";
import { ZodError } from "zod";
import { ENVIRONMENT } from "./constants";

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ZodError) {
      ctx.status = 422;
      ctx.body = {
        error: true,
        status: 422,
        name: e.name,
        message: e.message,
      };
    } else if (e instanceof MongoError) {
      ctx.status = 403;
      ctx.body = {
        error: true,
        status: 403,
        name: e.name,
        message: e.message,
      };
    } else if (e instanceof HttpError && e.expose) {
      ctx.status = e.status;
      ctx.body = {
        error: true,
        status: e.status,
        name: e.name,
        message: e.message,
      };
    } else {
      console.error(e);
      ctx.status = 500;
      ctx.body = {
        error: true,
        status: 500,
        name: "InternalServerError",
        message: "There was a server error.",
      };
    }
  }
};

const init = async (): Promise<void> => {
  const port = ENVIRONMENT.PORT || 5000;
  const dbUrl = ENVIRONMENT.MONGO_DB_CONNECTION_URL || "";

  await connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const app = new Koa();

  app.use(errorHandler);
  app.use(cors());
  app.use(router.routes());
  app.listen(port);

  console.log(`Server running on port ${port}`);
};

init();

export default init;
