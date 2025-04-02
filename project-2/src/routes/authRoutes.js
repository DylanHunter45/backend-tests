import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// registering new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const hashedPassword = bcrypt.hash(password, 10)
    console.log(username, hashedPassword)
    res.sendStatus(201)
})

// logging in user
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    res.sendStatus(200)
})

export default router
