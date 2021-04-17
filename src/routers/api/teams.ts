import Router from "koa-router";
import {
  postTeam,
  deleteTeam,
  getTeam,
  getTeams,
  patchTeam,
} from "../../controllers/teams";

const router = new Router();

router.get("/", getTeams);
router.post("/", postTeam);
router.get("/:teamId", getTeam);
router.del("/:teamId", deleteTeam);
router.patch("/:teamId", patchTeam);

export default router;
