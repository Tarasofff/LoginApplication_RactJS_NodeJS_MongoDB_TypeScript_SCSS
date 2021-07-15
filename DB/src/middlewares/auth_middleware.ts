import {Request, Response, NextFunction} from 'express';

const ApiError = require('../exeptions/api-error');
const tokenService = require('../service/token_service');

module.exports = function (req: Request | any, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}

