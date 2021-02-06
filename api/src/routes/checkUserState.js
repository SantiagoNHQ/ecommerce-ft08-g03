const isAdmin = (req, res, next) => {
    if (req.body.user.admin) {
        next()
        return
    }

    res.status(401).send("Ruta solo para administradores")
}

const isUser = (req, res, next) => {
    if (req.body.user.id) {
        next()
        return
    }

    res.status(401).send("Ruta solo para usuarios")
}

const isUserOrAdmin = (req, res, next) => {
    if (req.body.user.id || req.body.user.admin) {
        next()
        return
    }

    res.status(401).send("Ruta solo para usuarios o administradores")
}

const isGuest = (req, res, next) => {
    if (!req.body.user.id) {
        next()
        return
    }

    res.status(401).send("Ruta solo para invitados")
}

module.exports = {
    isAdmin,
    isUser,
    isGuest,
    isUserOrAdmin
}