import { useState, useEffect } from 'react'
import { FaXTwitter } from "react-icons/fa6"
import { MdCalendarToday } from "react-icons/md"
import { FaComment, FaCoffee, FaStar } from "react-icons/fa"
import { MdCelebration } from "react-icons/md"
import { FaHeart } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import Snowfall from 'react-snowfall';

import './App.css'

function App() {
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [nextDate, setNextDate] = useState('01/01/2026')
  const [showCalendar, setShowCalendar] = useState(false)

  const targetYear = new Date().getFullYear() + 1
  const newYearDate = new Date(targetYear, 0, 1)

  useEffect(() => {
    const newYearTime = new Date(`January 1, ${targetYear} 00:00:00`)
    setNextDate(`01/01/${targetYear}`)

    const interval = setInterval(() => {
      if (isCelebrating) return

      const currentTime = new Date()
      const diff = newYearTime - currentTime

      if (diff <= 0) {
        setIsCelebrating(true)
        clearInterval(interval)
        return
      }

      const d = Math.floor(diff / 1000 / 60 / 60 / 24)
      const h = Math.floor(diff / 1000 / 60 / 60) % 24
      const m = Math.floor(diff / 1000 / 60) % 60
      const s = Math.floor(diff / 1000) % 60

      setDays(d < 10 ? '0' + d : d.toString())
      setHours(h < 10 ? '0' + h : h.toString())
      setMinutes(m < 10 ? '0' + m : m.toString())
      setSeconds(s < 10 ? '0' + s : s.toString())
    }, 1000)

    return () => clearInterval(interval)
  }, [isCelebrating, targetYear])

  const handleSimulateNewYear = () => {
    setIsCelebrating(true)
  }

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar)
  }

  const CustomCalendar = () => {
    const daysInMonth = new Date(targetYear, 1, 0).getDate()
    const firstDay = new Date(targetYear, 0, 1).getDay()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weeks = []
    let currentWeek = new Array(firstDay).fill(null)
    
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7 || day === daysInMonth) {
        while (currentWeek.length < 7) currentWeek.push(null)
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    return (
      <div className="custom-calendar">
        <div className="calendar-month">January {targetYear}</div>
        <div className="calendar-weekdays">
          {days.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="calendar-week">
              {week.map((day, dayIdx) => (
                <div 
                  key={dayIdx} 
                  className={`calendar-day ${day === 1 ? 'new-year-day' : ''} ${!day ? 'empty' : ''}`}
                >
                  {day || ''}
                  {day === 1 && <span className="celebration-icon">🎉</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // const Snowfall = () => {
  //   const snowflakes = Array.from({ length: 100 }, (_, i) => ({
  //     id: i,
  //     left: Math.random() * 100,
  //     duration: Math.random() * 6 + 8,
  //     delay: Math.random() * 5
  //   }))

  //   return (
  //     <div className="snowfall">
  //       {snowflakes.map(flake => (
  //         <div
  //           key={flake.id}
  //           className="snowflake"
  //           style={{
  //             left: `${flake.left}%`,
  //             animationDuration: `${flake.duration}s`,
  //             animationDelay: `${flake.delay}s`
  //           }}
  //         >
  //           •
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  return (
    <div className="app">
      {/* <Snowfall /> */}
       <Snowfall
      snowflakeCount={120}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 50,
      }}
      />
      <header className="header">
        <div className="logo">
          <FaXTwitter />
          <span>New Year Countdown</span>
        </div>
        <div className="nav-buttons">
          <div className="calendar-wrapper">
            <button className="btn" onClick={handleCalendarClick}>
              <MdCalendarToday /> Calendar
            </button>
            {showCalendar && (
              <div className="calendar-modal">
                <div className="calendar-content">
                  <div className="calendar-header">
                    <h3>Next New Year: January 1, {targetYear}</h3>
                    <button className="close-btn" onClick={() => setShowCalendar(false)}>
                      <MdClose />
                    </button>
                  </div>
                  <div className="calendar-info">
                    <p>🎉 New Year's Day: {newYearDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  {/* <CustomCalendar /> */}
                </div>
              </div>
            )}
          </div>
          <button className="btn">
            <FaComment />
          </button>
          <button className="btn btn-primary">
            <FaCoffee /> Buy me a coffee
          </button>
          <button className="btn">
            <FaStar /> Star on GitHub
          </button>
        </div>
      </header>

      <div className={`container ${isCelebrating ? 'shake-effect' : ''}`} id="main-container">
        <h1 id="main-heading" className={isCelebrating ? 'celebrate-text' : ''}>
          {isCelebrating ? (
            <>
              <MdCelebration /> HAPPY NEW YEAR {targetYear}! <MdCelebration />
            </>
          ) : (
            'NEXT NEW YEAR'
          )}
        </h1>
        
        {!isCelebrating && (
          <>
            <p className="subtitle" id="subtitle">
              Track the time remaining until the new year celebration begins.
            </p>
            
            <div className="countdown" id="countdown-ui">
              <div className="time-box">
                <div className="time-value">
                  <span>{days}</span>
                </div>
                <label>DAYS</label>
              </div>
              <div className="time-box">
                <div className="time-value">
                  <span>{hours}</span>
                </div>
                <label>HOURS</label>
              </div>
              <div className="time-box">
                <div className="time-value">
                  <span>{minutes}</span>
                </div>
                <label>MINUTES</label>
              </div>
              <div className="time-box">
                <div className="time-value">
                  <span>{seconds}</span>
                </div>
                <label>SECONDS</label>
              </div>
            </div>
            <div className="next-date" id="next-date">
              Next new year on {nextDate}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 Built with ❤️ by m4npreet</p>
      </footer>
    </div>
  )
}

export default App
