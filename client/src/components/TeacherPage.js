import React, { useState,useEffect } from 'react'
import axios from 'axios'
import EventData from './EventData'

const TeacherPage = () => {

    const [eventDataList, setEventDataList] = useState([])
    const [filterName, setFilterName] = useState('')
    const getList = () =>{
        axios.get("https://adaptedserver.cyclic.app/").then((response)=>{
            setEventDataList(response.data)
        })
    }
    useEffect(()=>{
        getList()
    }, [])

    const formatDate = (timestamp)=>{
        var date = new Date(timestamp)
        return date.toUTCString()

    }

    const filterData = () => {
        axios.get("https://adaptedserver.cyclic.app/search", {params:{filterName: filterName}}).then((response)=>{
            setEventDataList(response.data)
        })
    }
  return (
    <div>
        <h2>EventData</h2>
            <label>Search:</label>
            <input type='text' placeholder='' onChange={(e) => setFilterName(e.target.value)}/>
            <button onClick={()=>{filterData()}}>Search</button>
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
                timestamp={formatDate(eventData.timestamp)}/>
            </tbody>
        ))}
        </table>
    </div>
  )
}

export default TeacherPage