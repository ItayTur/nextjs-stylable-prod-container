import { st, classes } from './Input.st.css'

const inputs = {
    text: props => <input {...props} />,
    email: props => <input {...props} type='email' />,
    password: props => <input {...props} type='password' />,
    textArea: props => <textarea {...props} className={`${props.className} ${classes.TextArea}`} />,
    number: props => <input type='number' {...props} {...props.attrs} />,
    date: props => <input type='date' {...props} {...props.attrs} />,
    dateTime: props => <input type='datetime-local' {...props} {...props.attrs} />,
    file: ({ value, ...props }) => <input type='file' {...props} {...props.attr} />
}

const Input = ({ label, type, onChange, isValid, isBlured, onBlur, error, className, value = '', attrs }) => {

    const input = inputs[type]({ onChange, className: classes.Input, onBlur, value, attrs })
    return (
        <div className={st(classes.root, { isValid, isBlured }, className)}>
            <label className={classes.Label}> {label} </label>
            {input}
            <p className={classes.ErrorMessage}>{error}</p>
        </div>
    )
}

export default Input