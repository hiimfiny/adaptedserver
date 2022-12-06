import {useState, useEffect} from 'react'
import axios from 'axios'
import EventFieldData from './EventFieldData'
const EventData = ({gamePlayId, id, name, timestamp}) => {
    const [fields, setFields] = useState([])
    const [showFields, setShowFields] = useState(false)
    const getFields = async () => {
        axios.get("https://shy-pear-gecko-vest.cyclic.app/fields", {params:{id: id}}).then((response)=>{  
        setFields(response.data.sort((a,b) => a.id - b.id))
        })
    }

    useEffect(()=>{
        getFields()
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