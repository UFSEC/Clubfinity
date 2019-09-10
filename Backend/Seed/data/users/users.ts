interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  username: string;
  password: string;
}

const usersData: User[] = [
  {
    name: { first: 'Pablo', last: 'Estrada' },
    dob: "01/01/1999",
    email: "pablo@gmail.com",
    username: "pablo",
    password: "123456"
  },
  {
    name: { first: 'Jake', last: 'Sully' },
    dob: "01/01/1999",
    email: "jake@gmail.com",
    username: "jake",
    password: "123456"
  }
];

export = usersData;
