import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { authenticated, getPayload } from './helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const Profile = () => {

  const navigate = useNavigate()
  console.log('PROFILE PAGE')

  const [matches, setMatches] = useState(null)
  const [clubs, setClubs] = useState(null)

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

  useEffect(() => {
    const getClubs = async () => {
      try {
        const { data } = await authenticated.get('/api/club/')
        setClubs(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getClubs()
  }, [])

  const getClubName = (id) => {
    const club = clubs && clubs.find(club => club.id === id)
    return club ? club.name : ''
  }

  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 className='display-4 mb-4 text-center'>Your Games</h1>
          </Col>
          {
            matches && matches.map(match => {
              const { home_team, away_team, season, date, result, competition, goalscorers, assists, yellow_cards, red_cards, friends, photos, notes, owner, id } = match
              const home_team_name = getClubName(home_team)
              const away_team_name = getClubName(away_team)
              return (
                <Col key={id} lg="4" md="6" sm="12" className='match'>
                  <Link to={`/match/${id}`}>
                    <Card>
                      <div className="card-image" ></div>
                      <Card.Body>
                        <Card.Text>{home_team_name} vs {away_team_name} <span id="date">{date}</span> {result}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </main>
  )
}

export default Profile