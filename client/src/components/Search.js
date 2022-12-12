import {useState} from 'react'

const Search = ({filter}) => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [gameplayId, setGameplayId] = useState('')

    function filterData(){
        const params={
            filterName: name,
            filterId: id,
            filterGameplayId: gameplayId,
            
        }
        console.log(params)
        filter(params)
    }
  return (
    <div>
        <h2>Search:</h2>
        <div className="searchdiv">
        <label for="name">GameplayId</label>
        <input type='text' id="name" placeholder='' onChange={(e) => setGameplayId(e.target.value)}/>
        <label for="name">Id</label>
        <input type='text' style={{width: '100px'}} id="name" placeholder='' onChange={(e) => setId(e.target.value)}/>
        <label for="name">Name</label>
        <input type='text' id="name" placeholder='' onChange={(e) => setName(e.target.value)}/>
        <button className='registerbtn' onClick={()=>{filterData()}}>Search</button>
        </div>
        
       
        
    </div>
  )
}

export default Search