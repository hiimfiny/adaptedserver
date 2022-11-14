import express, { json } from "express";
import cors from "cors";
import firebaseApp from "./config.js";
import path from 'path';
import {fileURLToPath} from 'url';


const db = firebaseApp.firestore()
const User = db.collection("Users")
const Game1 = {collection: db.collection("Game1"), name:"game1"}
const Game2 = db.collection("Game2")

const auth = firebaseApp.auth()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3333;

const app = express();
app.use(json());
app.use(cors());

app.listen(PORT,() => {
  console.log('Server Started')
  filterUser()
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
/*
User{
  name
  email
  teacher(?)
}

EventDataModel
@PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val timestamp: Long,
    var gamePlayId: Long = 0,
    @Ignore
    var fields: List<EventFieldDataModel>

EventFieldData
@PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val value: String,
    val type: String,
    var eventId: Long = 0
*/
app.post("/game2/create", async (req, res) => {
  const data = req.body;
  console.log(req.body)
  await Game2.add({ data });
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
async function filterUser(){
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list)
}

function postData(collection,entity){
  console.log(`/${collection.name}/create`)
  collection.collection.add({ entity });
  app.post(`/game1/create`, async(req,res)=>{
    
    //const data = req.body;
    console.log(req.body.point)
    await 
    res.send({ msg: "Game Data added" });
  })
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
  await createUser(data.email, data.password)
  res.send({ msg: "User Registered" });
});

app.post("/login", async (req, res) => {
  const data = req.body;
  await login(data.email, data.password)
  res.send({ msg: "User Logged in" });
});

function createUser(email, pw){
  auth.createUserWithEmailAndPassword(email, pw)
  .then((userCredential) => {
      const user = userCredential.user;
      console.log("user registered, ",user.email);
  })
    .catch((error) => {
    console.log(error);
  });
}

function login(email, pw){
  auth.signInWithEmailAndPassword(email, pw)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("logged in, ", user.email)
  })
  .catch((error) => {
    console.log(error)
  });

}