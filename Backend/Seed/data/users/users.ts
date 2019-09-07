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
    firstName: "Pablo",
    lastName: "Estrada",
    dateOfBirth: "01/01/1999",
    email: "pablo@gmail.com",
    username: "pablo",
    password: "123456"
  },
  {
    firstName: "Jake",
    lastName: "Sully",
    dateOfBirth: "01/01/1999",
    email: "jake@gmail.com",
    username: "jake",
    password: "123456"
  }
];

export = usersData;
