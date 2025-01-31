
const express = require('express')
const { userModel } = require('./model')
const { Keypair } = require('@solana/web3.js')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
const JWT_SECRET = "1234567890"

app.post("/api/v1/signup", async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const keypair = new Keypair()

    await userModel.create({
        username,
        password,
        publicKey: keypair.publicKey,
        privateKey: keypair.secretKey.toString()
    })


    res.json({
        message: keypair.publicKey.toString()
    })
})

app.post("/api/v1/signin", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id:user
        }, JWT_SECRET)

        return res.json({
            token
        })
    } else {
        return res.status(403).json({
            message: "Credentials are invalid"
        })
    }


})

app.post("/api/v1/txn/sign", (req, res) => {
    res.json({
        message: "Sign up"
    })
})

app.get("/api/v1/txn", (req, res) => {
    res.json({
        message: "Sign up"
    })
})


app.listen(3000)