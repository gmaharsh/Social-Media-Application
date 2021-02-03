import { useState } from 'react';
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const changeValues = (event) => {
        setValues({...values, [event.target.name]: event.target.value })
    }

    const submitForm = (e) => {
        e.preventDefault();
        callback();
    }

    return {
        changeValues,
        submitForm,
        values
    }
}