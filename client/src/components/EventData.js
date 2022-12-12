import {useState, useEffect} from 'react'
import axios from 'axios'
import EventFieldData from './EventFieldData'
const EventData = ({gamePlayId, id, name, timestamp, eventfields}) => {
    const [fields, setFields] = useState([])
    const [showFields, setShowFields] = useState(false)
    //var address = 'https://adaptedserver.cyclic.app'
    var address = 'http://localhost:3333'
    const getFields = async () => {
        axios.get(address+"/fields", {params:{id: id}}).then((response)=>{  
        setFields(response.data.sort((a,b) => a.id - b.id))
        })
    }

    useEffect(()=>{
        setFields(eventfields)
    }, [])
    
    return (
    <tr>
        <td className=''>{gamePlayId}</td>
        <td className=''>{id}</td>
        <td className=''>{name}</td>
        <td className=''>{timestamp}</td>
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