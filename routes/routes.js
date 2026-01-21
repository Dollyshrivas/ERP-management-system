const express = require("express");
const router = express.Router();
const productSchema = require("../models/productschema");
const paymentSchema = require("../models/paymentschema")

//show products 
router.get("/",async(req,res)=>{
    try{
        const product = await productSchema.find().sort({ createdAt: -1 });
        res.render("home",{ product });
    } catch(err){
        console.log(err);
        res.status(500).send("Server error")
    }
});

// ADD PRODUCTS

router.post("/products", async (req, res) => {
  try {
    const { Name, Role, Price } = req.body;

    await productSchema.create({
      Name,
      Role,
      Price,
    });

    req.session.message = {
      type: "success",
      message: "Product added successfully",
    };

    res.redirect("/");
  } catch (err) {
    req.session.message = {
      type: "danger",
      message: err.message,
    };
    res.redirect("/products");
  }
});


// UPDATE Product

router.post("/products/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Role, Price } = req.body;

    await productSchema.findByIdAndUpdate(id, {
      Name,
      Role,
      Price,
    });

    req.session.message = {
      type: "success",
      message: "Product updated successfully",
    };

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});


// DELETE Product

router.post("/products/delete/:id", async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.id);

    req.session.message = {
      type: "success",
      message: "product deleted successfully",
    };

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// listing products

router.get("/productdetail", async(req,res)=>{
  try {
    const product = await productSchema.find();
    res.render("product_detail", { product });
  } catch(err){
    console.log(err);
    res.status(500).send("Server Error");
  }
})

//buy button
router.get("/buybutton", async (req, res) => {
  try {
    const buyproduct = await productSchema.find();   // fetch jobs
    res.render("buy", { buyproduct });     // PASS jobs to EJS
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//transition form
router.post("/paymentform", async (req, res) => {
  try {
    const { employeeName, amount, paymentMode, remarks, productId } = req.body;

    await paymentSchema.create({
      employeeName,
      amount,
      paymentMode,
      remarks,
      productId
    });

    req.session.message = {
      type: "success",
      message: "Product added successfully",
    };

    res.redirect("/submittedtransition");
  } catch (err) {
    console.log(err)

    req.session.message = {
      type: "danger",
      message: err.message,
    };
    res.redirect("/paymentform");
  }
});
//Submmited transition
router.get("/submittedtransition", (req,res)=>{
  res.send("Submitted succesfully!!")
})

router.get("/payroll",(req,res)=>{
  res.render("payroll")
})


module.exports = router;