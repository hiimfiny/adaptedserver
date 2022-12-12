import React, { useState,useEffect } from 'react'
import axios from 'axios'
import EventData from './EventData'
import Search from './Search'

const TeacherPage = () => {

    const [eventDataList, setEventDataList] = useState([])
    const [eventDataFieldList, setEventDataFieldList] = useState([])
    
    //var address = 'https://adaptedserver.cyclic.app'
    var address = 'http://localhost:3333'
    const getList = () =>{
        axios.get(address+"/").then((response)=>{
            console.log(response.data)
            setEventDataList(response.data)
            //setEventDataFieldList(response.data.field)
        })
    }
    useEffect(()=>{
        console.log('i fire once');
        getList()
        //filterFields(6966)
    }, [])

    const formatDate = (timestamp)=>{
        var date = new Date(timestamp)
        return date.toUTCString()

    }

    const filterData = (searchparams) => {
        console.log(searchparams)
        axios.get(address+"/search", {params:searchparams}).then((response)=>{
            setEventDataList(response.data)
        })
    }
    const filterFields = (id) =>{ 
        return eventDataFieldList
        .filter(field => field.eventId == id)
        .sort((a,b) => a.id - b.id)
    }
  return (
    <div>
        <Search filter = {filterData}/>
        <table>
            <thead>
                <th>gamePlayId</th>
                <th>id</th>
                <th>name</th>
                <th>timestamp</th>
                <th>fields</th>
            </thead>
        {eventDataList.map(eventData=>(
            <tbody key={eventData.id}>
                <EventData 
                gamePlayId={eventData.gamePlayId} 
                id={eventData.id}
                name={eventData.name}
                timestamp={formatDate(eventData.timestamp)}
                //eventfields={filterFields(eventData.id)}
                eventfields={eventData.fields}/>
            </tbody>
        ))}
        </table>
    </div>
  )
}

export default TeacherPage