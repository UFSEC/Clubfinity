import { Schema, Types } from 'mongoose';

interface Club {
  name: String;
  president_name: string;
  admins: Types.ObjectId[];
  major_of_interest: String;
  email: String;
  password: String;
  events: Types.ObjectId[];
  _id: Types.ObjectId;
}

const clubsData: Club[] = [
  {
    name: "Software Engineering Club",
    president_name: "Ankit",
    admins: [ new Types.ObjectId('16cb91bdc3464f14678934ca') ],
    major_of_interest: "Computer Science",
    email: "email@email.com",
    password: "123456",
    events: [],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca')
  },
  {
    name: "Puppy Club",
    president_name: "Hugh",
    admins: [ new Types.ObjectId('27cb91bdc3464f14678934ca') ],
    major_of_interest: "Fun",
    email: "hugh@email.com",
    password: "123456",
    events: [],
    _id: new Types.ObjectId('99cd91bdc3464f14678934ca')
  },
  {
    name: "Gator Robotics",
    president_name: "Hugh",
    admins: [ new Types.ObjectId('17cb91bdc3464f14678934ca') ],
    major_of_interest: "Engineering",
    email: "hope@email.com",
    password: "123456",
    events: [],
    _id: new Types.ObjectId('99ce91bdc3464f14678934ca')
  },


];

export = clubsData;
