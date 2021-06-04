import moment from 'moment'
import Countdown from 'react-countdown'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { st, classes } from './LotteryCountdown.st.css'

export const LotteryCountdown = ({ endTime, className }) => {
    const now = moment()
    const diff = moment(endTime).diff(now);
    const duration = moment.duration(diff).asHours();

    return (
        duration < 24 && <div className={st(classes.Countdown, className)}>
            <QueryBuilderIcon className={classes.Watch} fontSize="small" />
            <span>Ends Soon! <Countdown date={endTime} daysInHours={true} /></span>

        </div>
    )
}

