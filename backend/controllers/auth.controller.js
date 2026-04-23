import bcrypt from 'bcrypt';
import { readUsersFile, writeUsersFile } from '../utils/userStorage.js';


export const getUsers = async (req, res) => {
    try {
        const usersData = await readUsersFile();

        res.status(200).json({
            message: "Data successfully loaded",
            usersData,
        });

    } catch (err) {
        res.status(500).send();
    }
};

export const signUp =  async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "fill all the blank" });
        }

        const usersData = await readUsersFile();

        //we check if user already exist
        const isUsernameExist = usersData.find(user => user.username === username);
        const isEmailExist = usersData.find(e => e.email === email);

        if (isUsernameExist || isEmailExist) {
            return res.status(409).json({
                message: "user already exist!",
            });
        }

        //password hashing
        const salt = await bcrypt.genSalt(); //this is for adding salt(a unique thing to the hash)
        const hashedPassword = await bcrypt.hash(password, salt);// this is for hashing the password and it takes 2 params : password and, salt.

        const newUser = {
            username,
            email,
            password: hashedPassword
        }
        usersData.push(newUser);
        await writeUsersFile(usersData);

        res.status(201).json({
            message: 'new user successfully created',
            user: { username, email}
        });

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({
            message: "server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "fill all the blank!",
            });
        }

        const usersData = await readUsersFile();

        const userInfo = usersData.find((u) => u.username === username);

        if (!userInfo) {
            return res.status(400).json({
                message: "User not found! Try again",
            });
        }
            const isMatch = await bcrypt.compare(password, userInfo.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "User not found! Try again",
            });
        }

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({
            message: "server error",
        });
    }
};
