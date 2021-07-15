const UserModel = require('../models/user_model');
const emailService = require('./email_service');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const Token_Service = require('./token_service');
const UserDto = require('../dto/user_dto');
const Api_Error = require('../exeptions/api-error')

class UserService {
    async registration(email: string, password: string) {
        const person = await UserModel.findOne({email})
        if (person) {
            throw Api_Error.BadRequest(`User with ${email} already declared`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await emailService.ActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = Token_Service.generateToken({...userDto})

        await Token_Service.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw Api_Error.BadRequest('Bad activation link')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw Api_Error.BadRequest("User not find")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw Api_Error.BadRequest("Bad password")
        }
        const userDto = new UserDto(user)
        const tokens = Token_Service.generateToken({...userDto})
        await Token_Service.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await Token_Service.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw Api_Error.UnauthorizedError();
        }
        const userData = Token_Service.validateRefreshToken(refreshToken)
        const tokenDB = await Token_Service.findToken(refreshToken)
        if(!userData || !tokenDB) {
            throw Api_Error.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = Token_Service.generateToken({...userDto})
        await Token_Service.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAll() {
        const users = await UserModel.find()
        return users
    }
}

module.exports = new UserService()