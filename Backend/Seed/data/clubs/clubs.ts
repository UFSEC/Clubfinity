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
    president_name: "Navid",
    admins: [ new Types.ObjectId('16cb91bdc3464f14678934ca') ],
    major_of_interest: "Computer Science",
    email: "email@email.com",
    password: "123456",
    events: [],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca')
  }
];

export = clubsData;
