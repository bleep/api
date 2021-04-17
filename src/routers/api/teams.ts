import Router from "koa-router";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
} from "../../controllers/teams";

const router = new Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.get("/:teamId", getTeam);
router.del("/:teamId", deleteTeam);

export default router;
