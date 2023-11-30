"use strict";

const db = require("../db");
const bcrypt = require("bcrypt"); 
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

class UserModel{

    static async authenticate(username, password) {
      
        const result = await db.query(
          `SELECT user_id,
                  username,
                  password,
                  first_name,
                  last_name,
                  email,
                  isAdmin
           FROM users
           WHERE username = $1`,
          [username]
        );
    
        const user = result.rows[0];
        
        //checks if user present then authenticate the pw
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            delete user.password;
            return user;
          }
        }
    
        throw new UnauthorizedError("Invalid username/password");
      }


   
    static async register(formDataWithAdmin){

        const {username, password, email, first_name, last_name, isAdmin} = formDataWithAdmin

        const duplicateCheck = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1`,
            [username],
        )
    
            if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

      
    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            isAdmin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name, last_name, email`,
        [
          username,
          hashedPassword,
          first_name,
          last_name,
          email, 
          isAdmin
        ],
    );

    const user = result.rows[0];

    return user;
    }

    
    static async getAllUsers(){

        const result = await db.query(
            "SELECT username, first_name, last_name, email FROM users ORDER BY username"
        )

        return result.rows;
    }


}

module.exports = UserModel;
