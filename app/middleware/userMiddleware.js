//On test si l'utilisateur est connecté

const userMiddleware = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    } else {
        // pour éviter une erreur de undefined dans la vue
        res.locals.user = false;
    }

    next();
}

module.exports = userMiddleware;