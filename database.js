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
        if(createUser(user.email, pw))
            await db.collection("Users").add(user)
    }
    return notMissing
}

function createUser(email, pw){
    var success = false

    auth.createUserWithEmailAndPassword(email, pw)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user registered, ",user.email)
        success = true
    })
    .catch((error) => {
        
        var code = error.code
        switch(code){
            case "auth/email-already-in-use":
                //alert("The email address is already in use!")
                console.log("The email address is already in use!")
                break;
            default:
                console.log(error)
        }
    })
    return success
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
        var code = error.code
        switch(code){
            case "auth/wrong-password":
                //alert("Wrong password!")
                console.log("Wrong password!")
                break;
            case "auth/user-not-found":
                //alert("Wrong email address!")
                console.log("Wrong email address!")
                break;
            default:
                console.log(error)
        }
    });
    var teach = await filterUser(email)
      console.log(teach ? 'teacher' : 'not teacher')
      
    
}

async function filterUser(email){
    const snapshot = await db.collection("Users").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const userl = list.filter(user => user.email === email)
    return (userl.length!=0 ? userl[0].teacher : false)
}


export {handleGameData, handleUserRegister, handleUserLogin}