const { Pool, Client } = require('pg');

const credentials = {
  user: 'y1tang',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
};

async function connectClient() {
  const client = new Client(credentials);
  await client.connect();
  console.log('Connected to sdc db successfully');
  const now = await client.query("SELECT NOW()");
  console.log('The time is ' + now);
  await client.end();
  console.log('Client disconnected successfully');
  return now;
}

module.exports = connectClient();