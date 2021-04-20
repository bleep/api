import { Model } from "mongoose";
import { Types } from "mongoose";
import { Document, Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { EmailDocument } from "./email";

export interface Recovery {
  email: Types.ObjectId | EmailDocument;
  dateCreated: Date;
}

interface RecoveryBaseDocument extends Recovery, Document {}

export interface RecoveryDocument extends RecoveryBaseDocument {
  email: EmailDocument["_id"];
}

export interface RecoveryPopulatedDocument extends RecoveryBaseDocument {
  email: EmailDocument;
}

export type RecoveryModel = Model<RecoveryDocument>;

export const RecoverySchema = new Schema<RecoveryDocument, RecoveryModel>({
  email: {
    type: Schema.Types.ObjectId,
    ref: "Email",
    required: true,
    autopopulate: true,
    immutable: true,
  },
  dateCreated: {
    type: Schema.Types.Date,
    default: Date.now(),
    expires: 500,
    immutable: true,
  },
});

// @ts-expect-error The types work out just fine, mongoose-autopopulate has an incorrect definition file.
RecoverySchema.plugin(mongooseAutoPopulate);

export default model("Recovery", RecoverySchema);
