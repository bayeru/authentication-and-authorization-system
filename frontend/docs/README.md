## Getting started

> This is a full-stack app built with React, MongoDB and TypeScript, and it features sign-in and sign-up pages. Once registered, users can log in to access a secure dashboard page.

## Installing prerequisite tools

Before you start, you need to install the following tools.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [VS Code](https://code.visualstudio.com/) (Optional)
- [Docker Desktop](https://www.docker.com/) (Optional)

## Installing the app

To install the app:

- Unzip the source code to wherever directory you want.
- Open the source code directory with VS Code.
- Open a terminal window and run the following command to install the necessary dependencies.

```shell
npm install
```

## Directory structure

- The app has two main directories, one for the front-end (client) and the other for the back-end (server). Each app needs to be run separately.
- Before you run the front-end and back-end apps, you should add your environment variables.

## Creating a MongoDB database

- Please follow this video tutorial to create a MongoDB database using MongoDB Atlas:

[MongoDB Atlas Tutorial](https://youtu.be/084rmLU1UgA?t=38)

- Note down your username, password and mongodb connection string. (You will add this to environment variables.)

## Creating a Sendgrid account

- Please follow this video tutorial to create a Sendgrid account.

[Sendgrid Tutorial](https://youtu.be/fEobqi3N7zw?t=31)

- Note down your Sendgrip API key and sender email

## Backend environment variables

- The app requires certain environment variables both for back-end and front-end.
- Open the .env file in the backend directory and edit the environment variables according to your setup.

```ini
# Default client url
CLIENT_URL="http://localhost:3000"

# Server port
PORT=8000

# MongoDB database uri (Replace with your connection string)
MONGO_URI="mongodb+srv://yourUsername:yourPassword@cluster0..."

# Secret key for the jwt
JWT_SECRET="secret123"

# Your sendgrid api key to send emails.
SENDGRID_API_KEY="SG.YourAPIKey"

# The email that you want to use to send email.
SENDGRID_SENDER_EMAIL="Your Company <no-reply@yourdomain.com>"
```

## Frontend environment variables

- The frontend has a single environment variable. It doesn't need to be edited if you didn't change the backend port.

```ini
REACT_APP_BACKEND_URL="http://localhost:8000"
```

## Running backend for development

To run the backend app in development mode:

1. Open a terminal window and go into the backend directory.
2. Run the following command.

```shell
npm run start:dev
```

## Running frontend for development

To run the frontend app in development mode:

Open a terminal window and go into the frontend directory, then run the following
command.

```shell
npm run start:dev
```

## Accessing the app

After you run the backend and frontend apps. Open a browser window and navigate to
[http://localhost:3000](http://localhost:3000)

## Building backend for deployment

Like you've run the backend and frontend separately, the app needs to be build and deployed separately.

Please follow these steps to build the app.

- Open a new terminal window and go into the backend directory.
- Run the following command. This command will generate a `./dist` directory under the backend directory.

```shell
npm run build
```

- Copy `./dist` and `./node_modules` folders to your server.
- Now, you can run the backend app by starting the server using the following command.

```shell
node ./dist/index.js
```


## Building frontend for deployment

To build the frontend app for deployment:

- Open a new terminal window and go into the frontend directory.
- Run the following command. This command will generate a `./build` directory under the frontend directory.

```shell
npm run build
```

- Unlike backend, the frontend needs a server to be served. You can use a server such as Nginx.
- See the following page for general instructions to deploy react apps. [Create React App Deployment](https://create-react-app.dev/docs/deployment/)

## Running with Docker

- Both frontend and backend come with Dockerfiles, you can use the following command to build and deploy docker containers.
- Go into the backend directory and run the following commands in order. Make sure the docker service is running before running these commands.

```shell
npm run docker:build
npm run docker:run
```

- Do the same for the frontend, go into the frontend directory and run the following commands.

```shell
npm run docker:build
npm run docker:run
```