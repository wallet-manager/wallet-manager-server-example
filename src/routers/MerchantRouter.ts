import { default as express, Request, Response } from 'express';
const router = express.Router();

import { loggerFactory } from "../utils/Logger"
const logger = loggerFactory("MerchantApiServer");

import { extractHeaderAndBody, handleError} from "../utils/HttpUtils";

export function MerchantRouter() {
    router.post("/echo", (req: Request, res: Response) => {

        console.log(JSON.stringify(req.headers));

        const headerAndBody = extractHeaderAndBody(req);

        logger.info(`${req.url} - ${req.method} ${JSON.stringify(headerAndBody, null, 2)}`);

        // console.info("Receive request header.....", header);
        // if(typeof body === 'object'){
        //     console.info("Receive request body object.....", body);
        // }else {
        //     console.info("Receive request body string.....", body);
        // }
        res.json({ result: headerAndBody });
    });


    function randomResponse(res: Response) {
        const n = Math.floor(Math.random() * 10);
        if (n == 1) {
            res.json({ result: false });
        } else if ( n == 2){
            res.status(500).json({ error: {code:500, message:"Internal Error"} });
        }else {
            res.json({ result: true });
        }
    }

    router.post("/deposit_status", (req: Request, res: Response) => {
        try{
            const headerAndBody = extractHeaderAndBody(req);
            logger.info(`${req.url} - ${req.method} ${JSON.stringify(headerAndBody, null, 2)}`);
            randomResponse(res);
        }catch(e){
            handleError(res, e);
        }

    });

    router.post("/operation_status", (req: Request, res: Response) => {
        try{
            const headerAndBody = extractHeaderAndBody(req);
            logger.info(`${req.url} - ${req.method} ${JSON.stringify(headerAndBody, null, 2)}`);
            randomResponse(res);
        }catch(e){
            handleError(res, e);
        }
    });

    router.post("/operation_batch_status", (req: Request, res: Response) => {
        try {
            const headerAndBody = extractHeaderAndBody(req);
            logger.info(`${req.url} - ${req.method} ${JSON.stringify(headerAndBody, null, 2)}`);
            randomResponse(res);
        }catch(e){
            handleError(res, e);
        }

    });

    return router;
}