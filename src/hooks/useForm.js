import { useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)

  const formValidation = useMemo(() => {
    const formCheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }

    return formCheckedValues
  }, [formState, formValidations])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.values(formValidation)) {
      if (formValue !== null) return false
    }
    return true
  }, [formValidation])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}