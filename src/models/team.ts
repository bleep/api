import { model, Schema } from "mongoose";
import User from "./user";

export const schema = new Schema({
  name: String,
  owner: User,
  members: [User],
});
export const identifier = "Team";
const Team = model(identifier, schema);

export default Team;
