import { Types } from 'mongoose';
import { hashPassword } from '../../../util/authUtil';

interface User {
  name: { first: string, last: string };
  major: string,
  year: Number,
  email: string;
  username: string;
  password: { hash: string, salt: string };
  clubs: Types.ObjectId[];
  _id: Types.ObjectId
}

const usersData: User[] = [
  {
    name: { first: 'Pablo', last: 'Estrada' },
    major: 'Computer Science',
    year: 2022,
    email: 'pablo@ufl.edu',
    username: 'pabloe',
    password: hashPassword('123456'),
    clubs: [new Types.ObjectId('99cb91bdc3464f14678934ca'), new Types.ObjectId('99cd91bdc3464f14678934ca')],
    _id: new Types.ObjectId('16cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Jake', last: 'Sully' },
    major: 'Computer Science',
    year: 2022,
    email: 'jake@ufl.edu',
    username: 'jake32',
    password: hashPassword('123456'),
    clubs: [],
    _id: new Types.ObjectId('26cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Jerry', last: 'Smith' },
    major: 'Computer Science',
    year: 2022,
    email: 'jerry@ufl.edu',
    username: 'jerry3',
    password: hashPassword('123456'),
    clubs: [],
    _id: new Types.ObjectId('36cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Amy', last: 'Stake' },
    major: 'Computer Science',
    year: 2022,
    email: 'a.stake@ufl.edu',
    username: 'amy412',
    password: hashPassword('p@ssw0rd'),
    clubs: [],
    _id: new Types.ObjectId('46cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Anita', last: 'Braig' },
    major: 'Computer Science',
    year: 2022,
    email: 'anitabraig@ufl.edu',
    username: 'anita6',
    password: hashPassword('Pets2000'),
    clubs: [],
    _id: new Types.ObjectId('56cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Dan', last: 'Geruss' },
    major: 'Computer Science',
    year: 2022,
    email: 'dan@ufl.edu',
    username: 'dan123',
    password: hashPassword('notMyP@ssword'),
    clubs: [],
    _id: new Types.ObjectId('66cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Eve', last: 'O\'Lution' },
    major: 'Computer Science',
    year: 2022,
    email: 'eve@ufl.edu',
    username: 'eve123',
    password: hashPassword('Eve1998'),
    clubs: [],
    _id: new Types.ObjectId('76cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Faye', last: 'Tallity' },
    major: 'Computer Science',
    year: 2022,
    email: 'faye@ufl.edu',
    username: 'faye12',
    password: hashPassword('ClubFinity15'),
    clubs: [],
    _id: new Types.ObjectId('86cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Hayden', last: 'Seek' },
    major: 'Computer Science',
    year: 2022,
    email: 'hayden@ufl.edu',
    username: 'hayden',
    password: hashPassword('se56523'),
    clubs: [],
    _id: new Types.ObjectId('96cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Ho Lin', last: 'Wan' },
    major: 'Computer Science',
    year: 2022,
    email: 'holin@ufl.edu',
    username: 'holin1',
    password: hashPassword('865542d'),
    clubs: [],
    _id: new Types.ObjectId('07cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Hope', last: 'Lescase' },
    major: 'Computer Science',
    year: 2022,
    email: 'hope@ufl.edu',
    username: 'hope123',
    password: hashPassword('sd5f45a631'),
    clubs: [],
    _id: new Types.ObjectId('17cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Hugh', last: 'Cumber' },
    major: 'Computer Science',
    year: 2022,
    email: 'hugh@ufl.edu',
    username: 'hugh12',
    password: hashPassword('ghf65hf'),
    clubs: [],
    _id: new Types.ObjectId('27cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Hugh', last: 'Mungous' },
    major: 'Computer Science',
    year: 2022,
    email: 'hugh.M@ufl.edu',
    username: 'hugh53',
    password: hashPassword('PowerRangers36'),
    clubs: [],
    _id: new Types.ObjectId('37cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Ira', last: 'Grett' },
    major: 'Computer Science',
    year: 2022,
    email: 'ira@ufl.edu',
    username: 'ira123',
    password: hashPassword('CareBear1532'),
    clubs: [],
    _id: new Types.ObjectId('47cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Jay', last: 'Walker' },
    major: 'Computer Science',
    year: 2022,
    email: 'jay@ufl.edu',
    username: 'jay123',
    password: hashPassword('Jif321f'),
    clubs: [],
    _id: new Types.ObjectId('57cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Milly', last: 'Meter' },
    major: 'Computer Science',
    year: 2022,
    email: 'milly@ufl.edu',
    username: 'milly12',
    password: hashPassword('sdkljfaj5'),
    clubs: [],
    _id: new Types.ObjectId('67cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Sabina', last: 'Pleasure' },
    major: 'Computer Science',
    year: 2022,
    email: 'sabina@ufl.edu',
    username: 'sabina',
    password: hashPassword('asdfghjkl123'),
    clubs: [],
    _id: new Types.ObjectId('77cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'sally', last: 'Mander' },
    major: 'Computer Science',
    year: 2022,
    email: 'sally@ufl.edu',
    username: 'sally12',
    password: hashPassword('qwert123'),
    clubs: [],
    _id: new Types.ObjectId('87cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Shirley', last: 'Knott' },
    major: 'Computer Science',
    year: 2022,
    email: 'shirley@ufl.edu',
    username: 'shirley',
    password: hashPassword('poiu987'),
    clubs: [],
    _id: new Types.ObjectId('97cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Sue', last: 'Denley' },
    major: 'Computer Science',
    year: 2022,
    email: 'sue@ufl.edu',
    username: 'sue123',
    password: hashPassword('SUe99f'),
    clubs: [],
    _id: new Types.ObjectId('08cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Tina', last: 'Beense' },
    major: 'Computer Science',
    year: 2022,
    email: 'tina@ufl.edu',
    username: 'tina12',
    password: hashPassword('TBeense658'),
    clubs: [],
    _id: new Types.ObjectId('18cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Tom', last: 'Mawtow' },
    major: 'Computer Science',
    year: 2022,
    email: 'tom@ufl.edu',
    username: 'tom123',
    password: hashPassword('lastMawtow5'),
    clubs: [],
    _id: new Types.ObjectId('28cb91bdc3464f14678934ca'),
  },
  {
    name: { first: 'Wanda', last: 'phul' },
    major: 'Computer Science',
    year: 2022,
    email: 'wanda@ufl.edu',
    username: 'wanda1',
    password: hashPassword('WonderfulIsMyName'),
    clubs: [],
    _id: new Types.ObjectId('38cb91bdc3464f14678934ca'),
  },
];

export = usersData;
