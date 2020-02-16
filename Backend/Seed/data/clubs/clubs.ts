import { Schema, Types } from 'mongoose';

interface Club {
  name: String;
  facebook_link: string;
  description: string;
  category: String;
  admins: Types.ObjectId[];
  events: Types.ObjectId[];
  _id: Types.ObjectId;
}

const clubsData: Club[] = [
  {
    name: "Software Engineering Club",
    facebook_link: "http://facebook.com",
    description: "A fun club",
    category: "Computer Science",
    admins: [ new Types.ObjectId('16cb91bdc3464f14678934ca'), new Types.ObjectId('26cb91bdc3464f14678934ca') ],
    events: [],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca')
  }
];

export = clubsData;
