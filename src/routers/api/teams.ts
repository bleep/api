import Router from "koa-router";
import {
  postTeams,
  deleteTeam,
  getTeam,
  getTeams,
  patchTeam,
} from "../../controllers/teams";

const router = new Router();

router.get("/", getTeams);
router.post("/", postTeams);
router.get("/:teamId", getTeam);
router.del("/:teamId", deleteTeam);
router.patch("/:teamId", patchTeam);

export default router;
