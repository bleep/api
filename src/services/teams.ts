import createHttpError from "http-errors";
import Team, { TeamDocument } from "../models/team";

export const removeTeamsUserOwns = async (
  userId: string
): Promise<TeamDocument[]> => {
  const removedTeams = [];
  const teamsUserOwns = await retrieveTeamsUserOwns(userId);

  for (const team of teamsUserOwns) {
    removedTeams.push(await removeTeam(team.id));
  }

  return removedTeams;
};

export const retrieveTeamsUserOwns = async (
  userId: string
): Promise<TeamDocument[]> => {
  return await Team.find({ owner: userId }).sort("-createdAt");
};

export const retrieveTeam = async (id: string): Promise<TeamDocument> => {
  const team = await Team.findById(id);

  if (team === null) {
    throw createHttpError(403, "Team not found");
  }

  return team;
};

export const createTeam = async (properties: {
  name: string;
  owner: string;
}): Promise<TeamDocument> => {
  const team = new Team({ name: properties.name, owner: properties.owner });

  return await team.save();
};

export const removeTeam = async (id: string): Promise<TeamDocument> => {
  const removedTeam = await Team.findByIdAndDelete(id);

  if (removedTeam === null) {
    throw createHttpError(403, "Team not found");
  }

  return removedTeam;
};

export const updateTeam = async (
  id: string,
  updates: {
    name?: string;
    owner?: string;
    collaborators?: string[];
  }
): Promise<TeamDocument> => {
  const team = await retrieveTeam(id);

  if (updates.name) team.name = updates.name;
  if (updates.owner) team.owner = updates.owner;
  if (updates.collaborators) team.collaborators = updates.collaborators;

  return await team.save();
};
