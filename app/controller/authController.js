const authController = {
    // controlleur de la homepage
    getLoginForm: (req, res) => {
      res.json("login");
    },
    setLogin: (req, res) => {
      const username = req.body.username;
      res.cookie("username", username);
      res.redirect("/");
    },
  };
  
  module.exports = authController;