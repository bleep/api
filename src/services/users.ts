import { hash } from "bcrypt";
import createHttpError from "http-errors";
import { EmailDocument } from "../models/email";
import User, { UserDocument } from "../models/user";
import { createEmail, removeEmail } from "./email";
import { createCustomer, removeCustomer } from "./stripe";
import { createTeam, removeTeamsUserOwns } from "./teams";

export const retrieveUserAndPasswordFromEmail = async (
  email: EmailDocument
): Promise<UserDocument> => {
  const user = await User.findOne({ email }).select("+password");

  if (user === null) {
    throw createHttpError(403, "User not found.");
  }

  return user;
};

export const retrieveUser = async (id: string): Promise<UserDocument> => {
  const user = await User.findById(id);

  if (user === null) {
    throw createHttpError(403, "User not found.");
  }

  return user;
};

export const createUser = async (properties: {
  name: { first: string; last: string };
  email: string;
  password: string;
}): Promise<UserDocument> => {
  const email = await createEmail({ address: properties.email });
  const customer = await createCustomer({
    name: `${properties.name.first} ${properties.name.last}`,
    email: properties.email,
  });

  const user = new User({
    name: { first: properties.name.first, last: properties.name.last },
    password: await hash(properties.password, 10),
    customerId: customer.id,
    email,
  });

  const savedUser = await user.save();

  await createTeam({
    name: `${properties.name.first}'s Team`,
    owner: user._id,
  });

  return savedUser;
};

export const removeUser = async (id: string): Promise<UserDocument> => {
  const removedUser = await User.findByIdAndDelete(id);

  if (removedUser === null) {
    throw createHttpError(403, "User not found");
  }

  await removeTeamsUserOwns(id);
  await removeEmail(removedUser.email);
  await removeCustomer(removedUser.customerId);

  return removedUser;
};

export const updateUser = async (
  id: string,
  updates: {
    name: { first: string; last: string } | undefined;
    email: string | undefined;
    password: string | undefined;
  }
): Promise<UserDocument> => {
  const user = await User.findById(id).select("+password");

  if (user === null) {
    throw createHttpError("User not found.");
  }

  if (updates.name) user.name = updates.name;
  if (updates.password) user.password = await hash(updates.password, 10);
  if (updates.email) {
    if (updates.email === user.email.address) {
      throw createHttpError(403, "New email address cannot be same as old.");
    }

    const prevEmailId = user.email._id;
    user.email = await createEmail({ address: updates.email });
    await removeEmail(prevEmailId);
  }

  return await user.save();
};
