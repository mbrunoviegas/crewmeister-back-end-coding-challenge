const fs = require('fs');
const path = require('path');

const ABSENCES_PATH = path.join(__dirname, '../data/json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, '../data/json_files', 'members.json');

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
  .then((data) => JSON.parse(data))
  .then((data) => data.payload);

exports.members = () => readJsonFile(MEMBERS_PATH);
exports.absences = () => readJsonFile(ABSENCES_PATH);