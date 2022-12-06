import React from 'react'

const EventFieldData = ({name, type, value, id}) => {
  return (
    <tr>
        <td className=''>{name}</td>
        <td className=''>{type}</td>
        <td className=''>{value}</td>
        <td className=''>{id}</td>
    </tr>
  )
}

export default EventFieldData