import React from 'react'
import { validate } from '@itaytur/validation'
import moment from 'moment'

import Input from '../Input/Input'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'

import { st, classes } from './Form.st.css'

export const getInputObj = ({ type = 'text', label, value = '', validations = [], error = 'Invalid input', isValid = false, attrs = {} }) => {
    return {
        type,
        label,
        value,
        attrs,
        isValid,
        isBlured: false,
        validations,
        error
    }
}

export const getValidation = (type, options) => {
    return {
        type,
        options
    }
}

class Form extends React.Component {

    constructor(props) {
        super(props)
        let childrenForms;
        let isChildrenValid = true
        if (props.childrenForms) {
            isChildrenValid = false
            childrenForms = this.getChildren(props.childrenForms)
        }
        this.state = {
            isFormValid: props.isFormValid,
            inputs: {
                ...props.inputs
            },
            childrenForms,
            isChildrenValid
        }
    }

    getChildren = childrenFormsProps => {
        const childrenForms = []
        for (let i = 0; i < childrenFormsProps.length; i++) {
            const child = this.getChild(childrenFormsProps[i], i)
            childrenForms.push(child)
        }
        return childrenForms
    }

    getChild = (child, id) => {
        const mutableForm = JSON.parse(JSON.stringify(child))
        return {
            id,
            ...mutableForm,
            isValid: false
        }
    }

    childChangeHandler = ({ childId, isChildFormValid, input, inputValue }) => {
        const { childrenForms } = this.state
        let isValid = isChildFormValid
        for (const form of childrenForms) {
            if (form.id !== childId) {
                isValid = isValid && form.isValid
            }
        }
        const updatedChildren = [...childrenForms]
        const updatedChild = { ...updatedChildren[childId] }
        const updatedChildInputs = { ...updatedChild.inputs }
        const updatedInput = { ...updatedChildInputs[input] }
        updatedInput.value = inputValue
        updatedChildInputs[input] = updatedInput
        updatedChild.inputs = updatedChildInputs
        updatedChild.isValid = isChildFormValid
        updatedChildren[childId] = updatedChild
        this.setState({ isChildrenValid: isValid, childrenForms: updatedChildren })
    }

    isChildrenValid = () => {
        let isValid = true
        for (const form of this.state.childrenForms) {
            isValid = isValid && form.isValid
        }
        return isValid
    }

    changeHandler = ({ input, event }) => this.inputUpdateHandler({
        input,
        updater: inputToUpdate => {
            const { isChild, id, childChangeHandler } = this.props
            let { value } = event.target
            if (this.state.inputs[input].type === 'file') value = event.target.files[0]
            inputToUpdate.isValid = validate.isValidValue(value, inputToUpdate.validations)
            inputToUpdate.value = value
            let isFormValid = true
            const { inputs } = this.state
            for (let inputIndex in inputs) {
                if (inputIndex === input) isFormValid = isFormValid && inputToUpdate.isValid
                else isFormValid = isFormValid && inputs[inputIndex].isValid
            }
            if (!isChild) {
                return { isFormValid }
            }
            childChangeHandler({ childId: id, isChildFormValid: isFormValid, input, inputValue: value })
        }
    })


    blurHandler = ({ input }) => this.inputUpdateHandler({
        input, updater: inputToUpdate => inputToUpdate.isBlured = true
    })


    inputUpdateHandler = ({ input, updater }) => {
        const { inputs } = this.state
        const changedInputs = { ...inputs }
        const changedInput = { ...inputs[input] }
        const statesToUpdate = updater(changedInput)
        changedInputs[input] = changedInput
        this.setState({ inputs: changedInputs, ...statesToUpdate })
    }

    getInputsData = inputs => {
        const data = {}
        for (const input in inputs) {
            if (input === "endTime") {
                const time = moment(inputs[input].value).utc().valueOf();
                data[input] = time;
            }
            else {
                data[input] = inputs[input].value
            }
        }
        return data
    }

    submitHandler = async event => {
        event.preventDefault()
        const { inputs, childrenForms } = this.state
        const { onSubmit } = this.props
        const formData = this.getInputsData(inputs)
        const childrenData = [];
        if (childrenForms) {
            for (const form of childrenForms) {
                const childData = this.getInputsData(form.inputs)
                childrenData.push(childData)
            }
        }
        await onSubmit({ formData, childrenData })
    }

    getInputs = () => {
        const { inputs } = this.state
        const inputsToReturn = []
        for (const input in inputs) {
            const inputElement = (
                <Input
                    key={input}
                    className={classes.InputExt}
                    {...inputs[input]}
                    onChange={event => this.changeHandler({ input, event })}
                    onBlur={() => this.blurHandler({ input })}
                />
            )
            inputsToReturn.push(inputElement)
        }
        return <div className={classes.Inputs}>
            {inputsToReturn}
        </div>
    }

    getChildForms = () => {
        const { childrenForms } = this.state
        const childrenFormsJsx = []
        for (const child of childrenForms) {
            childrenFormsJsx.push(
                <Form
                    key={child.id}
                    id={child.id}
                    isChild
                    inputs={child.inputs}
                    childChangeHandler={this.childChangeHandler}
                    title={child.title}
                />
            )
        }
        return childrenFormsJsx
    }

    componentDidUpdate(prevProps) {
        if (prevProps.childrenForms && prevProps.childrenForms.length !== this.props.childrenForms.length) {
            const newChildId = this.props.childrenForms.length - 1
            const childrenForms = [...this.state.childrenForms, this.getChild(this.props.childrenForms[newChildId], newChildId)]
            this.setState({ childrenForms, isChildrenValid: false })
        }
    }

    render() {
        const { childrenForms, isFormValid, isChildrenValid } = this.state
        const { isLoading, isChild, submitText, title, className, isMultiChildren, onChildAddition, childAdditionText } = this.props
        const titleJsx = title && <h2>{title}</h2>
        const inputs = this.getInputs()
        const childrenFormsJsx = childrenForms && this.getChildForms()

        const isSubmitDisabled = childrenForms ? !isFormValid || !isChildrenValid : !isFormValid
        const submitButton = isChild ?
            null :
            <Button type='submit' className={classes.ButtonExt} text={submitText} isDisabled={isSubmitDisabled} />
        const formProps = {
            onSubmit: this.submitHandler
        }
        const addChild = isMultiChildren ?
            <Button className={classes.AddChild} onClick={onChildAddition} text={childAdditionText} /> :
            null
        const children = <>
            {titleJsx}
            {inputs}
            {childrenFormsJsx}
            {addChild}
            {isLoading ? <Spinner /> : submitButton}
        </>

        const form = isChild ?
            <div className={classes.ChildForm} {...formProps}>
                {children}
            </div>
            :
            <form className={st(classes.root, {}, className)} {...formProps}>
                {children}
            </form>

        return form
    }
}

Form.defaultProps = {
    isFormValid: false,
}

export default Form;