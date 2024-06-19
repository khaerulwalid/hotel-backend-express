const { Op } = require('sequelize');
const {User} = require('../models/index');
const { comparePassword } = require('../helper/hashingPassword');
const { signToken } = require('../helper/jsonWebToken');

class UserController {
    static async registerUser(req, res, next) {
        try {
            const {username, password, email, user_type} = req.body;

            // buat user baru
            const newUser = await User.create({username, password, email, user_type})

            res.status(201).json({
                message: 'User registered successfully',
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    user_type: newUser.user_type
                }
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const {username, email, password} = req.body

            if(!username && !email) {
                throw {name: 'formLoginRequire', message: 'Username or email is require'}
            }

            if(!password) {
                throw {name: 'formLoginRequire', message: 'Password is require'}
            }

            let whereClause = {};

            if(username && email) {
                whereClause = {
                    [Op.or]: [
                        {email},
                        {username}
                    ]
                }
            } else if (username) {
                whereClause = {username}
            } else if (email) {
                whereClause = {email}
            }

            const findUser = await User.findOne({ where: whereClause })

            if(!findUser) {
                throw {name: 'unauthorizedLogin'}
            }

            const checkComparePassword = comparePassword(password, findUser.password);

            if(!checkComparePassword) {
                throw {name: 'unauthorizedLogin'}
            }

            let access_token = signToken({
                id: findUser.id,
                email: findUser.email,
                user_type: findUser.user_type
            })

            res.status(200).json({access_token})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = UserController