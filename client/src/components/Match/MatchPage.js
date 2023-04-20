import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { userIsOwner, authenticated } from '../helpers/auth.js'

const MatchPage = ({ user }) => {
  console.log('matchpage')
  const [match, setMatch] = useState(null)
  const [homeTeam, setHomeTeam] = useState(null)
  const [awayTeam, setAwayTeam] = useState(null)
  const { id } = useParams()

  const navigate = useNavigate()

  console.log('TEST USER', userIsOwner(match))

  useEffect(() => {
    const getData = async () => {
      const { data: matchData } = await authenticated.get(`/api/match/${id}/`)
      console.log('RESPONSE', matchData)
      setMatch(matchData)

      const { data: homeTeamData } = await authenticated.get(`/api/club/${matchData.home_team}/`)
      console.log('home team', homeTeamData)
      setHomeTeam(homeTeamData)

      const { data: awayTeamData } = await authenticated.get(`/api/club/${matchData.away_team}/`)
      setAwayTeam(awayTeamData)
      console.log('away team', awayTeamData)
    }
    getData()
  }, [id])

  if (!userIsOwner(match)) {
    return <p>You are not authorized to view this match.</p>
  }

  if (!match || !homeTeam || !awayTeam) {
    return <p>Loading...</p>
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
            <h1>{homeTeam.name} vs {awayTeam.name}</h1>
          </Col>
        </Row>
        <Row className="imageInfoRow">
          <Col md={6}>
            <div style={{ backgroundImage: `url('${home_team.stadium_image}')` }} className="image-pic"></div>
          </Col>
          <Col md={6} className='matchInfo'>
            <div className='matchInfoText'>
              <h3><span>Season:</span></h3> <p>{season}</p>
              <h3><span>Score:</span></h3> <p>{result}</p>
              <h3><span>Competition:</span></h3> <p>{competition}</p>
              <h3><span>Goalscorers:</span></h3> <p>{goalscorers}</p>
              <h3><span>Assists:</span></h3> <p>{assists}</p>
              <h3><span>Yellow Cards:</span></h3> <p>{yellow_cards}</p>
              <h3><span>Red Cards:</span></h3> <p>{red_cards}</p>
              <h3><span>Notes:</span></h3> <p>{notes}</p>
              {/* <h3><span>Profile:</span></h3>  <p> <Link to = {`api/profile/${owner.id}`} >{owner.username}</Link> </p> */}
            </div>
            {userIsOwner(match) && <div><Link to={`/match/${id}/edit`} className='editItem'>Edit Match</Link></div>}
            {userIsOwner(match) && <div><Link className='deleteItem' onClick={handleDelete}>Delete Match</Link></div>}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MatchPage