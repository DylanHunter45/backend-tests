import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// registering new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        const insertUser = db.prepare(
            `INSERT INTO USERS (username, password) VALUES (?, ?)`,
        )
        const result = insertUser.run(username, hashedPassword)

        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(
            `INSERT INTO todos (user_id, task) VALUES (?, ?)`,
        )
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        const token = jwt.sign(
            { id: result.lastInsertRowid },
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
        )
        res.json({ token })
    } catch (error) {
        console.error('Error registering user:', error)
        return res.status(503)
    }
})

// logging in user
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    res.sendStatus(200)
})

export default router
