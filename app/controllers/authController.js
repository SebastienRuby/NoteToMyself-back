const authController = {
    postLogin: (req, res) => {
        // dans notre formulaire, un champ du nom de login servait à envoyer l'identifiant à notre serveur, ci-dessous, on récupère cette valeur
        const userId = req.body.login;
        // on va maintenant stocker l'identifiant de l'utilisateur dans sa session
        req.session.login = userId;

        // maintenant qu'on a stocké l'userId, on renvoie l'utilisateur vers la page appropriée
        res.redirect('/');
    }
}

module.exports = authController;