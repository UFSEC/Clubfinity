import { DateTime } from 'luxon';
import { Types } from 'mongoose';

interface Event {
  name: String;
  location: String;
  majorOfInterest: String;
  description: String;
  date: DateTime;
  goingUsers: Types.ObjectId[];
  club: Types.ObjectId;
  _id: Types.ObjectId;
}

const eventsData: Event[] = [
  {
    name: 'CodeForChange',
    location: 'CSE 23A',
    majorOfInterest: 'Computer Science',
    description: 'Join us for mini hackathon',
    date: DateTime.local(2020, 3, 23),
    goingUsers: [Types.ObjectId('16cb91bdc3464f14678934ca')],
    club: new Types.ObjectId('99cb91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
  {
    name: 'Hash Code',
    location: 'Reitz Union Room 43',
    majorOfInterest: 'Computer Science',
    description: 'We will be hosting google hashcode competition',
    date: DateTime.local(2020, 3, 20),
    goingUsers: [Types.ObjectId('16cb91bdc3464f14678934ca')],
    club: new Types.ObjectId('99cb91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
  {
    name: 'CodeShop',
    location: 'LIT 101',
    majorOfInterest: 'Computer Science',
    description: 'Join us for mini hackathon',
    date: DateTime.local(2020, 3, 7),
    goingUsers: [Types.ObjectId('16cb91bdc3464f14678934ca')],
    club: new Types.ObjectId('99cb91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
  {
    name: 'Puppy Zoo',
    location: 'Plaza of Americas',
    majorOfInterest: 'Fun',
    description: "We'll have various puppers to cuddle with! Join us :)",
    date: DateTime.local(2020, 3, 5),
    goingUsers: [],
    club: new Types.ObjectId('99cd91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
  {
    name: 'Potluck Wednesday',
    location: 'MAT 002',
    majorOfInterest: 'Fun',
    description: 'Join us for an evening of good pasta.',
    date: DateTime.local(2020, 3, 5),
    goingUsers: [],
    club: new Types.ObjectId('99ce91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
];

export = eventsData;
