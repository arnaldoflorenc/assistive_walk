import prisma from '../database/prisma.js';
import bcrypt from 'bcryptjs';

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