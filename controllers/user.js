const { User } = require('../models');
const { createToken, isValidToken } = require('../utilities/tokenService');
const cookieOptions = {
  httpOnly: true,
  // secure: true, on deployment
  signed: true,
  maxAge: (1000 * 60) ^ 60,
  expiresIn: new Date(Date.now() + 90000),
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({
        status: 'ERROR',
        message: 'sorry the username or password is incorrect',
      });
    }
    try {
      let isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        let token = await createToken(user);
        res
          .cookie('token', token, cookieOptions)
          .json({ status: 'OK', message: 'Successfully logged in' });
      } else {
        res.status(401).json({
          status: 'ERROR',
          message: 'sorry the username or password is incorrect',
        });
      }
    } catch (err) {
      if (err) res.send(err);
    }
  } catch (err) {
    if (err) res.send(err);
  }
};
const signup = async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = await createToken(user);
    res
      .cookie('token', token, cookieOptions)
      .json({ status: 'OK', message: 'successfully registered' });
  } catch (err) {
    if (err) throw err;
  }
};
const cookieCheck = async (req, res) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.status(401).json({ message: 'You are not authorized to do that' });
  } else {
    const { token } = req.signedCookies;
    if (token) {
      try {
        let {
          user: { _id, username, email, password },
        } = await isValidToken(token);
        try {
          let user = await User.findOne({ username, password, _id, email });
          res.send({
            email: user.email,
            username: user.username,
            id: user._id,
          });
        } catch (err) {
          if (err) throw err;
        }
      } catch (err) {
        if (err) throw err;
      }
    } else {
      res.send({ message: 'Cookie has expired, please log in.' });
    }
  }
};
const logout = async (req, res) =>
  await res
    .clearCookie('token')
    .json({ message: 'You have successfully logged out' });

module.exports = { login, signup, logout, cookieCheck };
