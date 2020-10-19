import { Types } from 'mongoose';

interface Club {
  name: String;
  facebookLink: string;
  instagramLink: string;
  slackLink: string;
  description: string;
  thumbnailUrl: string;
  category: String;
  admins: Types.ObjectId[];
  _id: Types.ObjectId;
}

const clubsData: Club[] = [
  {
    name: 'Software Engineering Club',
    facebookLink: 'http://facebook.com',
    instagramLink: 'http://instagram.com',
    slackLink: 'http//slack.com',
    description: 'A fun club',
    category: 'Computer Science',
    thumbnailUrl: 'https://i.ibb.co/F4rHdKN/sec-club-img.jpg',
    admins: [new Types.ObjectId('16cb91bdc3464f14678934ca'), new Types.ObjectId('26cb91bdc3464f14678934ca')],
    _id: new Types.ObjectId('99cb91bdc3464f14678934ca'),
  },
  {
    name: 'Puppy Club',
    admins: [new Types.ObjectId('27cb91bdc3464f14678934ca')],
    facebookLink: 'http://facebook.com',
    instagramLink: 'http://instagram.com',
    slackLink: 'http//slack.com',
    description: 'We talk about puppies',
    thumbnailUrl: 'https://i.ibb.co/F0hqL1X/puppy-club-img.jpg',
    category: 'Fun',
    _id: new Types.ObjectId('99cd91bdc3464f14678934ca'),
  },
  {
    name: 'Gator Robotics',
    admins: [new Types.ObjectId('17cb91bdc3464f14678934ca')],
    category: 'Engineering',
    facebookLink: 'http://facebook.com',
    instagramLink: 'http://instagram.com',
    slackLink: 'http//slack.com',
    description: 'We talk about puppies',
    thumbnailUrl: 'https://i.ibb.co/F4rHdKN/sec-club-img.jpg',
    _id: new Types.ObjectId('99ce91bdc3464f14678934ca'),
  },
];

export = clubsData;
