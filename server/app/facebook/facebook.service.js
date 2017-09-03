"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//========imports
const config = require("config");
const request = require("request");
const Logger_1 = require("../utils/Logger");
const TAG = 'FacebookService';
//========config
const ENV = process.env.ENV || 'local';
const envConfig = config.get(ENV);
const clientId = envConfig.facebook.client_id;
const redirect_uri = envConfig.facebook.redirect_uri;
const clientSecret = envConfig.facebook.client_secret;
class FackbookService {
    static getConsentPageUrl() {
        return;
    }
    //     GET https://graph.facebook.com/v2.10/oauth/access_token?
    //    client_id={app-id}
    //    &redirect_uri={redirect-uri}
    //    &client_secret={app-secret}
    //    &code={code-parameter}
    static getAccessToken(code) {
        return new Promise((resolve, reject) => {
            let url = `https://graph.facebook.com/v2.10/oauth/access_token?` +
                'client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&client_secret=' + clientSecret + '&code=' + code;
            Logger_1.Logger.d(TAG, `** getting access token >${url}**`, 'gray');
            request.get(url, {
                // headers: headers,
                json: true,
            }, (err, response, body) => {
                if (!response || response.statusCode > 204) {
                    Logger_1.Logger.d(TAG, JSON.stringify(response), 'red');
                    reject(response.statusCode);
                }
                else {
                    const userCredentials = typeof body == 'string' ? JSON.parse(body) : body;
                    if (!userCredentials) {
                        reject(404);
                    }
                    resolve(userCredentials);
                }
            });
        });
    }
    static getUserInfo(accessToken) {
        //https://graph.facebook.com/me?access_token=...
        return new Promise((resolve, reject) => {
            let url = `https://graph.facebook.com/me?access_token=` + accessToken + '&fields=id,email,name,gender,link,picture&type=large';
            Logger_1.Logger.d(TAG, `**getting user info >${url}** `, 'gray');
            request.get(url, {
                // headers: headers,
                json: true,
            }, (err, response, body) => {
                if (!response || response.statusCode > 204) {
                    Logger_1.Logger.d(TAG, JSON.stringify(response), 'red');
                    reject(response.statusCode);
                }
                else {
                    const userCredentials = typeof body == 'string' ? JSON.parse(body) : body;
                    if (!userCredentials) {
                        reject(404);
                    }
                    resolve(userCredentials);
                }
            });
        });
    }
}
exports.FackbookService = FackbookService;
