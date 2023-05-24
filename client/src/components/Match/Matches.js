import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from '../Spinner.js'
import Error from '../Error.js'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Matches = ({ filteredMatches, error }) => {
  // Sort matches by date
  const sortedMatches = filteredMatches.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateA - dateB
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    // Simulate loading data for 2 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 id="profileTitle" className='display-4 mb-4 text-center'>Your Games</h1>
          </Col>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Error error={error} />
          ) : sortedMatches.length ? (
            sortedMatches.map((match) => {
              const {
                home_team,
                away_team,
                season,
                date,
                result,
                competition,
                goalscorers,
                assists,
                yellow_cards,
                red_cards,
                friends,
                photos,
                notes,
                owner,
                id,
              } = match
              return (
                <Col key={id} lg="4" md="6" sm="12" className="match">
                  <Link to={`/match/${id}`}>
                    <Card>
                      <div className="card-image"></div>
                      <Card.Body>
                        <Card.Text>
                          {home_team.name} vs {away_team.name}{' '}
                          <span>{result}</span>{' '}
                          <h4 className="date">{date}</h4>{' '}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })
          ) : (
            <p className="text-center">No matches found.</p>
          )}
        </Row>
      </Container>
    </main>
  )
}

export default Matches







