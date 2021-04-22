import { DefaultState } from "koa";
import { User } from "./models/user";

export interface ApplicationState extends DefaultState {
  user?: User;
}
