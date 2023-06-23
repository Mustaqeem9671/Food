



const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`,
    });
  }
});

const listAllUsers = async (nextpagetoken) => {
  return new Promise((resolve, reject) => {
    const processUsers = (listuserresult) => {
      listuserresult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listuserresult.pageToken) {
        admin
          .auth()
          .listUsers(1000, listuserresult.pageToken)
          .then(processUsers)
          .catch(reject);
      } else {
        resolve(data);
      }
    };

    admin
      .auth()
      .listUsers(1000, nextpagetoken)
      .then(processUsers)
      .catch(reject);
  });
};

router.get("/all", async (req, res) => {
  try {
    if (data.length === 0) {
      data = await listAllUsers();
    }
    const dataCount = data.length;
    return res.status(200).send({ success: true, data: data, dataCount });
  } catch (er) {
    return res.send({ success: false, msg: `Error in listing users: ${er}` });
  }
});

//delete a user from the 
router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
await db.collection("users").doc(`/${userId}/`).delete().then(result => {
  return res.status(200).send({ success: true, data: result });

});
  } catch (err) {
    return res.send({ success: false, msg: `error :${err}` });

  }
});

module.exports = router;

