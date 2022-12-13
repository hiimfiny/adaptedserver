import {useState, useEffect} from 'react'
import axios from 'axios'
import EventFieldData from './EventFieldData'
const EventData = ({gamePlayId, id, name, timestamp, eventfields}) => {
    const [fields, setFields] = useState([])
    const [showFields, setShowFields] = useState(false)

    useEffect(()=>{
        setFields(eventfields)
    }, [])
    
    return (
    <tr>
        <td className='gameplay'>{gamePlayId}</td>
        <td className='id'>{id}</td>
        <td className='name'>{name}</td>
        <td className='time'>{timestamp}</td>
        <td className=''>
            <button onClick={()=>setShowFields(!showFields)}>fields</button>
            {showFields && <div>
            <thead>
                <th>name</th>
                <th>type</th>
                <th>value</th>
                <th>id</th>
            </thead>
            {fields.map(field=>(
                <tbody key={field.id}>
                    <EventFieldData 
                    name={field.name} 
                    type={field.type} 
                    value={field.value}
                    id={field.id}/>
                </tbody>
            ))}
            </div>}
        </td>
    </tr>
  )
}

export default EventData