import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Filters = ({ matches, setFilteredMatches }) => {

  const [filters, setFilters] = useState({
    season: 'All',
    search: '',
    homeTeam: 'All',
    awayTeam: 'All',
    friendName: 'All',
  })

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilters)
  }

  useEffect(() => {
    const regex = new RegExp(filters.search, 'i')
    const newFilteredMatches = matches.filter(match => {
      return regex.test(match.date) &&
        (match.season === filters.season || filters.season === 'All') &&
        (match.home_team.name === filters.homeTeam || filters.homeTeam === 'All') &&
        (match.away_team.name === filters.awayTeam || filters.awayTeam === 'All') &&
        (filters.friendName === 'All' ||
          match.friends.some((friend) => friend.name === filters.friendName))

    }).sort((a, b) => a.date > b.date ? 1 : -1)
    setFilteredMatches(newFilteredMatches)
  }, [filters, matches])

  const homeTeamNames = [...new Set(matches.map(match => match.home_team.name))].sort()
  homeTeamNames.unshift('All')

  const awayTeamNames = [...new Set(matches.map(match => match.away_team.name))].sort()
  awayTeamNames.unshift('All')

  const friendNames = [...new Set(matches.flatMap((match) => match.friends.map((friend) => friend.name)))].sort()
  friendNames.unshift('All')
  return (
    <Container>
      <Row>
        <Col md={6} className='text-center'>
          <section className="filters">
            {/* Season dropdown */}
            <div>
              <p id="filter">Season</p>
              <select id="select" name="season" value={filters.season} onChange={handleChange}>
                <option value="All">All</option>
                {matches &&
                  [...new Set(matches.map(match => match.season))].sort().map(season => {
                    return <option key={season} value={season}>{season}</option>
                  })}
              </select> 
            </div>

            {/* Home team dropdown */}
            <div>
              <p id="filter">Home Team</p>
              <select id="select" name="homeTeam" value={filters.homeTeam} onChange={handleChange}>
                {homeTeamNames.map((teamName) => (
                  <option key={teamName} value={teamName}>{teamName}</option>
                ))}
              </select>
            </div>


            {/* Away team dropdown */}
            <div>
              <p id="filter">Away Team</p>
              <select id="select" name="awayTeam" value={filters.awayTeam} onChange={handleChange}>
                {awayTeamNames.map((teamName) => (
                  <option key={teamName} value={teamName}>{teamName}</option>
                ))}
              </select>
            </div>

            {/* Friend's name dropdown */}
            <div>
              <p id="filter">Friends</p>
              <select id="select" name="friendName" value={filters.friendName} onChange={handleChange}>
                {friendNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )

}

export default Filters
