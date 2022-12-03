import React, { useState,useEffect } from 'react'
import axios from 'axios'
import EventData from './EventData'

const TeacherPage = () => {

    const [eventDataList, setEventDataList] = useState([])
    const getList = () =>{
        axios.get("http://localhost:3333/").then((response)=>{
            setEventDataList(response.data)
        })
    }
    useEffect(()=>{
        getList()
    }, [])
  return (
    <div>
        <h2>EventData</h2>
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
                timestamp={eventData.timestamp}
                fields={eventData.fields}/>
            </tbody>
        ))}
        </table>
    </div>
  )
}

export default TeacherPage