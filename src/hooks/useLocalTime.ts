import { useEffect, useState } from 'react'
import { IDENTITY } from '../config/site'

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: IDENTITY.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Local time in Lagos, refreshed every 15 s (minute precision is all it shows). */
export function useLocalTime() {
  const [time, setTime] = useState(() => format.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setTime(format.format(new Date())), 15000)
    return () => window.clearInterval(id)
  }, [])
  return time
}
