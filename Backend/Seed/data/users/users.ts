import { Schema, Types } from 'mongoose';

interface User {
  name: { first: string, last: string };
  dob: string;
  email: string;
  username: string;
  password: string;
  clubs: Types.ObjectId[];
  _id: Types.ObjectId
}

const usersData: User[] = [
  {
    name: { first: 'Pablo', last: 'Estrada' },
    dob: "01/01/1999",
    email: "pablo@gmail.com",
    username: "pablo",
    password: "123456",
    clubs: [ new Types.ObjectId('99cb91bdc3464f14678934ca'), new Types.ObjectId('99cd91bdc3464f14678934ca') ],
    _id: new Types.ObjectId('16cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Jake', last: 'Sully' },
    dob: "01/01/1999",
    email: "jake@gmail.com",
    username: "jake",
    password: "123456",
    clubs: [],
    _id: new Types.ObjectId('26cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Jerry', last: 'Smith' },
    dob: "01/01/1999",
    email: "jerry@gmail.com",
    username: "jerry",
    password: "123456",
    clubs: [],
    _id: new Types.ObjectId('36cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Amy', last: 'Stake' },
    dob: "02/23/2000",
    email: "a.stake@gmail.com",
    username: "amy",
    password: "p@ssw0rd",
    clubs: [],
    _id: new Types.ObjectId('46cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Anita', last: 'Braig' },
    dob: "05/09/1998",
    email: "anitabraig@gmail.com",
    username: "anita",
    password: "Pets2000",
    clubs: [],
    _id: new Types.ObjectId('56cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Dan', last: 'Geruss' },
    dob: "07/14/2001",
    email: "dan@gmail.com",
    username: "dan",
    password: "notMyP@ssword",
    clubs: [],
    _id: new Types.ObjectId('66cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Eve', last: 'O\'Lution' },
    dob: "08/16/1998",
    email: "eve@gmail.com",
    username: "eve",
    password: "Eve1998",
    clubs: [],
    _id: new Types.ObjectId('76cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Faye', last: 'Tallity' },
    dob: "01/07/1999",
    email: "faye@gmail.com",
    username: "faye",
    password: "ClubFinity15",
    clubs: [],
    _id: new Types.ObjectId('86cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Hayden', last: 'Seek' },
    dob: "01/12/1999",
    email: "hayden@gmail.com",
    username: "hayden",
    password: "se56523",
    clubs: [],
    _id: new Types.ObjectId('96cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Ho Lin', last: 'Wan' },
    dob: "03/01/1997",
    email: "holin@gmail.com",
    username: "holin",
    password: "865542d",
    clubs: [],
    _id: new Types.ObjectId('07cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Hope', last: 'Lescase' },
    dob: "12/15/1996",
    email: "hope@gmail.com",
    username: "hope",
    password: "sd5f45a631",
    clubs: [],
    _id: new Types.ObjectId('17cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Hugh', last: 'Cumber' },
    dob: "11/01/1996",
    email: "hugh@gmail.com",
    username: "hugh",
    password: "ghf65hf",
    clubs: [],
    _id: new Types.ObjectId('27cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Hugh', last: 'Mungous' },
    dob: "05/14/2000",
    email: "hugh.M@gmail.com",
    username: "hugh53",
    password: "PowerRangers36",
    clubs: [],
    _id: new Types.ObjectId('37cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Ira', last: 'Grett' },
    dob: "06/28/1998",
    email: "ira@gmail.com",
    username: "ira",
    password: "CareBear1532",
    clubs: [],
    _id: new Types.ObjectId('47cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Jay', last: 'Walker' },
    dob: "05/05/1995",
    email: "jay@gmail.com",
    username: "jay",
    password: "Jif321f",
    clubs: [],
    _id: new Types.ObjectId('57cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Milly', last: 'Meter' },
    dob: "01/01/2000",
    email: "milly@gmail.com",
    username: "milly",
    password: "sdkljfaj5",
    clubs: [],
    _id: new Types.ObjectId('67cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Sabina', last: 'Pleasure' },
    dob: "02/27/1997",
    email: "sabina@gmail.com",
    username: "sabina",
    password: "asdfghjkl123",
    clubs: [],
    _id: new Types.ObjectId('77cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'sally', last: 'Mander' },
    dob: "03/14/1999",
    email: "sally@gmail.com",
    username: "sally",
    password: "qwert123",
    clubs: [],
    _id: new Types.ObjectId('87cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Shirley', last: 'Knott' },
    dob: "04/16/1996",
    email: "shirley@gmail.com",
    username: "shirley",
    password: "poiu987",
    clubs: [],
    _id: new Types.ObjectId('97cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Sue', last: 'Denley' },
    dob: "07/19/1999",
    email: "sue@gmail.com",
    username: "sue",
    password: "SUe99f",
    clubs: [],
    _id: new Types.ObjectId('08cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Tina', last: 'Beense' },
    dob: "08/21/1997",
    email: "tina@gmail.com",
    username: "tina",
    password: "TBeense658",
    clubs: [],
    _id: new Types.ObjectId('18cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Tom', last: 'Mawtow' },
    dob: "03/25/2000",
    email: "tom@gmail.com",
    username: "tom",
    password: "lastMawtow5",
    clubs: [],
    _id: new Types.ObjectId('28cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Wanda', last: 'phul' },
    dob: "04/18/2001",
    email: "wanda@gmail.com",
    username: "wanda",
    password: "WonderfulIsMyName",
    clubs: [],
    _id: new Types.ObjectId('38cb91bdc3464f14678934ca')
  }
];

export = usersData;
