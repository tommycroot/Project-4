import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { authenticated, getPayload } from './helpers/auth'
import Filters from './Filters'
import Matches from './Match/Matches'


const Profile = () => {

  const navigate = useNavigate()
  console.log('PROFILE PAGE')

  const [matches, setMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  

  useEffect(() => {
    const getInfo = async () => {
      try {
        console.log('PAYLOAD', getPayload())
        const { data } = await authenticated.get('/api/match/')
        console.log('response', data)
        setMatches(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getInfo()
  }, [])
  
  console.log(matches)
  
  return (
    <main className="container">
      {/* Filters section */}
      <Filters matches={matches} setFilteredMatches={setFilteredMatches} />
      {/* Matches List */}
      <Matches filteredMatches={filteredMatches} />
    </main>
  )
}

export default Profile