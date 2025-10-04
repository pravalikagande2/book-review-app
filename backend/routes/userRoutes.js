import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';

// When a POST request is made to '/register', call the registerUser function
router.post('/register', registerUser);

// We will build the login route next
router.post('/login', loginUser);

export default router;