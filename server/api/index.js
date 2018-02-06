import { Router } from 'express'

import newsRouter from './news';
import users from './users'

const router = Router()

// Add USERS Routes
router.use(newsRouter)
router.use(users)

export default router
