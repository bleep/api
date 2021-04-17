import Router from "koa-router";
import Team from "../../models/team";

const router = new Router();

router.get("/", async (ctx, next) => {
  try {
    ctx.body = await Team.find({ owner: ctx.state.user._id });
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

router.post("/", async (ctx, next) => {
  const { name } = ctx.request.body;

  const team = new Team({ name, owner: ctx.state.user._id });

  try {
    ctx.status = 201;
    ctx.body = await team.save();
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

router.get("/:teamId", async (ctx, next) => {
  try {
    const team = await Team.findById(ctx.params.teamId);

    if (team === null) {
      ctx.throw(404, new Error("Team not found."));
    }

    ctx.body = team;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

router.del("/:teamId", async (ctx, next) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(ctx.params.teamId);

    if (deletedTeam === null) {
      ctx.throw(404, new Error("Team not found."));
    }

    ctx.body = deletedTeam;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

export default router;
