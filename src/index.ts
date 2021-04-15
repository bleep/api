import Koa from "koa";
import { connect } from "mongoose";
import router from "./routers";

const init = async () => {
  if (process.env.MONGO_DB_CONNECTION_URL === undefined) {
    throw new Error(
      `Required environment variable MONGO_DB_CONNECTION_URL not found.`
    );
  }

  await connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const app = new Koa();

  app.use(router.routes());
  app.listen(3000);

  console.log("Server running on port 3000");
};

init();
