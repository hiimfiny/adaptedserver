import firebaseApp from "./config.js";

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const PORT = process.env.PORT || 4444;
const ADDRESS = process.env.ADDRESS || 'http://localhost' 


async function handleEventData(data){
    var datatype = data.collection
    if(datatype!=undefined)
        switch(datatype){
            case "eventData":
                const eventData=formatEventData(data)
                if(checkEventData(eventData)){
                    await db.collection(datatype).add(eventData)
                    return true
                }
            break

            case "eventFieldData":
                const eventFieldData=formatEventFieldData(data)
                if(checkEventFieldData(eventFieldData)){
                    await db.collection(datatype).add(eventFieldData)
                    return true
                } 
            break
        }
    return false
}

function checkEventFieldData(eventFieldData){
    return (eventFieldData.id!=undefined && eventFieldData.name!=undefined && eventFieldData.value!=undefined && eventFieldData.type!=undefined && eventFieldData.eventId!=undefined)
}

function checkEventData(eventData){
    return (eventData.id!=undefined && eventData.name!=undefined && eventData.timestamp!=undefined && eventData.gamePlayId!=undefined)
}

function formatEventFieldData(data){
    return {id: data.id, name: data.name, value: data.value, type: data.type, eventId: data.eventId}
}
function formatEventData(data){
    var eventData = {id: data.id, name: data.name, timestamp: data.timestamp, gamePlayId: data.gamePlayId}
    if(data.fields!=undefined)
        eventData.fields = data.fields
    return eventData
}
async function handleUserRegister(data){
    var notMissing = (data.email != undefined && data.name != undefined 
                    && data.teacher != undefined && data.password != undefined)
    if(notMissing){
        const user = {email: data.email, name: data.name, teacher: data.teacher}
        const pw = data.password
        if(await createUser(user.email, pw)) await db.collection("Users").add(user)
    }
    return notMissing
}

async function createUser(email, pw){
    var success = true
    await auth.createUserWithEmailAndPassword(email, pw)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("user registered, ",user.email)
    })
    .catch((error) => {
        success = false 
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
    console.log(success)
    return success
}

function handleUserLogin(data){
    if(data.email != (undefined || '') && data.password != (undefined || '')){
        login(data.email, data.password)
        return true
        
    }
    
    
}
  
 function login(email, pw){
    var success=false
    auth.signInWithEmailAndPassword(email, pw)
    .then((userCredential) => {
        success = true
      const user = userCredential.user
      console.log("logged in, ", user.email)
      return success
      
    })
    .catch((error) => {
        var code = error.code
        switch(code){
            case "auth/wrong-password":
                console.log("Wrong password!")
                break;
            case "auth/user-not-found":
                console.log("Wrong email address!")
                break;
            default:
                console.log(error)
        }
    }).finally(()=>{
        console.log("finally "+success)
        return success
    })
    
    
}

async function filterUser(email){
    const snapshot = await db.collection("Users").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const userl = list.filter(user => user.email === email)
    return (userl.length!=0 ? userl[0].teacher : false)
}

async function returnFields(id){
    const snapshot = await db.collection("eventFieldData").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
    const fieldlist = list.filter(field => field.eventId == id)
    return fieldlist
    
}


export {handleEventData, handleUserRegister, handleUserLogin, returnFields}