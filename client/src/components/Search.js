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
        filter(params)
    }
    function clearData(){
        setName('')
        setId('')
        setGameplayId('')
        document.getElementById('gameplay').value=''
        document.getElementById('id').value=''
        document.getElementById('name').value=''
        const params={
            filterName: '',
            filterId: '',
            filterGameplayId: '',
            
        }
        filter(params)
    }
  return (
    <div>
        <div className="searchdiv">
            <label for="gameplay">GameplayId</label>
            <input type='text' id="gameplay" placeholder='' onChange={(e) => setGameplayId(e.target.value)}/>
            
            <label for="id">Id</label>
            <input type='text' style={{width: '100px'}} id="id" placeholder='' onChange={(e) => setId(e.target.value)}/>
            
            <label for="name">Name</label>
            <input type='text' id="name" placeholder='' onChange={(e) => setName(e.target.value)}/>
            
            <button className='registerbtn' onClick={()=>{filterData()}}>Search</button>
            <button className='registerbtn' onClick={()=>{clearData();}}>Clear</button>
        </div>
    </div>
  )
}

export default Search