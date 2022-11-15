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
const PORT = process.env.PORT || 4444;
const ADDRESS = process.env.ADDRESS || 'http://localhost' 



  
async function handleGameData(data){
    var notMissing = (data.collection!=undefined && data.name!=undefined 
                    && data.value!=undefined && data.type != undefined)
    if(notMissing){
        const collection = data.collection
        const gameData = {name: data.name, value: data.value, type: data.type }
        await db.collection(collection).add(gameData)
    }
    return notMissing
}

async function handleUserRegister(data){
    var notMissing = (data.email != undefined && data.name != undefined 
                    && data.teacher != undefined && data.password != undefined)
    if(notMissing){
        const user = {email: data.email, name: data.name, teacher: data.teacher}
        const pw = data.password
        createUser(user.email, pw)
        await db.collection("Users").add(user)
    }
    return notMissing
}

function createUser(email, pw){
    auth.createUserWithEmailAndPassword(email, pw)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user registered, ",user.email)
    })
    .catch((error) => {console.log(error)})
}

async function handleUserLogin(data){
    var notMissing = (data.email != undefined && data.password != undefined)
    if(notMissing){
        login(data.email, data.password)
    }
    return notMissing
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

async function filterUser(email){
    const snapshot = await db.collection("Users").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    console.log(list)
    const userl = list.filter(user => user.email === email)
    return userl[0].teacher
}


export {handleGameData, handleUserRegister, handleUserLogin}