import { default as express, Request, Response } from 'express';
import { handleError} from "../utils/HttpUtils";
import bodyParser from 'body-parser';
import { WalletManagerClient } from "wallet-manager-client/dist";
import { loggerFactory } from "../utils/Logger"
const logger = loggerFactory("AccessRouter");

function logRequest(name: string, req: unknown) {
    logger.info(`Request => ${name} ${JSON.stringify(req, null, 2)}`);
}

function logResponse(name: string, res: unknown) {
    logger.info(`Response <= ${name} ${JSON.stringify(res, null, 2)}`);
}


export function AccessRouter(client: WalletManagerClient) {

    const router = express.Router();

    router.use(bodyParser.json());

    router.post("/get_address", async (req: Request, res: Response) => {
        try{
            const body = req.body;
            logRequest("Get address", body);
            const response = await client.getAddress(body);
            logResponse("Get address", response);
            res.json(response);
        }catch(e){
            handleError(res, e);
        }
    });

    router.post("/batch_withdraw", async (req: Request, res: Response) => {
        try{
            const body = req.body;
            logRequest("Get batch withdraw", body);
            const response = await client.batchWithdraw(body);
            logResponse("Get batch withdraw", response);
            res.json(response);
        }catch(e){
            handleError(res, e);
        }
    });

    router.post("/batch_sweep", async (req: Request, res: Response) => {
        try{
            const body = req.body;
            logRequest("Get batch sweep", body);
            const response = await client.batchSweep(body);
            logResponse("Get batch sweep", response);
            res.json(response);
        }catch(e){
            handleError(res, e);
        }
    });

    // query deposit by address
    router.get('/:chain_type/:chain_id/transfer/addr/:address/deposit/:asset_name', async (req, res) => {
        try{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any = { ...req.params, ...req.query };
            logRequest("Query deposit by address", params);
            const response = await client.getDepositByAddress(params);
            logResponse("Query deposit by address", response);
            res.send(response)
        }catch(e){
            handleError(res, e);
        }
    });

    // query deposit by hash
    router.get('/:chain_type/:chain_id/transfer/hash/:tx_hash/deposit', async (req, res) => {
        try{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any = { ...req.params, ...req.query };
            logRequest("Query deposit by hash ", params);
            const response = await client.getDepositByHash(params);
            logResponse("Query deposit by hash", response);
            res.send(response)
        }catch(e){
            handleError(res, e);
        }
    });


    // query withdraw by merchant order id
    router.get('/withdraw/order/:merchant_order_id', async (req, res) => {
        try{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any = { ...req.params, ...req.query };
            logRequest("Query withdraw by merchant order id", params);
            const response = await client.getWithdrawByOrderId(params);
            logResponse("Query withdraw by merchant order id", response);
            res.send(response)
        }catch(e){
            handleError(res, e);
        }
    });
    
    // query withdraw by batch id
    router.get('/withdraw/batch/:batch_id', async (req, res) => {
        try{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params: any = { ...req.params, ...req.query };
            logRequest("Query withdraw by batch id", params);
            const response = await client.getWithdrawByOrderId(params);
            logResponse("Query withdraw by batch id", response);
            res.send(response);
        }catch(e){
            handleError(res, e);
        }
    });

    return router;

}