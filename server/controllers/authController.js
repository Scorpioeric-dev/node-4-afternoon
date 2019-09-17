const users = require("../models/users");

let id = 1;

module.exports = {
  
    register: (req, res) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;
//pushing a user to the user array then updating it to the session users
    session.user.username = username;

    res.status(200).send(session.user);
  },
  
  login: (req, res) => {
    const { session } = req;
    //destructuring username,password to req.
    const { username, password } = req.body;
//checking if the a user from the user array matches the user/password combination
    const user = users.find(
      user => user.username === username && user.password === password
    );
  //if the method finds a user (then) update the value of username to username on session 
    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("unauthorized!");
    }
  },
  
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session)
  },
 
  getUser: (req, res) => {
    //this destructuring of session to = request? 
      const {session} = req
      res.status(200).send(session.user)
  }
};