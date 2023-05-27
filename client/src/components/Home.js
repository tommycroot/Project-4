import Container from 'react-bootstrap/esm/Container'
import logo from '../images/logo.png'
import { useEffect, useState } from 'react'

const Home = () => {

  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const backgrounds = [
    'https://d3qfk7u7s63iel.cloudfront.net/media/zoo/images/Fans_celebrating_the_success_of_their_favorite_sports_team_in_stadium_9ac92bcf1110fc5b1c18b5c8a0bd25df.jpg',
    'https://static7.depositphotos.com/1000423/702/i/450/depositphotos_7020377-stock-photo-crowd-on-the-stadium.jpg',
    'https://st2.depositphotos.com/1518767/11356/i/450/depositphotos_113560446-stock-photo-silhouettes-of-football-supporters.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [backgrounds])

  return (
    <div className='container'>
      <div className="home">
        <div className="hero" style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}>
          <img src={logo} className="logo" alt="logo"></img>
        </div>
        <p>Keeping track of your games</p>
      </div>
    </div>
  )
}

export default Home