import { validations } from '@itaytur/validation'
import { getInputObj, getValidation } from '../../components/UI/Form/Form'

const inputs = {
    name: getInputObj({
        label: 'Name',
        type: 'text',
        validations: [
            getValidation(validations.IS_WORDS),
            getValidation(validations.IS_REQUIRED)
        ]
    }),
    email: getInputObj({
        label: 'Email',
        type: 'email',
        validations: [
            getValidation(validations.IS_EMAIL),
            getValidation(validations.IS_REQUIRED)
        ]
    }),
    subject: getInputObj({
        label: 'Subject',
        type: 'text',
        isValid: true,
    }),
    message: getInputObj({
        label: 'Message',
        type: 'textArea',
        validations: [
            getValidation(validations.IS_REQUIRED),
            getValidation(validations.IS_REQUIRED)
        ],
        error: 'Message is required'
    }),
}

export default inputs