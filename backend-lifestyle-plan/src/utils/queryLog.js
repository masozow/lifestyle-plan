"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var logDBconfig_js_1 = require("./logDBconfig.js");
/**
 * Retrieves logs from the database.
 *
 * @param {string} [level] - Filter logs by level (optional).
 * @param {number} [userId] - Filter logs by user ID (optional).
 * @returns {Promise<Array>} List of logs.
 */
var queryLog = function (level, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var db, logs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                return [4 /*yield*/, (0, logDBconfig_js_1.default)()];
            case 1:
                db = _a.sent();
                logs = void 0;
                if (!(level && userId)) return [3 /*break*/, 3];
                return [4 /*yield*/, db.all("SELECT * FROM logs WHERE level = ? AND user_id = ? ORDER BY timestamp DESC", level, userId)];
            case 2:
                logs = _a.sent();
                return [3 /*break*/, 9];
            case 3:
                if (!level) return [3 /*break*/, 5];
                return [4 /*yield*/, db.all("SELECT * FROM logs WHERE level = ? ORDER BY timestamp DESC", level)];
            case 4:
                logs = _a.sent();
                return [3 /*break*/, 9];
            case 5:
                if (!userId) return [3 /*break*/, 7];
                return [4 /*yield*/, db.all("SELECT * FROM logs WHERE user_id = ? ORDER BY timestamp DESC", userId)];
            case 6:
                logs = _a.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, db.all("SELECT * FROM logs ORDER BY timestamp DESC")];
            case 8:
                logs = _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, logs];
            case 10:
                error_1 = _a.sent();
                console.error("Error when retrieving logs:", error_1.message);
                return [2 /*return*/, []];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.default = queryLog;
