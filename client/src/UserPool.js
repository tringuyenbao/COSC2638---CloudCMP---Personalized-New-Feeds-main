import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-1_SLLz1b5NK",
    ClientId: "5dclt2p1qacj49m27rghkslv4a"
}

export default new CognitoUserPool(poolData);