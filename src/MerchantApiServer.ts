
import {CONFIG} from "wallet-manager-client-utils";
import {WalletManagerClient} from "wallet-manager-client/dist";
import { default as express, Request, Response } from 'express';
import {ExpressVerifier} from "wallet-manager-client-utils/dist/src/utils/ExpressVerifier";
import { MerchantRouter } from "./routers/MerchantRouter";
import { AccessRouter } from "./routers/AccessRouter";


const app = express();

//const identity = EthCrypto.createIdentity();
const {identity} = CONFIG;
const {privateKey} = identity;
const {clientConfig} = CONFIG;
const {serverPort, whiteListedAddresses} = CONFIG.serverConfig;


const client: WalletManagerClient = new WalletManagerClient(privateKey, clientConfig);

const utils = client.utils;
identity.publicKey = identity.publicKey || utils.publicKey;
identity.address = identity.address || utils.address;


const verifier = new ExpressVerifier(utils, whiteListedAddresses);

app.get("/keys", (req:Request, res:Response) => {
    res.json(identity);
});

// add verify middleware
verifier.addVerifier(app, "/merchant");
app.use("/merchant", MerchantRouter());

app.use("/access", AccessRouter(client));

app.all('*', function(req:Request, res:Response){
    res.status(404).send({error:{code:404, message:"Not Found"}});
});

// start the express server
export const MerchantApiServer = () => {
    app.listen(serverPort, () => {
        console.log(`server started at http://localhost:${serverPort}`);
    });
};
