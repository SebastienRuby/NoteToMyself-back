const bcrypt = require("bcrypt");
const assert = require("assert");
const validator = require('email-validator');
const  User  = require("../models/user");

const userController = {
  // traiter le formulaire d'inscription,
  async doSignUp(req, res) {
    // ETAPE 1 : Verification de l'intégrité des données

    try {
      //  -> L'email est libre

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      // assert -> Si la condition est fausse je plante
  
      assert.ok(!Boolean(user), `L'utilisateur ${req.body.email} existe déjà`);
      //  -> L'email est valide
      assert.ok(
        validator.validate(req.body.email),
        `${req.body.email} n'est pas un email valide.`
      );
      //  -> Les deux mots (pwd + confim) correspondent
      assert.ok(
        req.body.password === req.body.passwordConfirm,
        `Les mots de passes ne correspondent pas`
      );

      //  -> Le mot de passe répond au normes de sécurité
      assert.ok(
        schema.validate(req.body.password),
        `Le mot de passe ne remplit pas les critères`
      );

      // Hasher le MDP
      const encryptedPwd = await bcrypt.hash(req.body.password, 10);

      // Créer l'utilisateur en base à l'aide de user.create

      const newUser = await User.create({
        ...req.body, // spread operateur : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        password: encryptedPwd,
      });

      // On redirige l'utilisateur vers la page d'accueil
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.redirect("/signup?error=true&errMsg=" + err.message);
    }
  },
  // d'afficher le formulaire de connexion
  showLogin(req, res) {
    // ça ne sert à rien d'afficher le login si on est déjà connecté
    if (req.session.user) {
      return res.redirect("/");
    }

    res.json("login");
  },
  // se connecter
  async doLogin(req, res) {
    // ETAPE 1 : Verification de l'intégrité des données
    if (req.session.user) {
        return res.redirect("/");
    }

    // ETAPE 1 : Tenter de récupérer l'utilisateur en fonction de l'email donnée
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(user , 'user2');
    // DEUX Possibilités

    // ETAPE 2: USER TROUVE
    if (user) {
      //      -> VERIF MDP
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        //              SI MDP OK
        //                 ON STOCK LE USER DANS LA SESSION
        req.session.user = user;
        delete req.session.user.password;

        res.redirect("/");
      } else {
        //              SINON -> ON RENVOIT SE BALADER
        res.redirect("/login?error=wrongUserOrPwd");
      }
    } else {
      // USER PAS TROUVE
      //      -> ON RENVOIT BALADER
      res.redirect("/login?error=wrongUserOrPwd");
    }
  },

  logout: (req, res) => {
    // Detruire la session
    req.session.destroy();

    // On redirige l'utilisateur
    res.redirect("/");
  },
};

module.exports = userController;
