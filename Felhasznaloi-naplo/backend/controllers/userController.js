import * as users from "../util/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const getUserById = (req, res) => {
  const id = req.params.userId;
  const user = users.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
};

export const getUserByEmail = (req, res) => {
  const email = req.params.email;
  if(!email.match(regex))
  {
    return res.status(401).json({ message: "invalid credentials" });
  }
  const user = users.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
};

export const saveUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "missing data" });
  }
   const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
  const result = users.saveUser(name, email, hashedPassword);
  res.status(201).json(result);
};

export const patchUser = (req, res) => {
  const id = +req.params.userId;
  const user = users.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { name, email, newPassword, password } = req.body;

  if(password && !bcrypt.compareSync(password, user.password))
  {
    return res.status(401).json({message:"Invalid credentials"})
  }
let hashedPassword;
  if (password) {
    const salt = bcrypt.genSaltSync();
    hashedPassword = bcrypt.hashSync(newPassword, salt);
  }
 const result = users.updateUser(
    id,
    name || user.name,
    email || user.email,
    hashedPassword || user.password
  );
  if(result.changes > 0 )
  {res.status(200).json({ message: "Updated" });}
  else
  {
    res.status(400).json({message: "bad request"})
  }
};

export const deleteUser = (req, res) => {
  const id = +req.params.userId;
const result = users.deleteUser(id);

  if(result.changes > 0)
  {
      res.status(204).json({message: "deleted"});
  }
  else
  {
    res.status(404).json({ message: "User not found" })
  }
};

export const login = (req, res) => {
  const {email, password } = req.body;
  if(!email || !password)
  {
    return res.status(401).json({message : "invalid credentials"})
  }
  const user = users.getUserByEmail(email)
  if(!user)
  {
    return res.status(401).json({message : "invalid credentials"})
  }
  if(!bcrypt.compareSync(password, user.password))
  {
    return res.status(401).json({message : "invalid credentials"})
  }
  const token = jwt.sign({ id: user.id, email: user.email }, "secret_key", {
      expiresIn: "1d",
    });
return res.status(200).json({token:token, userId :user.id})
}

export function auth(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = accessToken.split(" ")[1];
  const data = jwt.verify(token, "secret_key");
  const now = Math.floor(Date.now() / 1000);
  if (data?.exp < now) {
    return res.status(403).json({ message: "Token expired" });
  }
  req.userId = data.id;
  next();
}
