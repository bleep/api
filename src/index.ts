import Koa from "koa";
import { connect } from "mongoose";
import router from "./routers";
import cors from "@koa/cors";

import Team from "./models/team";
import User from "./models/user";
import Email from "./models/email";
import Verification from "./models/verification";

const init = async () => {
  const port = process.env.PORT || 5000;
  const dbUrl = process.env.MONGO_DB_CONNECTION_URL || "";

  await connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  await Team.init();
  await User.init();
  await Email.init();
  await Verification.init();

  const app = new Koa();

  app.use(cors());

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
