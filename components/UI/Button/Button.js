import { st, classes } from './Button.st.css'

const Button = ({ text, isDisabled = false, onClick, className, type = 'button' }) => {
    return (
        <button
            onClick={onClick}
            className={st(classes.root, { isDisabled }, className)}
            disabled={isDisabled}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button;