const express = require("express")
const router = express.Router()
const Books_Controller = require("../Controllers/Books")

// /books
router.get("/", (req, res) => {
    res.send("booking ok...")
})
router.get("/new", async (req, res) => {
    res.render("newBook",
        {
            admin_fullname: res.user.realFirstname + " " + res.user.realLastname,
            admin_username: res.user.realStudentsID
        }
    );

})

router.post("/new", async (req,res)=>{
    const book = {
        title:req.body.title,
        category:req.body.category,
        quantity:req.body.quantity,
        author:req.body.author,
    }

    Books_Controller.addBook(book);

    res.render("newBook" ,{message:"\" " +req.body.title + " \" is added successfully"})
})

router.get("/all",async (req,res)=>{
    const allBooks = await Books_Controller.allBooks();
   
    res.send(allBooks)
})

module.exports = router
