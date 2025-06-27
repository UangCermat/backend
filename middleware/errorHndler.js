const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({message: err.errors[0].message})
    }

    if (err.name === "BadRequest") {
        return res.status(400).json({message: err.message})
    }

    if (err.name === "Unauthorized" || err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        return res.status(401).json({message: err.message})
    }

    return res.status(500).json({message: "Internal Server Error"})
}

module.exports = errorHandler