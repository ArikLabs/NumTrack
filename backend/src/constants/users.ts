import bcrypt from 'bcrypt';

const COUNTER_READ = 'counter:read';
const COUNTER_INCR = 'counter:incr';
const COUNTER_DECR = 'counter:decr';

interface User {
  username: string;
  password: string;
  permissions: string[];
}

const users: User[] = [
  {
    username: 'alice',
    password: bcrypt.hashSync('secret1', 10),
    permissions: [COUNTER_READ, COUNTER_INCR, COUNTER_DECR],
  },
  {
    username: 'bob',
    password: bcrypt.hashSync('secret2', 10),
    permissions: [COUNTER_READ],
  },
];

export { User, users, COUNTER_READ, COUNTER_INCR, COUNTER_DECR };
