import prisma from '../database/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;  //necessary fields for register an user
    const hashedPassword = await bcrypt.hash(password, 10); //hash the password before save in database
    
    if (!name || !email || !hashedPassword) { //check if all fields are filled, if not, return an error message
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const check_user = await prisma.user.findUnique({ //email has to be unique, so allways check if the email is 
        where: { email }                             // already in use before create a new user
        
    });
    if (check_user) {
        return res.status(400).json({ message: 'Email already in use' }); //error if email is already in use
    }

    const new_user = await prisma.user.create({ //create new user in database
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({ message: 'User registered successfully', user: new_user }); //return success message and the new user data
    } catch (error) {   //catch any error that may occur during the registration process and return an error message
        console.error('Error registering user:', error);  
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const check_pass = await bcrypt.compare(password, user.password);
        if (!check_pass) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Gerar token JWT
        const token = jwt.sign(
            {userId: user.id, email: user.email, name: user.name},
            process.env.JWT_SECRET || 'segredo_super_secreto',
            { expiresIn: '2h' }
        );   
        res.status(200).json({ message: 'User logged in successfully', token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error('Error Loggin in User:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserSubscription = async (req, res) => {
    try {
        const userID = req.user.userId;
        const subscription = await prisma.subscription.findUnique({ where: { userID: userID }, select: { plan: true, expiresAt: true, status: true} });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const fomated_date = subscription.expiresAt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        subscription.expiresAt = fomated_date;
        res.status(200).json(subscription);
    } catch (error) {
        console.error('Error fetching user subscription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerSubscription = async (req, res) => {
    try {
        const userID = req.user.userId;
        const {plan} = req.body;

        await prisma.$executeRaw`
            CALL CreateSubscription(${userID}, ${plan})
        `;

        res.status(201).json({ message: 'Subscription registered successfully'});
    } catch (error) {
        console.error('Error registering subscription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};