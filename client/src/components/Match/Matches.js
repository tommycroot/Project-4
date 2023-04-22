import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'

const Matches = ({ filteredMatches }) => {
  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 className='display-4 mb-4 text-center'>Your Games</h1>
          </Col>
          {
            filteredMatches.length ? filteredMatches.map(match => {
              const { home_team, away_team, season, date, result, competition, goalscorers, assists, yellow_cards, red_cards, friends, photos, notes, owner, id } = match
              return (
                <Col key={id} lg="4" md="6" sm="12" className='match'>
                  <Link to={`/match/${id}`}>
                    <Card>
                      <div className="card-image" ></div>
                      <Card.Body>
                        <Card.Text>{home_team.name} vs {away_team.name} <span id="date">{date}</span> {result}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            }) : <p>No matches found</p>
          }
        </Row>
      </Container>
    </main>
  )
}

export default Matches