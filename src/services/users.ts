import User, { UserDocument } from "../models/user";
import { removeTeamsUserOwns } from "./teams";

export const retrieveUserWithPasswordFromEmail = async (
  email: string
): Promise<UserDocument> => {
  const user = await User.findOne({ email }).select("+password");

  if (user === null) {
    throw new Error(`User with email ${email} not found`);
  }

  return user;
};

export const retrieveUser = async (id: string): Promise<UserDocument> => {
  const user = await User.findById(id);

  if (user === null) {
    throw new Error(`User with id ${id} not found.`);
  }

  return user;
};

export const createUser = async (properties: {
  name: { first: string; last: string };
  email: string;
  password: string;
}): Promise<UserDocument> => {
  const user = new User({
    name: { first: properties.name.first, last: properties.name.last },
    email: properties.email,
    password: properties.password,
  });

  return await user.save();
};

export const removeUser = async (id: string): Promise<UserDocument> => {
  await removeTeamsUserOwns(id);

  const removedUser = await User.findByIdAndDelete(id);

  if (removedUser === null) {
    throw new Error(`User with id ${id} not found.`);
  }

  return removedUser;
};

export const updateUser = async (
  id: string,
  updates: {
    name: { first: string; last: string };
    email: string;
    password: string;
  }
): Promise<UserDocument> => {
  const user = await User.findById(id);

  if (user === null) {
    throw new Error(`User with id ${id} not found`);
  }

  if (updates.name) user.name = updates.name;
  if (updates.email) user.email = updates.email;
  if (updates.password) user.password = updates.password;

  return await user.save();
};
