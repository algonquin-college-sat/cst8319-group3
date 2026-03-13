import React, { useEffect, useState } from "react"
import { CountdownTime, getCountdown } from "../Utils/countdown"
import { useLanguage } from "../Context/LanguageContext"

interface Props {
  targetDate: string
}

const Countdown: React.FC<Props> = React.memo(({ targetDate }) => {

  const { t } = useLanguage()

  const [time, setTime] = useState<CountdownTime>(() =>
    getCountdown(targetDate)
  )

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(getCountdown(targetDate))
    }, 1000)

    return () => clearInterval(interval)

  }, [targetDate])

  return (
    <div className="event-countdown">

      <div className="countdown-item">
        <span className="countdown-number">{time.days}</span>
        <span className="countdown-label">{t("Days", "Jours")}</span>
      </div>

      <div className="countdown-separator">:</div>

      <div className="countdown-item">
        <span className="countdown-number">{time.hours}</span>
        <span className="countdown-label">{t("Hrs", "Hrs")}</span>
      </div>

      <div className="countdown-separator">:</div>

      <div className="countdown-item">
        <span className="countdown-number">{time.minutes}</span>
        <span className="countdown-label">{t("Min", "Min")}</span>
      </div>

      <div className="countdown-separator">:</div>

      <div className="countdown-item">
        <span className="countdown-number">{time.seconds}</span>
        <span className="countdown-label">{t("Sec", "Sec")}</span>
      </div>

    </div>
  )
})

export default Countdown