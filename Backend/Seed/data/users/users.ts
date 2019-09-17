import { Schema, Types } from 'mongoose';

interface User {
  name: { first: string, last: string };
  dob: string;
  email: string;
  username: string;
  password: string;
  _id: Types.ObjectId
}

const usersData: User[] = [
  {
    name: { first: 'Pablo', last: 'Estrada' },
    dob: "01/01/1999",
    email: "pablo@gmail.com",
    username: "pablo",
    password: "123456",
    _id: new Types.ObjectId('16cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Jake', last: 'Sully' },
    dob: "01/01/1999",
    email: "jake@gmail.com",
    username: "jake",
    password: "123456",
    _id: new Types.ObjectId('26cb91bdc3464f14678934ca')
  },
  {
    name: { first: 'Jerry', last: 'Smith' },
    dob: "01/01/1999",
    email: "jerry@gmail.com",
    username: "jerry",
    password: "123456",
    _id: new Types.ObjectId('36cb91bdc3464f14678934ca')
  }
];

export = usersData;
