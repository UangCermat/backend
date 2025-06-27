const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({message: err.errors[0].message})
    }

    return res.status(500).json({message: "Internal Server Error"})
}

module.exports = errorHandler