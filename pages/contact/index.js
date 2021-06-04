import Form from '../../components/UI/Form/Form'
import contactInputs from './contactInputs'

import { st, classes } from './Contact.st.css'

const Contact = () => {
    return (
        <Form
            inputs={contactInputs}
            submitText='Send'
            className={classes.FormExt}
        />
    )
}

export default Contact