import React from 'react'

const EventData = ({gamePlayId, id, name, timestamp, fields}) => {
    console.log(fields)
  
    return (
    <tr>
        <td className=''>{gamePlayId}</td>
        <td className=''>{id}</td>
        <td className=''>{name}</td>
        <td className=''>{timestamp}</td>
        <td className=''>
            {fields}
        </td>
    </tr>
  )
}

export default EventData