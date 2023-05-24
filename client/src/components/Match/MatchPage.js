import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { userIsOwner, authenticated } from '../helpers/auth.js'
import Spinner from '../Spinner.js'

const MatchPage = ({ user }) => {
  console.log('matchpage')
  const [match, setMatch] = useState(null)
  const { id } = useParams()

  const navigate = useNavigate()

  console.log('TEST USER', userIsOwner(match))

  useEffect(() => {
    const getData = async () => {
      const { data: matchData } = await authenticated.get(`/api/match/${id}/`)
      console.log('RESPONSE', matchData)
      setMatch(matchData)


    }
    getData()
  }, [id])

  if (!userIsOwner(match)) {
    return <Spinner />
  }

  const { home_team, away_team, season, date, result, competition, goalscorers, assists, yellow_cards, red_cards, friends, photos, notes, owner } = match

  const handleDelete = async () => {
    try {
      console.log('deleted')
      await authenticated.delete(`/api/match/${id}/`)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container>
        <Row className="item-row">
          <Col className='match-title'>
            <h1 id="matchTitle">{home_team.name} vs {away_team.name}</h1>
            <p className='images'><img id="badge"src={home_team.club_image}></img><img id="stadium" src={home_team.stadium_image} alt="Stadium" /><img id="badge"src={away_team.club_image}></img></p>
          </Col>
        </Row>
        <Row className="imageInfoRow">
          <Col md={6}>
            <div style={{ backgroundImage: `url('${home_team.stadium_image}')` }} className="image-pic"></div>
          </Col>
          <Col md={6} className='matchInfo'>
            <div className='matchInfoText'>
              <p id="stadName">{home_team.stadium}</p>
              <h3>Season:<span>{season}</span></h3>
              <h3>Date:<span>{date}</span></h3>
              <h3>Score:<span>{result}</span></h3>
              <h3>Competition:<span>{competition}</span></h3>
              <h3>Goalscorers:<span>{goalscorers}</span></h3>
              <h3>Assists:<span>{assists}</span></h3>
              <h3>Yellow Cards:<span>{yellow_cards}</span></h3>
              <h3>Red Cards:<span>{red_cards}</span></h3>
              <h3>Friends:<span>{friends && (
                <ul>
                  {friends.map((friend) => (
                    <li key={friend.id}>{friend.name}</li>
                  ))}
                </ul>
              )}</span></h3>
              <h3>Notes:</h3>
              <div className='notes'>
                <p id='notes'>{notes}</p>
              </div>
              <br />
            </div>
            {userIsOwner(match) && <div className='editItem'><Link id="edit" to={`/match/${id}/edit`}>Edit Match</Link></div>}
            {userIsOwner(match) && <div><Link className='text-danger' onClick={handleDelete}>Delete Match</Link></div>}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MatchPage