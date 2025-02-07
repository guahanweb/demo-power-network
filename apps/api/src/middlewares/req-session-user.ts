import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

interface ReqSessionUserOpts {
    userId: string;
}

const defaultOpts: ReqSessionUserOpts = {
    userId: randomUUID(),
};

export const reqSessionUser = (opts: ReqSessionUserOpts = defaultOpts) => {
    const { userId } = opts;

    return (req: Request, res: Response, next: NextFunction) => {
        res.locals.userId = userId;
        next();
    };
};

