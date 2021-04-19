import { Model } from "mongoose";
import { Document, Schema, model } from "mongoose";

export interface Verification {
  email: string;
  code: string;
  dateCreated: Date;
}

export interface VerificationDocument extends Verification, Document {}

export type VerificationModel = Model<VerificationDocument>;

export const VerificationSchema = new Schema<
  VerificationDocument,
  VerificationModel
>({
  email: {
    type: Schema.Types.ObjectId,
    ref: "Email",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 500,
  },
});

export default model("Verification", VerificationSchema);
