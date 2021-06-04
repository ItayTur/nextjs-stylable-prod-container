import { zeroPad } from 'react-countdown'
import { st, classes } from './CountdownRenderer.st.css'

const singularize = (unit, text) => unit == "01" ? text.substr(0, text.length - 1) : text;

const TimeFormat = ({ unit, text }) =>
(<div className={classes.TimeFormat}>
    <div className={classes.unit}>{unit}</div>
    <div className={classes.text}>{text}</div>
</div>)

export const renderer = ({ days, hours, minutes, seconds }) => (
    <div className={classes.renderer}>
        {days ? <div><TimeFormat unit={zeroPad(days)} text={singularize(days, "Days")} /></div> : null}
        <div>{<TimeFormat unit={zeroPad(hours)} text={singularize(hours, "Hours")} />}</div>
        <div>{<TimeFormat unit={zeroPad(minutes)} text={singularize(minutes, "Minutes")} />}</div>
        <div>{<TimeFormat unit={zeroPad(seconds)} text={singularize(seconds, "Seconds")} />}</div>
    </div>
);