import { Schema, Types } from 'mongoose';

interface Club {
  name: String;
  facebook_link: string;
  description: string;
  category: String;
  admins: Types.ObjectId[];
  _id: Types.ObjectId;
}

const clubsData: Club[] = [
  {
    name: "Software Engineering Club",
    facebook_link: "http://facebook.com",
    description: "A fun club",
    category: "Computer Science",
    admins: [ new Types.ObjectId('16cb91bdc3464f14678934ca'), new Types.ObjectId('26cb91bdc3464f14678934ca') ],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca')
  },
  {
    name: "Puppy Club",
    admins: [ new Types.ObjectId('27cb91bdc3464f14678934ca') ],
    facebook_link: "http://facebook.com",
    description: "We talk about puppies",
    category: "Fun",
    _id: new Types.ObjectId('99cd91bdc3464f14678934ca')
  },
  {
    name: "Gator Robotics",
    admins: [ new Types.ObjectId('17cb91bdc3464f14678934ca') ],
    category: "Engineering",
    facebook_link: "http://facebook.com",
    description: "We talk about puppies",
    _id: new Types.ObjectId('99ce91bdc3464f14678934ca')
  },
];

export = clubsData;
