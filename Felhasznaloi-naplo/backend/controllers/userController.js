import * as users from "../util/user.js";
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const getUserById = (req, res) => {
  const id = req.params.id;
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
  const result = users.saveUser(name, email, password);
  res.status(201).json(result.lastInsertRowid);
};

export const patchUser = (req, res) => {
  const id = +req.params.id;
  const user = users.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { name, email, password } = req.body;

  users.updateUser(
    id,
    name || user.name,
    email || user.email,
    password || user.password
  );
  res.status(200).json({ message: "Updated" });
};

export const deleteUser = (req, res) => {
  const id = +req.params.id;
  users.deleteUser(id);
  res.status(204);
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
  if(user.password != password)
  {
    return res.status(401).json({message : "invalid credentials"})
  }
return res.status(200).json(user.id)
}
