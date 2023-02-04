import emailValidator from "email-validator"

export const login = (formData) => {
    if (!formData.email) {
        return {
            error: 'Email is required! Please provide one.'
        }
    }
    if (!formData.password) {
        return {
            error: 'Password is required! Please provide one.'
        }
    }
    if (formData.password < 8) {
        return {
            error: 'Please provide a password with 8 characters or more.'
        }
    }
    if (!emailValidator.validate(formData.email)) {
        return {
            error: 'Invalid email address! Please check.'
        }
    }

    return {
        error: null
    }
}

export const signup = (formData) => {
    if (!formData.email) {
        return {
            error: 'Email is required! Please provide one.'
        }
    }
    if (!formData.password) {
        return {
            error: 'Password is required! Please provide one.'
        }
    }
    if (formData.password < 8) {
        return {
            error: 'Please provide a password with 8 characters or more.'
        }
    }
    if (formData.username > 10) {
        return {
            error: 'Username exceeds the limit of 10 characters.'
        }
    }
    if (!formData.username) {
        return {
            error: 'Username is required! Please provide one.'
        }
    }
    if (!emailValidator.validate(formData.email)) {
        return {
            error: 'Invalid email address! Please check.'
        }
    }

    return {
        error: null
    }
}

export const emailList = (formData) => {
    if (!formData.email) {
        return {
            error: 'Email is required! Please provide one.'
        }
    }
    if (!emailValidator.validate(formData.email)) {
        return {
            error: 'Invalid email address! Please check.'
        }
    }

    return {
        error: null
    }
}
