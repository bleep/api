import { genSalt, hash } from "bcrypt";
import { Model } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {}

export const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    first: {
      type: String,
      required: "First name is required.",
    },
    last: {
      type: String,
      required: "Last name is required.",
    },
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required",
    trim: true,
    validate: [validator.isEmail, "Invalid email."],
  },
  password: {
    type: String,
    required: "Password is required.",
    select: false,
  },
});

UserSchema.pre<UserDocument>("save", async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});

const UserModel = model("User", UserSchema);

export default UserModel;
