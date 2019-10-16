# Clubfinity

:rocket: A modern platform to connect students and organizations across UF campus :crocodile:

![clubfinity](/Frontend/assets/images/clubfinity.png)

#### Table of Contents
- [The Premise](#the-premise)
- [Getting Setup](#getting-setup)
  - [Setting up the Backend (Server and Database)](#setting-up-the-backend-server-and-database)
  - [Setting up the Frontend (Mobile App)](#setting-up-the-frontend-mobile-app)
- [What now?](#what-now)


### The Premise

A vital part of campus life :school: for any student is exploring diverse communities 🙌 that share their interests 🦸 and help them feel empowered :muscle: during their college life.

With a campus as huge as UF 🐊 there are multiple clubs and societies to join, but there is a wide communication 📢 gap between interested students and the organizations causing general students to be unaware 🤷 of ongoing events, and the clubs to resort to harrasing passerbys in Turlington 😤 ‍

###### Ok so where does clubfinity come in?
Clubfinity aims to fill this vacuum between students and clubs via providing a spectacular platform where you can:

- Follow your favorite clubs and be notified of upcoming events or announcements
- Easily discover new groups of interest
- Enjoy reduced turlington tablers (It's not going away completely 🙃)
- Effectively manage your own student clubs

## Getting Setup

**Getting access to the codebase**
We need you to have access to our repo and all of our files, so the first step is to create a
gitlabs account: www.gitlab.com. Once you make your account, send Will a message with your
gitlab username so he can add you to the repo.

**Choosing your Text Editor**
For this project you’re allowed to use any text editor of your choice, however I personally would
recommend Visual Studio Code because of the nice interface and wide variety of extensions it
provides.

### Setting up the Backend (Server and Database)
If you’re doing front end skip this first page, otherwise keep reading. So you wanna do backend
huh? Well I don’t think you got what it TAKES, at least not until you setup your environment.

**Installing NodeJS**
After you choose your text editor, the next thing you need to do is install NodeJS which is the
Javascript interpreter we will be using for the backend. NodeJS can be installed here:
https://nodejs.org/en/, the version we will be using will be 10.13.0 LTS so be sure to install the
correct version.

**NodeJS in MacOS:**
Homebrew is a great package installer you can download here: https://brew.sh/
You may also type this into terminal:
```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

Once you have homebrew installed, simply type:
```$ brew install node```

**NPM**
NPM stands for Node Package Manager and will be a vital resource for installing the many
external libraries we will be using for our project, the biggest one being ExpressJS. The syntax
for installing anything with npm is:
```npm install [package name]```

After installing something, all the files will go inside a folder created for you called
_node_modules_. This file should not be moved or renamed, or else your code will not be able to
find any of its dependencies.

**ExpressJS**
ExpressJS is the main javascript framework we will be using to handle most of our backend.
Express is how we will be able to create a server, handle requests to that server, and return
data back to the client.
To add express to your project you need to use the following command:
```npm install express```
which will install all the required dependencies you need for express.
**Setup you local environment environment**
After you locally clone the project from Gitlab, there are a couple initial steps you need to
take in order to get the server running:
- Ensure Node.js & NPM are installed (you can enter `node -v` & `npm -v` in a terminal to ensure they installed correctly)
- Install MongoDB locally or via Docker
- In a terminal, `cd` into `clubfinity/Backend` and enter the command `npm install`. This will install
  the necessary 3rd-party dependancies your local copy of project (this is necessary whenever you clone an NPM package)

**Starting the server**
Whenever you want to develop or run the server, take the following steps:
- Start MongoDB
- Start the server with `npm start`. You can leave this running, any changes you make to the codebase will restart
  the server automatically for you.

=======
**MongoDB**
User, event, and club information will be stored using MongoDB (non-relation database). For development, you will have to run a local database using MongoDB. Here are some instructions on [installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ "installation") on Windows. If you have a Mac, here are some instructions for [installation](https://treehouse.github.io/installation-guides/mac/mongo-mac.html "installation").

By default, the backend is configured interact with a MongoDB local database running on port 8080 to a database named *test*. You can change these default values at *Backend/Config/config.json*.

**Running the Backend**

Once you have installed Node.js, NPM, ExpressJS, and are running a local MongoDB database, you are ready to run the project.

First, install all the dependencies by running ```npm install``` and then run the app.js file by running ```node app.js``` from the Backend folder. You should get something resembling this output:

```
express-session deprecated undefined resave option; provide resave option Routes/AuthRoutes.js:9:12
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option Routes/AuthRoutes.js:9:12
(node:1548) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:1548) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Now listening on port 8080
Mongoose default connection open to mongodb://localhost:27017/test
```
The backend should be running at http://localhost:8080

#### Setting up the Frontend (Mobile App)
Your first step would be to make sure you have npm and NodeJS installed on your pc/mac. The
details on how to do that can be found above in the “Installing NodeJS” section. Once you’re
done with that, open your terminal and install Expo with the following command:
```npm install -g expo-cli```

This will install Expo globally on your computer. Expo will allow you to easily build and run any
React Native app on your phone. Once you’re done with that, cd into the root Clubfinity
directory and run the app by typing the following on your terminal:
```expo start```

Your terminal should update with a generated barcode. In order to run the app on your phone,
you’ll need to install the Expo client app available on Play Store / App store.
* Android: https://play.google.com/store/apps/details?id=host.exp.exponent
* Apple: https://itunes.apple.com/us/app/expo-client/id982107779?mt=8

Once you have installed the expo client on your phone, make sure it is connected to the same
WiFi as your computer. Tap “Scan QR code” and scan the QR code generated by your terminal.
The app will be built on your phone and it will be recompiled every time you make changes
within your code!

**Note for errors on Windows**
If at any time you get an error like “expo command not found” or with any module you
install via npm, you need to add npm’s path to your system’s environment variables. The following steps describe how to do it:
Windows:
- Find out where npm is installed in your local drive. It should be something like:
  ```C:\Users\<USERNAME>\AppData\Roaming\npm```
  _Note that AppData might be hidden so you'll need to set hidden files to visible_

- Copy the path once you have confirmed its installation.
- In your Control Panel, open System Properties, go to Advanced Tab and click on the
  _“Environment Variables”_ button. You can also just type _“system environment variables”_
  in the windows search to get there directly.
- In the bottom half of the dialog you should be able to see System Variables listed. Find
  out if there’s a Path variable, select it and click Edit. If there’s no Path variable click New.
- If there are other paths already in your Path variable, you can click New to add a new one. Just paste the path to your npm installation `(C:\Users\<USERNAME>\AppData\Roaming\npm)` in the field here. Click Ok and now try running your command again in a new terminal. This should be resolved.


### What now?
Now that you’ve successfully done everything that we’ve told you to do so far, all we need now is your credit card number, the expiration date, and the three wacky n- just kidding...

Last thing we need for you to do if you haven’t already is join head over to the issues board on Gitlab which can be found on the sidebar to your left Issues -> Boards and selecting "Development"

This is where you'll find all the tasks and user stories to be completed as well as those that are being tested or have already been integrated! If you'd like to learn more about how to contribute to the repo and our general workflow check out [this](#) guide (Under Construction)
