import firebaseApp from "./config.js";

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
var eventDataDB = await db.collection("eventDataTest").get();
var eventFieldDataDB = await db.collection("eventFieldDataTest").get()
async function handleData(data){
    //console.log(data.gamePlaySession[0].eventDataModel[0])
    
    data.gamePlaySession.forEach(gamePlaySession => {
        gamePlaySession.eventDataModel.forEach(eventDataModel=>{
            handleEventData(eventDataModel)
        })
        
    });

}
async function handleEventData(data){
    let fieldIdList = getFieldIds(data)
    handleEventFieldData(data.fields)
    let eventdata=formatEventData(data,fieldIdList)
    db.collection("eventDataTest").add(eventdata)

}
async function handleEventFieldData(data){
    data.forEach(field => {
        console.log(field)
        db.collection("eventFieldDataTest").add(field)
    });
}

function checkEventFieldData(eventFieldData){
    return (eventFieldData.id!=undefined && eventFieldData.name!=undefined && eventFieldData.value!=undefined && eventFieldData.type!=undefined && eventFieldData.eventId!=undefined)
}

function checkEventData(eventData){
    return (eventData.id!=undefined && eventData.name!=undefined && eventData.timestamp!=undefined && eventData.gamePlayId!=undefined)
}


function formatEventData(data, fieldlist){
    return {
        id: data.id, 
        name: data.name, 
        timestamp: data.timestamp, 
        gamePlayId: data.gamePlayId,
        fields: fieldlist
    }
}
function getFieldIds(data){
    let eventIdList = []
    data.fields.forEach(field => {
        eventIdList.push(field.id)
    });
    return eventIdList
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

async function handleUserLogin(data){

    if(data.email != (undefined || '') && data.password != (undefined || '')){
        var s
        s = await login(data.email, data.password)
        console.log("login " + s)
        return true
        
    }
    
    
}

 async function login(email, pw){
    var success=true
    auth.signInWithEmailAndPassword(email, pw)
    .then((userCredential) => {
      const user = userCredential.user
      console.log("logged in, ", user.email)
      //return success
      
    })
    .catch((error) => {
        success=false
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
    })
    
    
    console.log("end "+success)
    return success
}

async function filterUser(email){
    const snapshot = await db.collection("Users").get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const userl = list.filter(user => user.email === email)
    return (userl.length!=0 ? userl[0].teacher : false)
}

async function returnFields(id){
    //const snapshot = await db.collection("eventFieldData").get()
    const list = eventFieldDataDB.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
    const fieldlist = list.filter(field => field.eventId == id)
    return fieldlist
    
}


export {handleData, handleEventData, handleUserRegister, handleUserLogin, returnFields}