const express = require("express")
const router = express.Router()
const UsersModel = require("../models/users")
const bcrypt = require("bcrypt")
const passwordCheck = require("../utils/passwordCheck")

router.get("/", async (req, res) => {
  const users = await UsersModel.findAll()
  res.status(200).json({
    data: users,
    metadata: "test user Endpoint",
  })
})

router.post("/", async (req, res) => {
  const { nip, nama, password } = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  const users = await UsersModel.create({
    nip,
    nama,
    password: encryptedPassword,
  })
  res.status(200).json({
    data: users,
    metadata: "add user Endpoint",
  })
})

router.put("/", async (req, res) => {
  const { nip, nama, password, passwordBaru } = req.body
  // const userData = await UsersModel.findOne({ where: { nip: nip } })
  // const compare = await bcrypt.compare(password, userData.password)

  const check = await passwordCheck(nip, password)

  const encryptedPassword = await bcrypt.hash(passwordBaru, 10)

  if (check.compare === true) {
    const users = await UsersModel.update(
      {
        nama,
        password: encryptedPassword,
      },
      { where: { nip: nip } }
    )
    res.status(200).json({
      users: { updated: users[0] },
      metadata: "user updated! 😊😁",
    })
  } else {
    res.status(400).json({
      error: "data invalid",
    })
  }
})

router.post("/login", async (req, res) => {
  const { nip, password } = req.body
  // const users = await UsersModel.findOne({ where: { nip: nip } })
  // const compare = await bcrypt.compare(password, users.password)

  const check = await passwordCheck(nip, password)

  if (check.compare === true) {
    res.status(200).json({
      users: check.userData,
      metadata: "login success",
    })
  } else {
    res.status(400).json({
      error: "data invalid",
    })
  }
  //   const users = await UsersModel.create(
  //     {
  //       nip,
  //       password: encryptedPassword,
  //     },
  //     { where: { nip: nip } }
  //   )
})

module.exports = router
