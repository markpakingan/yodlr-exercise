"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
// const { UnauthorizedError } = require("../expressError");


function authenticateJWT(req, res, next) {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        res.locals.user = jwt.verify(token, SECRET_KEY);
  
        console.log("token in authenticateJWT", token);
      }
      return next();
    } catch (err) {
      return next();
    }
  }
  
  /** Middleware to use when they must be logged in.
   *
   * If not, raises Unauthorized.
   */
  
  function ensureLoggedIn(req, res, next) {
  
    console.log("res locals.user value in ensureLoggedIn", res.locals.user);
    try {
      if (!res.locals.user) throw new UnauthorizedError();
      return next();
    } catch (err) {
      return next(err);
    }
  }
  
  
  /** Middleware to use when they be logged in as an admin user.
   *
   *  If not, raises Unauthorized.
   */
  
  function ensureAdmin(req, res, next) {
    try {
      if (!res.locals.user || !res.locals.user.isAdmin) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }
  
  /** Middleware to use when they must provide a valid token & be user matching
   *  username provided as route param.
   *
   *  If not, raises Unauthorized.
   */
  
  function ensureCorrectUser(req, res, next) {
    // console.log("req.body.username in ensureCorrectUser:", req.body.username);
    // console.log("req.query.username in ensureCorrectUser:", req.query.username);
  
    // console.log("value of user on ensureCorrectUSer", res.locals.user);
    try {
      const username = req.body.username || req.query.username;
      const user = res.locals.user;
      if (!(user && (user.username === username))) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }
  
  
  module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUser,
  };
  