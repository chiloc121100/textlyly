const { Sign } = require("crypto");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const fs = require("fs");
const User = require("../model/User");
const Product = require("../model/Product");
const Category = require("../model/Category");

//-------------------------------------------


router.get("/", LoginHome);
router.post("/", getLogin);
async function LoginHome(yeucau, trave) {
    try {
        // if(yeucau.session.TenTK)
        // {
        //     trave.send('<h2>You have accessed Secret Page</h2>');
        // }
        // let dssp = await User.find({});
        //console.log(yeucau.query);
        //console.log(dssp);
        // trave.render("login", {Cac: dssp});
        // trave.render("/User",{TenTK:yeucau.session.TenTK});
        if(yeucau.session.TenTK)
        {
            let data = await User.findOne({ TK : yeucau.session.TenTK})
            console.log(data);
            trave.render("userviewhomepage", {data : data});
        }
        else
        {
            trave.render("login");
        }
    } catch (error) {
        console.log(error);
    }
}

async function getLogin(yeucau, trave) {
    try {
        let tempusername = yeucau.body.username;
        let temppassword = yeucau.body.password;
        // yeucau.session.TenTK = yeucau.body.username;
        // yeucau.session.MatKhau = yeucau.body.password;
        // console.log(yeucau.session.TenTK);
        // console.log(yeucau.session.MatKhau);
        await User.findOne({ TK: yeucau.body.username }).exec((loi, tempuser) => {
            if (loi) { console.log(loi); return; }
            if (!tempuser) { console.log('username' + tempusername + 'not found !'); trave.redirect("/User"); return; }
            if (tempuser) { console.log('username ' + tempusername + ' checking password'); }
            if (tempuser.MK !== temppassword) { console.log(temppassword + 'password wrong'); trave.redirect("/User"); return; }
            if (tempuser.MK === temppassword) { console.log('user ' + tempuser.TK + ' login ok'); 
            yeucau.session.TenTK = yeucau.body.username;
            yeucau.session.MatKhau = yeucau.body.password;
            trave.redirect("/User/Userhomepage");
            return; }
        }
        );
        // trave.redirect("/User");
    } catch (error) {
        console.log(error);
    }
}

router.get('/logout', (req, res) => {
    if (req.session.TenTK) {
        req.session.destroy()
        res.clearCookie('connect.sid') // clean up!
        res.redirect("/User/Userhomepage");
    } else {
        res.redirect("/User/Userhomepage");
    }
})

router.get("/signup", (yeucau, trave) => {
    trave.render("signup");
});

router.post("/signup", (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    signup = new User(yeucau.body);

    signup.save();
    trave.render("login");
});

//home
router.get( "/Userhomepage" , PCHome);
async function PCHome(yeucau, trave) {
    try {
        if(yeucau.session.TenTK)
        {
            let data = await User.findOne({ TK : yeucau.session.TenTK})
            console.log(data);
            let dssp = await Product.find({});
            console.log(dssp);
            let temptestlogin = true;
            trave.render("userviewhomepage", {dssp,data,temptestlogin});
        }
        else
        {
            let dssp = await Product.find({});
            console.log(dssp);
            trave.render("userviewhomepage", {dssp: dssp});
        }
    } catch (error) {
        console.log(error);
    }
}
//products
router.get( "/products" , showproducts);
async function showproducts(yeucau, trave) {
    try {
        if(yeucau.session.TenTK)
        {
            let data = await User.findOne({ TK : yeucau.session.TenTK})
            let dssp = await Product.find({});
            let dscate = await Category.find({});
            console.log(dscate);
            let temptestlogin = true;
            trave.render("products", {dscate,dssp,data,temptestlogin});
        }
        else
        {
            let dscate = await Category.find({});
            let dssp = await Product.find({});
            console.log(dssp);
            trave.render("products", {dscate,dssp});
        }
    } catch (error) {
        console.log(error);
    }
}
//product detail
router.get( "/productdetail/:id" , showproductdetail);
async function showproductdetail(yeucau, trave) {
    try {
        if(yeucau.session.TenTK)
        {
            let data = await User.findOne({ TK : yeucau.session.TenTK})
            let dssp = await Product.findOne({_id : yeucau.params.id});
            console.log(dssp);
            let temptestlogin = true;
            trave.render("productdetail", {dssp,data,temptestlogin});
        }
        else
        {
            let dssp = await Product.findOne({_id : yeucau.params.id});
            console.log(dssp);
            trave.render("productdetail", {dssp: dssp});
        }
    } catch (error) {
        console.log(error);
    }
}
// category
router.get( "/categorysp/:id" , categoryspa);
async function categoryspa(yeucau, trave) {
    try {
        if(yeucau.session.TenTK)
        {
            let data = await User.findOne({ TK : yeucau.session.TenTK})
            const tempcate = yeucau.params.id;
            console.log("\n BODY: ", yeucau.body);
            console.log("\n Params: ", yeucau.params);
            console.log("\n Query: ", yeucau.query);
            let dssp = await Product.find({Category : tempcate})
            let dscate = await Category.find({})
            let temptestlogin = true;
            trave.render("usercategory", {dscate,dssp,data,temptestlogin});
        }
        else
        {
            const tempcate = yeucau.params.id;
            let dscate = await Category.find({});
            let dssp = await Product.find({Category : tempcate})
            console.log(dssp);
            trave.render("usercategory", {dscate,dssp});
        }
    } catch (error) {
        console.log(error);
    }
}

//cart
router.post( "/cart" , carta);
async function carta(yeucau, trave) {
    try {
        console.log("\n BODY: ", yeucau.body);
        console.log("\n Params: ", yeucau.params);
        console.log("\n Query: ", yeucau.query);
        let tempProduct = await Product.findOne({_id : yeucau.body.idProduct});
        if(!yeucau.session.cart)
        {
            yeucau.session.cart = [];
        }
            yeucau.session.cart.push(tempProduct);
            trave.redirect("/User/products")
    } catch (error) {
        console.log(error);
    }
}
router.get( "/cart" , getcarta);
async function getcarta(yeucau, trave) {
    trave.render("cart", {datacart:yeucau.session.cart});
}
//deletecart
router.get("/deletecart/:id", function (yeucau, trave, next) {
    let value = yeucau.params.id;
    console.log("id = " + yeucau.params.id);
    for( var i = 0; i < yeucau.session.cart.length; i++){ 
    
        if ( yeucau.session.cart[i]._id === yeucau.params.id) { 
    
            yeucau.session.cart.splice(i, 1); 
        }
    
    }
    trave.redirect("/User/cart");
  })
//-------------------------------------------
exports.UserRouter = router;
