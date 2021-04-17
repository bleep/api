import Team, { TeamDocument } from "../models/team";

export interface UserExposedProperties = {

}

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
  return await Team.find({ owner: userId });
};

export const retrieveTeam = async (id: string): Promise<TeamDocument> => {
  const team = await Team.findById(id);

  if (team === null) {
    throw new Error(`Team with id ${id} not found.`);
  }

  return team;
};

export const createTeam = async(properties: {name: string, owner: string}): Promise<TeamDocument> => {

  const team = new Team({ name: properties.name, owner: properties.owner });

  return await team.save()

};

export const removeTeam = async (id: string): Promise<TeamDocument> => {
  const removedTeam = await Team.findByIdAndDelete(id);

  if (removedTeam === null) {
    throw new Error(`Team with id ${id} not found.`);
  }

  return removedTeam;
};
