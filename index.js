require("dotenv").config();


const express=require("express")
const app=express();
const mysql=require("mysql2");

app.set("view engine","ejs");

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


const connection = mysql.createConnection({
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: process.env.MYSQLPORT || process.env.DB_PORT,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:");
        console.error(err);
    } else {
        console.log("✅ Connected to Railway MySQL");
    }
});

app.get("/",(req,res)=>{
    let q='select count(*) as count from users';//result = [{count: 49}]; this is the output of this query,you can see how data is returning by this line  console.log(result)    
    connection.query(q,(err,result)=>{
    if (err){
        console.log(err);
        return res.send(err)
    }
        let count = result[0].count;//here i store the count of total users in count variable , // mysql2 converts the SQL result into a JavaScript array of objects.
        res.render("home",{count});
    });
})

app.get("/users",(req,res)=>{
    connection.query('select * from users',(err,result)=>{
        if (err){
            console.log(err);
            return res.send(err)
        }
          res.render("users",{users:result});//here i sending enter array with an multiple objects
    });
});


app.get("/users/new", (req, res) => {
    res.render("new");
});

app.post("/users",(req,res)=>{
    let{username,email}=req.body;
    let q=`insert into users
        (username,email)
        values
        (?,?)`;
    connection.query(q,[username,email],(err,result)=>{
        if(err){
            return res.send(err)
        }
        res.redirect("/users")
    })    
})


app.get("/users/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select * from users where id=?`;
    connection.query(q,[id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.render("edit",{user:result[0]})
        }
    })
})

app.get("/users/:id",(req,res)=>{
    let id =req.params.id;
    let q=`select * from users where id=?`;
    connection.query(q,[id],(err,result)=>{
        if(err){
             console.log(err);
            return res.send(err)
        }
        res.render("detail",{user:result[0]})
    })
});

app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { username, email } = req.body;
    let q=`update users 
           set 
           username=?,
           email=?
           where id=? `;
    connection.query(q,[username, email, id],(err,result)=>{
        if(err){
            res.send(err)
        }
        res.redirect(`/users/${id}`)
    })
});

app.delete("/users/:id", (req, res) => {
    let { id } = req.params;

    let q = "DELETE FROM users WHERE id = ?";

    connection.query(q, [id], (err, result) => {
        if (err) {
            return res.send(err);
        }

        res.redirect("/users");
    });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});