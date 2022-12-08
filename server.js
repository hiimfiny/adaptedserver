import express from "express";
import cors from "cors";
import firebaseApp from "./config.js";
import * as dbfun from "./database.js"


const db = firebaseApp.firestore()
const User = db.collection("Users")

const PORT = process.env.PORT || 3333;
const ADDRESS = process.env.ADDRESS || 'http://localhost' 
const app = express();
app.use(express.json());
app.use(cors());
//app.use(express.static(__dirname))


app.listen(PORT,() => {
  console.log('Server Started')
  console.log(ADDRESS, PORT)
  
})

app.get("/", async (req, res) => {
  const snapshot = await db.collection("eventData").get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list)
  
  
});

app.get("/search", async (req,res)=>{
  const name = req.query.filterName
  const snapshot = await db.collection("eventData").get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  var filtered = []
  list.forEach(event => {
    console.log(event.name)
    if(event.name.match(name)){
      filtered.push(event)
    }
  })
  console.log(filtered)
  res.send(filtered)
})

app.get("/fields", async (req, res)=>{
  const id = req.query.id
  const snapshot = await db.collection("eventFieldData").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
    const fieldlist = list.filter(field => field.eventId == id)
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
  const data = req.body
  var success = await dbfun.handleUserRegister(data)
  res.send({ msg: (success) ? "User registered" : "Missing Data" })
});

app.post("/login", async (req, res) => {
  const data = req.body;
  var success = await dbfun.handleUserLogin(data)
  res.send({ msg: (success) ? "User logged in" : "Missing Data" })
});

