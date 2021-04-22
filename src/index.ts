import Koa from "koa";
import { connect } from "mongoose";
import router from "./router";
import cors from "@koa/cors";
import { ApplicationState } from "./types";

const init = async (): Promise<void> => {
  const port = process.env.PORT || 5000;
  const dbUrl = process.env.MONGO_DB_CONNECTION_URL || "";

  await connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const app = new Koa<ApplicationState>();

  app.use(cors());
  app.use(router.routes());
  app.listen(port);

  console.log(`Server running on port ${port}`);
};

init();

export default init;
