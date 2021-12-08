const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const Students_Controller = require("./../Controllers/students")

// /login
router.get("/", (req, res) => {

    // res.render("login");

    const token = req.cookies.token;

    jwt.verify(token, "Dereje", (err, verified) => {
        //if jwt token unsuccessfully verified
        if (err) {
            res.render("login")
            console.log("invalid jwt token...rendering to login page")
        } else {
            console.log("welcome")
            //if jwt token verified successfully....
            //res.send("welcome...." + verified.username + "<br>" + "welcome...." + verified.password)
            res.user = verified;
            res.redirect(303, "admin")
        }
    })
});

router.post("/", async (req, res) => {
    let email = await req.body.email;
    let password = await req.body.password;

    if (email === undefined && password === undefined) {
        res.render("login", {message: "please enter correct email and password"})
        return;
    }

    const students = await Students_Controller.getStudents();
    let userFound = false;

    let realFirstname;
    let realLastname;
    let realStudentsID;
    let realDepartment;
    let realGender;
    let realPassword;

    students.forEach((value) => {
        if (email.toLowerCase() === value["studentID"].toLowerCase()
            && password.toLowerCase() === value["password"].toLowerCase()) {

            realFirstname = value["firstname"].toUpperCase();
            realLastname = value["lastname"].toUpperCase();
            realStudentsID = value["studentID"].toUpperCase();
            realDepartment = value["department"].toUpperCase();
            realGender = value["gender"].toUpperCase();
            realPassword = value["password"].toUpperCase();

            userFound = true;
            return;
        }
        if (userFound) return;
    })

    if (userFound) {
        console.log("authorized user.......")
        const realUser = {
            realFirstname,
            realLastname,
            realStudentsID,
            realDepartment,
            realGender,
            realPassword
        }
        jwt.sign(realUser, "Dereje", (err, token) => {
            console.log("the token is : " + token)
            res.cookie("token", token);
            res.redirect(303, "admin")
        })
    } else {
        console.log("unauthorized user....")
        let message = "Email and Password is not correct retry!"
        res.status(401).render("login", {message})
    }
})

module.exports = router;