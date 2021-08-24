const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const activationTokenMail = require("../utils/mail/activationTokenMail.js");
const forgotPassMail = require("../utils/mail/forgotPassMail.js")
const resetPassMail = require("../utils/mail/resetPassMail.js")
const sendMail = require("../utils/sendMail");

const { CLIENT_URL, CONTACT_US } = process.env

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async register(req, res) {
    try {
      let { name, email, password, cPassword } = req.body;
      let error = {};
      if (!name || !email || !password || !cPassword) {
        error = {
          ...error,
          name: "Filed must not be empty",
          email: "Filed must not be empty",
          password: "Filed must not be empty",
          cPassword: "Filed must not be empty",
        };
        return res.json({ error });
      }
      if (name.length < 3 || name.length > 25) {
        error = { ...error, name: "Name must be 3-25 charecter" };
        return res.json({ error });
      } else {
        // If Email & Number exists in Database then:
        try {
          password = bcrypt.hashSync(password, 10);
          const data = await userModel.findOne({ email: email });
          if (data) {
            error = {
              ...error,
              password: "",
              name: "",
              email: "Email already exists",
            };
            return res.json({ error });
          } else {
            const newUser = {
              name,
              email,
              password,
              // ========= Here role 1 for admin signup role 0 for customer signup =========
              userRole: 0, // Field Name change to userRole from role
            }
            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activation/${activation_token}`
            const subjectMail = 'Confirm your email address'
            const message = activationTokenMail(name, url, CONTACT_US)
            sendMail({ to: email, subject: subjectMail, text: message })

            res.json({ success: "Please activate your email to start." })
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }

  async activateEmail(req, res) {
    try {
      const { activation_token } = req.body
      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
      if (!user) return res.status(400).json({ msg: "This user not exists." })
      const { name, email, password, userRole } = user
      let newUser = new userModel({
        name,
        email,
        password,
        userRole,
      });
      newUser
        .save()
        .then((data) => {
          const token = jwt.sign({ _id: data._id, role: data.userRole }, JWT_SECRET)
          const encode = jwt.verify(token, JWT_SECRET)
          return res.json({
            token: token,
            user: encode
          })
        })
        .catch((err) => {
          return res.json({ error: "Alread exit your email!" })
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  /* User ForgotPassword controller  */
  async forgotPassword(req, res) {
    let { email } = req.body;
    if (!email) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email })
      if (!data) {
        return res.json({
          error: "Invalid email!",
        });
      } else {
        const access_token = createAccessToken({ id: data._id, email })
        const url = `${CLIENT_URL}/user/reset/${access_token}`
        const subjectMail = 'Reset Your Password'
        const message = forgotPassMail(url, CONTACT_US)
        sendMail({ to: email, subject: subjectMail, text: message })

        res.json({ success: "Re-send the password, please check your email." })
      }
    } catch (err) {
      res.json({ error: err.message })
    }
  }

  /* User ResetPassword controller  */
  async resetPassword(req, res) {
    try {
      const { password } = req.body
      const passwordHash = await bcrypt.hash(password, 10)
      await userModel.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      )
      const url = `${CLIENT_URL}/`
      const subjectMail = 'Reset Your Password'
      const message = resetPassMail(url)
      sendMail({ to: req.user.email, subject: subjectMail, text: message })

      res.json({ success: "Your password has been reset successfully. Please Check Email..." })
    } catch (err) {
      res.json({ error: err.message })
    }
  }

}


const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '10m' })
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}


const authController = new Auth();
module.exports = authController;
