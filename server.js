const express = require('express');
const usermodel = require('./models/user'); // Import User model
const user = require('./models/user');

const app = express();

// Set EJS as View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {    
    res.render('index');
});

// Create User
app.post('/create', async (req, res) => {    
    try {
        let { email, name, password } = req.body;
        await usermodel.create({ email, name, password });

        res.redirect('/user');  // ✅ Redirect to users list page after creation
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user");
    }
});

// Get All Users
app.get('/user', async (req, res) => {    
    try {
        let users = await usermodel.find({});
        res.render('user', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
});

app.get("/delete", async (req, res) => {
    let { email } = req.query;
    await usermodel.findOneAndDelete({ email });
    res.redirect("/user"); 
});
app.get("/edit", async (req, res) => {
    let { email } = req.query; // Get email from URL query
    let user = await usermodel.findOne({ email: email }); // Find user

    if (!user) {
        return res.send("User not found");
    }

    res.render("edit", { user }); // Render edit.ejs with user data
});


app.post("/update", async (req, res) => {
    let { oldEmail, name, email } = req.body;

    await usermodel.findOneAndUpdate({ email: oldEmail }, { name, email ,password: req.body.password}); // Update user in the database

    res.redirect("/user"); 
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
