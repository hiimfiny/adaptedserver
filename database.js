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
import axios from 'axios'
import firebaseApp from "./config.js";
const auth = firebaseApp.auth()
const db = firebaseApp.firestore()

async function filterUser(email){
    const snapshot = await db.collection("Users").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const userl = list.filter(user => user.data.email === email)
    return userl[0].data.teacher
  }
  
async function postData(collection,entity){
  
try{
    const response = await axios.post(`http://localhost:3333/${collection.name}/create`, entity)
    }catch(error){console.log(error)}
    
    
}

function createUser(email, pw){
    auth.createUserWithEmailAndPassword(email, pw)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user registered, ",user.email)
    })
      .catch((error) => {
      console.log(error)
    });
  }
  
  async function login(email, pw){
    auth.signInWithEmailAndPassword(email, pw)
    .then((userCredential) => {
      const user = userCredential.user
      console.log("logged in, ", user.email)
    })
    .catch((error) => {
      console.log(error)
    });

    var teach = await filterUser(email)
    console.log(teach ? 'teacher' : 'not teacher')
  }

  export {postData, createUser, login}