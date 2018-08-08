import getDb from '../helpers/db';

const db = getDb();

const admin = {
  id: 'admin',
  username: 'admin',
  team: 'sktwi1ce0jkkg13yl',
  hashed: '$2b$10$CtqN/FtAqhAIQlfx9Js1Me6kUkipGXeuKLWSeV4QNAoWIXCXVm/CW',
  role: 'admin',
};

const team = {
  id: 'admin-team',
  country: 'NL',
  name: 'Admin',
  user: 'admin',
  money: 5000000,
  value: 20000000,
};

db.setState({players: [], users: [admin], teams: [team], messages: []}).write();
