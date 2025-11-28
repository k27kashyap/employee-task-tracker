require('dotenv').config();
const connectDB = require('./config/db');
const Employee = require('./models/Employee');
const Task = require('./models/Task');


async function seed() {
await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/smarttracker');


await Task.deleteMany();
await Employee.deleteMany();


const alice = new Employee({ name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' });
const bob = new Employee({ name: 'Bob Singh', email: 'bob@example.com', role: 'user' });
const carol = new Employee({ name: 'Carol Chen', email: 'carol@example.com', role: 'user' });


await alice.save();
await bob.save();
await carol.save();


const tasks = [
{ title: 'Design landing page', description: 'Create mockups', assignee: alice._id, status: 'in-progress', priority: 'high' },
{ title: 'Fix auth bug', description: 'JWT refresh', assignee: bob._id, status: 'todo', priority: 'medium' },
{ title: 'Write unit tests', description: 'Backend tests', assignee: carol._id, status: 'todo', priority: 'low' },
{ title: 'Deploy to staging', description: 'CI/CD', assignee: alice._id, status: 'done', priority: 'medium' }
];


await Task.insertMany(tasks);
console.log('Seed done');
process.exit(0);
}


seed().catch(err => { console.error(err); process.exit(1); });