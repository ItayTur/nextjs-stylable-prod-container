import { st, classes } from './Spinner.st.css'

const Spinner = ({ className }) => <div className={st(classes.root, {}, className)}>Loading...</div>

export default Spinner