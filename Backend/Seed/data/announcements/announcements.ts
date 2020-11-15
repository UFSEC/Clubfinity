import { DateTime } from 'luxon';
import { Types } from 'mongoose';

interface Announcement {
  title: string;
  description: string;
  date: DateTime;
  club: Types.ObjectId;
  _id: Types.ObjectId;
}

const announcementData: Announcement[] = [
  {
    title: 'CodeForChange date will be changing!',
    description: 'The CodeForChange will be changing due to conflicts with a few other events going on at the same time.  Make sure to check out the schedule for updates about the new date.',
    date: DateTime.local(2020, 10, 1),
    club: new Types.ObjectId('99cb91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
  {
    title: 'The GMB meeting room will now be ROOM123',
    description: 'Due to the fire in ROOM321, we will now be meeting in ROOM123.',
    date: DateTime.local(2020, 10, 5),
    club: new Types.ObjectId('99cb91bdc3464f14678934ca'),
    _id: new Types.ObjectId(),
  },
];

export = announcementData;
