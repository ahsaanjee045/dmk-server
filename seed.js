const mongoose = require("mongoose");
const Product = require("./models/product.model");

const products = [
    {
        name: "Allen Solly Men's Casual Jacket",
        description: `Care Instructions: Machine Wash
        Fit Type: Regular
        Occasion : Casual
        Material : 100% Polyester
        Pattern : Solid`,
        image: Date.now() + "-" + Math.round(Math.random() * 1e9) + "-allen.jpg",
        price: 1449,
        category: "6579598817db15365f879cf7",
        brand: "Allen",
        inStock: 10,
    },
    {
        name: "Leather Retail Suede Faux Leather Jacket For Men's",
        description: `Easy to wear and versatile as casual wear, office wear, travel etc
        This Jacket Is Really Good In Quality And Gives You A Very Decent Look. It Looks Good In Casual Party And Formal Wear Both
        Trendy Jacket For Mens; Team It Up With A Pair Of Joggers Or Denim Pants To Look Smart And Casual.`,
        image:
            Date.now() + "-" + Math.round(Math.random() * 1e9) + "-leather.jpg",
        price: 1685,
        category: "6579598817db15365f879cf7",
        brand: "Allen",
        inStock: 15,
    },
    {
        name: "Ben Martin Men's Relaxed Fit Jeans",
        description: `Style : Casual Wear. Material : Denim Jeans. Wash Care Instructions Do Not Bleach, Dry In Shade.
        WHAT YOU SEE IS WHAT YOU GET: We strive to make our colors as accurate as possible. Due to monitor settings, monitor pixel definitions, we cannot guarantee that the color you see on your screen as an exact color of the product.
        QUALITY GUARANTEED: This men's Jeans is made with 100% pre-shrunk and pill-resistant cotton. High quality, very stretchy. Still perfect fit even after the wash. Disclaimer : Kindly Refer To The Size Chart (Also In Images) For Fiting Measurements.`,
        image:
            Date.now() + "-" + Math.round(Math.random() * 1e9) + "-martin.jpg",
        price: 650,
        category: "6579595c17db15365f879cf5",
        brand: "Ben Martin",
        inStock: 20,
    },
    {
        name: "Billford Men Jeans",
        description: `STRETCH COMFORT: These Basic jeans are constructed from a perfect blend of stretch-cotton fabric, which maximizes freedom of movement and ensures comfortable wear all day long.
        FASHION TREND DESIGN: With a nice cutting and good version style, there is a variety of colors and styles for you to choose from. The personalized and unique design exudes basic casual jeans, making you look more handsome and the coolest guy on every occasion.`,
        image: Date.now() + "-" + Math.round(Math.random() * 1e9) + "-bill.jpg",
        price: 650,
        category: "6579595c17db15365f879cf5",
        brand: "BillFord",
        inStock: 15,
    },
    {
        name: "DHRUVI TRENDZ Men Shirt",
        description: `Fabric:- Rayon Stylish Shirt || Print:- Tropical Leaf Printed Shirt For Boy || Package Contain:- 1 Casual Shirt For Men.
        Sleeves:- Preppy Short Sleeve Stylish Shirt For Men || Neck:- Turn-Down Collar shirt for boys || Patten:- Shirt has a full button placket and a curved hem design.
        Occasion:- Casual Wear|| Beach Wear || Office Wear|| Formal wear|| Evening wear|| Work Wear|| Party Wear|| Regular Outing Wear|| Business Wear|| Regular Wear || Professional Wear, Please Click On Brand Name "DHRUVI TRENDZ" For More Products.`,
        image:
            Date.now() + "-" + Math.round(Math.random() * 1e9) + "-dhruvi.jpg",
        price: 300,
        category: "657957e117db15365f879ce7",
        brand: "Dhruvi Trendz",
        inStock: 30,
    },
];

mongoose.connect("mongodb://127.0.0.1:27017/dmkecom").then(async () => {
    console.log("Connected to Mongodb");
    await Product.deleteMany({})
    let res = await Product.insertMany(products);
    console.log(res);
});
