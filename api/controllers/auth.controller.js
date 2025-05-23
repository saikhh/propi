import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  //db operations
  console.log(req.body);

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //HASH the password

    //create a new user

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.status(201).json({ message: "User created successfully " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to create an user" });
  }
};

export const login = async (req, res) => {
  //db operations

  const { username, password } = req.body;
  try {
    //check if the user exists or not

    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    // check if the password is correct

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials!" });

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    // res.setHeader("Set-Cookie", "test=" + "myValue").json({message:"success"})
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
      // secure:true //make sure to use this in production
    });
    res.send(user).status(200).json({ message: "Login successful " });
    //generate cookie token and send to the user suer JWT
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Failed to login" });
  }
};

export const logout = (req, res) => {
  //db operations Ï

  res.clearCookie("token").status(200).json({ message: "logout successful" });
};
