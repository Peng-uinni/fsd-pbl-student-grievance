# Student Grievance Management System

## Prototype
Branch to test out changes and mess with the code a bit

Well that aged like milk
This is now the main project branch 
Don't tell Shamitha 

## Running the App
I am aware that there are 3 package.json files...is that normal...tbh idk but run npm install on all of them

### Client App
Do the following steps to run the front side of the app

```
cd client 
npm install 
npm run dev
```

### Backend Server
Do the folowing for the backend 

IMPORTANT: Make sure to have mongodb installed locally, I don't plan on using Atlas

Make a .env file in the project root directory and add the following keys
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/<DBNAME GOES HERE>
JWT_SECRET=<ANY KEY WILL DO>
JWT_EXPIRES_IN=<THIS DOESN"T MATTER BUT PUT A NUMBER>
```
Don't change the port number...it doesn't like that (maybe I'll fix it maybe I won't)
Add the other stuff as you need its local so it doesn't matter 

After making the .env file do the following
```
cd server
npm install
node ./server.js
```