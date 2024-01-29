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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const Prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isUserExist = yield Prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (isUserExist !== null) {
            return res.json({
                message: "user already exist",
            });
        }
        const hashedPassword = yield argon2_1.default.hash(password);
        const user = yield Prisma.user.create({
            data: {
                name: req.body.name,
                email: email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userid: user.id }, "hsadhajkshdjakshdashdjkshdakhdkjashdjksa");
        return res.json({
            token: token,
            status: "success",
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            status: "fail",
        });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield Prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user === null) {
            return res.json({
                status: "fail",
                message: "invalid username/password",
            });
        }
        const isPasswordSame = yield argon2_1.default.verify(user.password, password);
        if (isPasswordSame === false) {
            return res.json({
                status: "fail",
                message: "tm bhdwe ho",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userid: user.id }, "hsadhajkshdjakshdashdjkshdakhdkjashdjksa");
        return res.json({
            token: token,
            status: "success",
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            status: "fail",
        });
    }
}));
app.listen(4000, () => {
    console.log(`API listening on port 4000`);
});
