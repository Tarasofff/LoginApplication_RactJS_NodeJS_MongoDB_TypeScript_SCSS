const Api_Error = require('../exeptions/api-error')
import { Request, Response, NextFunction } from 'express';

module.exports = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)

    if (err instanceof Api_Error) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    }
    return res.status(500).json({
        message: "Server error"
    })
}