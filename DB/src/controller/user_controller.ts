const User_Service = require('../service/user_service')
import {Request, Response, NextFunction} from 'express';
const {validationResult} = require('express-validator')
const Api_Error = require('../exeptions/api-error')

class UserController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(Api_Error.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await User_Service.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {email, password} = req.body
            const userData = await User_Service.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {refreshToken} = req.cookies
            const token = await User_Service.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const activationLink = req.params.link;
            await User_Service.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL as string)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {refreshToken} = req.cookies
            const userData = await User_Service.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const users = await User_Service.getAll()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()