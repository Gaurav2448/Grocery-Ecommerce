require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
const authRoute=require("./router/auth");
const contactRoute=require("./router/contact");
const serviceRoute=require("./router/service");
const adminRoute=require("./router/admin");
const ItemRoute=require("./router/item");
const connectDB=require("./util/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);
app.use("/api/item",ItemRoute);



app.use(errorMiddleware);

const PORT=5000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port ${PORT}`);
    })
});

