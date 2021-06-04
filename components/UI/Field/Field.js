import { st, classes } from './Field.st.css'

const Field = ({ className, label, value }) => {
    const valueToShow = value || 'yet to be filled...'
    return (
        <div className={st(classes.root, { isEmpty: !Boolean(value) }, className)}>
            <span className={classes.Label}>{label}: </span>
            <span className={classes.Value}>{valueToShow}</span>
        </div>
    )
}

export default Field