import 'whatwg-fetch'

import {Common} from 'soDevLib'

const globals = require("../../../../../../../config/" + process.env.NODE_ENV + "/Portal/globals");
const API_URL = globals.smartaUrl + '/sabc0105/';

let APIs = {
    selectData(pParam) {
        let param = [];
        param.fromyn = pParam.fromYn;
        param.toyn = pParam.toYn;

        return Common.API.GET(API_URL, param);
    },

    deleteCheckData(pParam){
        return Common.API.POST(API_URL + "delcheck/", pParam);
    },

    insertData(pParam){
        return Common.API.POST(API_URL, pParam);
    },

    updateData(pParam){
        return Common.API.PUT(API_URL, pParam);
    },

    deleteData(pParam){
        return Common.API.DELETE(API_URL, pParam);
    },
    SelectAllTrade(){
        return Common.API.GET(API_URL + "codehelp/trade/");
    }
};

export default APIs;