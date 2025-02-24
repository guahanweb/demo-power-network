import { Request, Response, NextFunction } from 'express';

interface ReqHeaderClientOpts {
    header: string;
    defaultClient: string;
    allowedValues: string[];
}

const defaultOpts: ReqHeaderClientOpts = {
    header: 'x-client-id',
    defaultClient: 'power',
    allowedValues: ['elven', 'dwarven', 'human', 'power'],
};

export const reqHeaderClient = (opts: Partial<ReqHeaderClientOpts> = {}) => {
    const options = { ...defaultOpts, ...opts };
    const { header, defaultClient, allowedValues } = options;

    return (req: Request, res: Response, next: NextFunction) => {
        const clientId = req.header(header) || defaultClient;
        if (!allowedValues.includes(clientId)) {
            res.status(400).json({ error: 'Invalid client' });
            return;
        }
        console.info('[INFO] Request from client:', clientId);
        res.locals.clientId = clientId;
        next();
    };
};
