import { Model } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface Email {
  address: string;
  verified: string;
}

export interface EmailDocument extends Email, Document {}

export type EmailModel = Model<EmailDocument>;

export const EmailSchema = new Schema<EmailDocument, EmailModel>({
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email."],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default model("Email", EmailSchema);
