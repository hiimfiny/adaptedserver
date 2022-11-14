import express, { json, response } from "express";
import cors from "cors";
import firebaseApp from "./config.js";
import path from 'path';
import {fileURLToPath} from 'url';
import * as dbfun from "./database.js"

const db = firebaseApp.firestore()
const User = db.collection("Users")
const Game1 = {collection: db.collection("Game1"), name:"game1"}
const Game2 = db.collection("Game2")


const auth = firebaseApp.auth()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3333;
const ADDRESS = process.env.ADDRESS || 'http://localhost' 
const app = express();
app.use(json());
app.use(cors());

app.listen(PORT,() => {
  console.log('Server Started')
  console.log(ADDRESS, PORT)
  //dbfun.postData(Game1,{name: "Test5", point:"123", time:"23"})
})

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
  res.sendFile('index.html', { root: __dirname });
  
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "User Added" });
});

app.post("/game1/create", async (req, res) => {
  const data = req.body;
  console.log(req.body)
  await Game1.collection.add({ data });
  res.send({ msg: "Game Data added" });
});

function formatUserData(data){
  var returnData = {
    email: data.email,
    name: data.name,
    password: data.password,
    teacher: data.teacher
  }
  return returnData
}


app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});


app.post("/register", async (req, res) => {
  console.log(req.body)
  const data = formatUserData(req.body);
  console.log(data)
  User.add({data})
  await dbfun.createUser(data.email, data.password)
  res.send({ msg: "User Registered" });
});

app.post("/login", async (req, res) => {
  const data = req.body;
  await dbfun.login(data.email, data.password)
  res.send({ msg: "User Logged in" });
});

