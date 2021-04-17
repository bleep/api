import { model, Schema, Types, Document, Model } from "mongoose";
import { UserDocument } from "./user";

export interface Team {
  name: string;
  owner: Types.ObjectId | UserDocument;
  collaborators: (Types.ObjectId | UserDocument)[];
}

interface TeamBaseDocument extends Team, Document {}

export interface TeamDocument extends TeamBaseDocument {
  owner: UserDocument["_id"];
  collaborators: UserDocument["_id"][];
}

export interface TeamPopulatedDocument extends TeamBaseDocument {
  owner: UserDocument;
  collaborators: UserDocument[];
}

export type TeamModel = Model<TeamDocument>;

export const TeamSchema = new Schema<TeamDocument, TeamModel>({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
});

export default model<TeamDocument, TeamModel>("Team", TeamSchema);
