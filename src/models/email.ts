import { Model } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface Email {
  address: string;
  verified: boolean;
}

export interface EmailDocument extends Email, Document {}

export type EmailModel = Model<EmailDocument>;

export const EmailSchema = new Schema<EmailDocument, EmailModel>(
  {
    address: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
      immutable: true,
      validate: [validator.isEmail, "Invalid email."],
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Email", EmailSchema);
