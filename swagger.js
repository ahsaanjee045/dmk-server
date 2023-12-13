const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info : {
        title : "DMK Ecommerce Backend Documentation",
        description : "This is the documentation for the the DMK Ecommerce Backend"
    },
    host : "localhost:8000"
};

const outputFile = "./swagger-docs.json";
const routes = [
    "./routes/auth.routes.js",
    "./routes/category.routes.js",
    "./routes/product.routes.js",
];
swaggerAutogen(outputFile, routes, doc);
