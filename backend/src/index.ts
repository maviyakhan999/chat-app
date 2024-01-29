import express from "express";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import cors from "cors";

const Prisma = new PrismaClient();

const app = express();
app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const isUserExist = await Prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isUserExist !== null) {
      return res.json({
        message: "user already exist",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await Prisma.user.create({
      data: {
        name: req.body.name,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userid: user.id },
      "hsadhajkshdjakshdashdjkshdakhdkjashdjksa"
    );

    return res.json({
      token: token,
      status: "success",
    });
  } catch (error) {
    return res.json({
      message: (error as Error).message,
      status: "fail",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Prisma.user.findFirst({
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

    const isPasswordSame = await argon2.verify(user.password, password);

    if (isPasswordSame === false) {
      return res.json({
        status: "fail",
        message: "tm bhdwe ho",
      });
    }

    const token = jwt.sign(
      { userid: user.id },
      "hsadhajkshdjakshdashdjkshdakhdkjashdjksa"
    );

    return res.json({
      token: token,
      status: "success",
    });
  } catch (error) {
    return res.json({
      message: (error as Error).message,
      status: "fail",
    });
  }
});




app.listen(4000, () => {
  console.log(`API listening on port 4000`);
});
