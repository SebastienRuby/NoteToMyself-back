const bcrypt = require('bcrypt');
const assert = require('assert');
const validator = require('email-validator');
const User = require('../models/user');

const userController = {

  async doSignUp(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      assert.ok(!user, `L'utilisateur ${req.body.email} existe déjà`);

      assert.ok(
        validator.validate(req.body.email),
        `${req.body.email} n'est pas un email valide.`,
      );

      // assert.ok(
      //   req.body.password === req.body.passwordConfirm,
      //   'Les mots de passes ne correspondent pas',
      // );

      // assert.ok(
      //   schema.validate(req.body.password),
      //   'Le mot de passe ne remplit pas les critères',
      // );

      const encryptedPwd = await bcrypt.hash(req.body.password, 10);

      const newUser = await User.create({
        ...req.body,
        password: encryptedPwd,
      });

      res.json(newUser);
      //res.redirect('/login');
    }
    catch (err) {
      console.error(err);
      res.status('401').send(err.message);
    }
  },

  async doLogin(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {

        res.json({
          isLogged: true,
          username: user.firstname,
          // token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
        });
      }
      else {
        res.status('401').send('mauvais mdp');
      }
    }
    else {
      res.status('401').send('mauvais user');
    }
  },

};

module.exports = userController;
