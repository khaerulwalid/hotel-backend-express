const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error"
    
    switch(err.name) {
        case "formLoginRequire":
            status = 400
            message = err.message
            break
        case "unauthorizedLogin":
            status = 400
            message = "Username/email or password is invalid"
            break
        case "SequelizeValidationError":
            status = 400
            errors = err.errors.map(error => error.message)
            message = errors
            break
        case "SequelizeUniqueConstraintError":
            status = 400
            errors = err.errors.map(error => error.message)
            message = errors[0]
            break
    }

    res.status(status).json({message})
}

module.exports = errorHandler