import { hash } from "bcrypt";
import { Model } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface User {
  name: { first: string; last: string };
  email: string;
  password: string;
  customerId: string;
}

export interface UserDocument extends User, Document {}

export type UserModel = Model<UserDocument>;

export const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email."],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  customerId: {
    type: String,
    required: true,
  },
});

UserSchema.pre<UserDocument>("save", async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

export default model("User", UserSchema);
