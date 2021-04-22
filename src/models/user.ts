import { Model, Types } from "mongoose";
import { Document, Schema, model } from "mongoose";
import { EmailDocument } from "./email";
import mongooseAutoPopulate from "mongoose-autopopulate";

export interface User {
  name: { first: string; last: string };
  email: Types.ObjectId | EmailDocument;
  password: string;
  customerId: string;
}

interface UserBaseDocument extends User, Document {}

export interface UserDocument extends UserBaseDocument {
  email: EmailDocument["_id"];
}

export interface UserPopulatedDocument extends UserBaseDocument {
  email: EmailDocument;
}

export type UserModel = Model<UserDocument>;

export const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    first: {
      type: Schema.Types.String,
      required: true,
    },
    last: {
      type: Schema.Types.String,
      required: true,
    },
  },
  email: {
    type: Schema.Types.ObjectId,
    ref: "Email",
    required: true,
    unique: true,
    autopopulate: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    select: false,
  },
  customerId: {
    type: Schema.Types.String,
    required: true,
  },
});

// @ts-expect-error The types work out just fine, mongoose-autopopulate has an incorrect definition file.
UserSchema.plugin(mongooseAutoPopulate);

export default model("User", UserSchema);
