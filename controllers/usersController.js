const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;
const path = require("path")
const fs = require("fs/promises")


const pathAvatar = path.join(__dirname, '../public/avatar')


async function signup(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({ message: `User with '${email}' already exists` });
      return;
    }

    const avatar = gravatar.url(email);

    const newUser = new User({
      name,
      email,
      password,
      avatar,
    });

    await newUser.hashPassword(password);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({ user: { name, email, avatar }, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const comparedPass = await user.comparePassword(password);

    if (!comparedPass) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ user: { name: user.name, email, avatar: user.avatar }, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function logout(req, res) {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
}

async function current(req, res, next) {
  const { name, email } = req.body;

  res.json({ name, email });
}

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: filePath, originalname } = req.file;

  const newName = `${_id}_${originalname}`

  const newPath = path.join(pathAvatar, newName)

  await fs.rename(filePath, newPath);

  const avatarPathNew = path.join("avatar", newName)
  
    await User.findByIdAndUpdate(_id, { avatar: avatarPathNew});

  res.json({avatar:avatarPathNew})
}

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
};