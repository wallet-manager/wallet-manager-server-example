import {Constants, Header} from "wallet-manager-client-utils";
import { Request, Response } from 'express';
import { loggerFactory } from "../utils/Logger"
const logger = loggerFactory("HttpUtils");

export function extractHeader(req:Request): Header{
    const address = req.header(Constants.HEADER_ADDRESS);
    const sequence = req.header(Constants.HEADER_SEQUENCE);
    const session = req.header(Constants.HEADER_SESSION);
    const signature = req.header(Constants.HEADER_SIGNATURE);
    const timestamp = req.header(Constants.HEADER_TIMESTAMP);

    const header:Header = {
        address: address|| "",
        sequence: parseInt(sequence||"0" ),
        session: session||"",
        signature: signature || "",
        timestamp: parseInt(timestamp||"0")
    }
    return header;
}

export function extractHeaderAndBody(req:Request){
    const header:Header = extractHeader(req);
    const body = req.body || {};
    return {header, body};
}

export function handleError(res:Response, error:any){
    logger.error("Error", error);
    res.status(500).json({ error: {code:500, message:"Internal Error",data:error} });
}