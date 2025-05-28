const express =  require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// Connect to MongoDB
const app = express();

// connect to Redis
const red_host = 'redis'; // replace with your Redis host
const red_port = '6379'; // replace with your Redis port
const redisClient = redis.createClient({
  url: `redis://${red_host}:${red_port}` // replace with your Redis URL
});
redisClient.on('connect', () => {
  console.log('Connected to Redis...');
}
);
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
}
);
redisClient.connect();
// connect to MongoDB

const DB_USER  = 'root'; // replace with your MongoDB username
const DB_PASSWORD = 'example'; // replace with your MongoDB password
const DB_HOST = 'mongo'; // replace with your MongoDB host
const DB_PORT = '27017'; // replace with your MongoDB port
const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB.....');
}
).catch(err => {
  console.error('Error connecting to MongoDB:', err);
}
);


const port = 5000;


app.get('/', (req, res) => {
  res.send('Hello World to ahmed again from docker!  Ready to go on aws');
}
);

// app.get('/data', async (req, res) => {
//   const value = await redisClient.get('prouct');
//   res.send(`Hello World to ${value}`);
// }
// );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}
);
