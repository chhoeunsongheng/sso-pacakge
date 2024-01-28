"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = exports.configureAuth = void 0;
var authConfig_1 = require("./service/authConfig");
Object.defineProperty(exports, "configureAuth", { enumerable: true, get: function () { return authConfig_1.configureAuth; } });
var cognitoService_1 = require("./service/cognitoService");
Object.defineProperty(exports, "CognitoService", { enumerable: true, get: function () { return cognitoService_1.CognitoService; } });
