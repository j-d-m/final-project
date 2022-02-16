const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    next();
  }
  //to extract token from header
  const token = authHeader.split(" ")[1]; // "Bearer tokenfsfsjfsf" ==> second one is token
  if (!token || token === "") {
    req.isAuth = false;
    next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.isAuth = false;
    next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    next();
  }
  //now here we have valid token
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
