import express from "express";
import cors from "cors";
import firebaseApp from "./config.js";
import * as dbfun from "./database.js"

const db = firebaseApp.firestore()
const User = db.collection("Users")

var eventDataDB
var eventDataList
var eventFieldDataDB
var eventFieldDataList
var eventDB
var eventList

const PORT = process.env.PORT || 3333;
const ADDRESS = process.env.ADDRESS || 'http://localhost' 
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT,() => {
  console.log('Server Started')
  console.log(ADDRESS, PORT)
})

app.get("/getdata", async (req, res) => {
  console.log("a")
  // eventDataDB = await db.collection("eventDataTest").get()
  // eventDataList=eventDataDB.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // eventFieldDataDB = await db.collection("eventFieldDataTest").get()
  // eventFieldDataList = eventFieldDataDB.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // eventDataList.sort((a,b) => a.id - b.id)
  eventDB = await db.collection("eventDataWhole").get()
  eventList=eventDB.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  eventList.sort((a,b) => a.id - b.id)
  //console.log(eventDataDB.docs)
  //res.send({data:eventDataList, field:eventFieldDataList})
  res.send(eventList)
  
});

app.get("/search", async (req,res)=>{
  const gamePlayId = req.query.filterGameplayId
  const id = req.query.filterId
  const name = req.query.filterName
  
  var filtered = []
  eventList.forEach(event => {
    if(event.name.match(name) && event.gamePlayId.toString().match(gamePlayId) && event.id.toString().match(id)){
      filtered.push(event)
    }
  })
  res.send(filtered)
})

app.get("/fields", async (req, res)=>{
  const id = req.query.id
    const fieldlist = eventFieldDataList.filter(field => field.eventId == id)
  res.send(fieldlist)
})

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "User Added" });
});

app.post("/addeventdata", async (req, res) => {
  const data = req.body
  var success = await dbfun.handleEventData(data)
  console.log(success)
  res.send({ msg: (success) ? "Data added" : "Missing Data" })
});
app.post("/adddata", async (req, res) => {
  const data = req.body
  await dbfun.handleData(data)
  res.send("Data added")
});

app.post("/register", async (req, res) => {
  const data = req.body
  var success = await dbfun.handleUserRegister(data)
  res.send({ msg: (success) ? "User registered" : "Missing Data" })
});

app.post("/login", async (req, res) => {
  const data = req.body;
  var success = await dbfun.handleUserLogin(data)
  res.send({ msg: (success) ? "User logged in" : "Missing Data" })
});

const  refreshDB = async() =>{
  eventDataDB = await db.collection("eventDataTest").get()
  eventDataList=eventDataDB.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  eventFieldDataDB = await db.collection("eventFieldDataTest").get()
  eventFieldDataList = eventFieldDataDB.docs.map((doc) => ({ id: doc.id, ...doc.data() }));}

