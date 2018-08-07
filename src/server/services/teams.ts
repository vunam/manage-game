import getDb from '../helpers/db';

const db = getDb();
const table = 'teams';

// READ

export const getAllTeams = () =>
  db
    .cloneDeep()
    .get(table)
    .value();

export const findTeamById = id =>
  db
    .get(table)
    .find({id})
    .value();

export const findTeamByUser = user =>
  db
    .get(table)
    .find({user})
    .value();


// WRITE

export const createTeam = (data) =>
  db
    .get(table)
    .push(data)
    .write();

export const updateTeamById = (id, data) =>
  db
    .get(table)
    .find({id})
    .assign(data)
    .write();

export const updateTeamByUser = (user, data) =>
  db
    .get(table)
    .find({user})
    .assign(data)
    .write();