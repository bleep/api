import { Model } from "mongoose";
import { Types } from "mongoose";
import { Document, Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { EmailDocument } from "./email";

export interface Verification {
  email: Types.ObjectId | EmailDocument;
  dateCreated: Date;
}

interface VerificationBaseDocument extends Verification, Document {}

export interface VerificationDocument extends VerificationBaseDocument {
  email: EmailDocument["_id"];
}

export interface VerificationPopulatedDocument
  extends VerificationBaseDocument {
  email: EmailDocument;
}

export type VerificationModel = Model<VerificationDocument>;

export const VerificationSchema = new Schema<
  VerificationDocument,
  VerificationModel
>(
  {
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
  },
  { timestamps: true }
);

// @ts-expect-error The types work out just fine, mongoose-autopopulate has an incorrect definition file.
VerificationSchema.plugin(mongooseAutoPopulate);

export default model("Verification", VerificationSchema);
