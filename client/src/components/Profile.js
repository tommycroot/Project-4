import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { authenticated, getPayload } from './helpers/auth'
import Filters from './Filters'
import Matches from './match/Matches'


const Profile = () => {

  const navigate = useNavigate()
  console.log('PROFILE PAGE')

  const [matches, setMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [error, setError] = useState('')
  

  useEffect(() => {
    const getInfo = async () => {
      try {
        console.log('PAYLOAD', getPayload())
        const { data } = await authenticated.get('/api/match/')
        console.log('response', data)
        setMatches(data)
      } catch (error) {
        setError(error)
      }
    }
    getInfo()
  }, [])
  
  console.log(matches)
  
  
  return (
    <main className="container">
      {/* Filters section */}
      <Filters matches={matches} setFilteredMatches={setFilteredMatches} error={error} setError={setError} />
      {/* Matches List */}
      <Matches filteredMatches={filteredMatches} error={error} setError={setError}/>
    </main>
  )
}

export default Profile