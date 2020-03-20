import { Types } from 'mongoose';

interface Event {
  name: String,
  location: String,
  major_of_interest: String,
  description: String,
  date: String,
  goingUsers: Types.ObjectId[],
  club: Types.ObjectId,
  _id: Types.ObjectId
}

const eventsData: Event[] = [
  {
    name: "CodeForChange",
    location: "CSE 23A",
    major_of_interest: "Computer Science",
    description: "Join us for mini hackathon",
    date: "02/23/2020",
    goingUsers: [ "16cb91bdc3464f14678934ca" ],
    club: new Types.ObjectId("99cb91bdc3464f14678934ca"),
    _id: new Types.ObjectId()
  },
  {
    name: "Hash Code",
    location: "Reitz Union Room 43",
    major_of_interest: "Computer Science",
    description: "We will be hosting google hashcode competition",
    date: "02/20/2020",
    goingUsers: [ "16cb91bdc3464f14678934ca" ],
    club: new Types.ObjectId("99cb91bdc3464f14678934ca"),
    _id: new Types.ObjectId()
  },
  {
    name: "CodeShop",
    location: "LIT 101",
    major_of_interest: "Computer Science",
    description: "Join us for mini hackathon",
    date: "02/07/2020",
    goingUsers: [ "16cb91bdc3464f14678934ca" ],
    club: new Types.ObjectId("99cb91bdc3464f14678934ca"),
    _id: new Types.ObjectId()
  },
  {
    name: "Puppy Zoo",
    location: "Plaza of Americas",
    major_of_interest: "Fun",
    description: "We'll have various puppers to cuddle with! Join us :)",
    date: "02/05/2020",
    goingUsers: [],
    club: new Types.ObjectId("99cd91bdc3464f14678934ca"),
    _id: new Types.ObjectId()
  },
  {
    name: "Potluck Wednesday",
    location: "MAT 002",
    major_of_interest: "Fun",
    description: "Join us for an evening of good pasta.",
    date: "02/05/2020",
    goingUsers: [],
    club: new Types.ObjectId("99ce91bdc3464f14678934ca"),
    _id: new Types.ObjectId()
  }
];

export = eventsData;
