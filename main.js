// part 2

const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const data = fs.readFileSync('./users.json', 'utf8');
const users = JSON.parse(data);

// -1
{
    app.post('/user', (req, res) => {
        console.log(req.body);
        const newUser = req.body;
        const emailexist = users.some((user) => {
            return user.email === newUser.email;
        })
        if (emailexist) {
            res.json({
                message: "Email already exists!"
            })
        } else {
            users.push(newUser);
            fs.writeFileSync("./users.json", JSON.stringify(users));
            res.json({
                message: 'User added successfully',
                user: req.body
            })

        }
    })
}
// --------------------------------------------------------------------------------------------------

// - 2
{
app.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const userExist = users.find((user) => {
        return user.id == id;
    })
    if (userExist) { 
        Object.assign(user, req.body);
        fs.writeFileSync("./users.json", JSON.stringify(users));
        res.json({
            message: 'User ubdated successfully'
        })
    } else {
        res.json({
            message: 'User id is not found.'
        })
    }
})
}
// --------------------------------------------------------------------------------------------------

// - 3
{
    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const userExist = users.some((user) => {
            return id == user.id;
        })
        if (userExist) {

            const index = users.findIndex((user) => {
             return user.id == id ;
            })
            users.splice(index, 1);
        fs.writeFileSync("./users.json", JSON.stringify(users));
            res.json({
                message: "User deleted successfully"
            })
        } else {
            res.json({
                message : "User id not found"
            })
        }
    })
}
// --------------------------------------------------------------------------------------------------

// - 4
{
app.get('/users/', (req, res) => {
    const name = req.query.name;
    const userExist = users.find((user) => {
        return user.name == name;
    })
    if (userExist) {
        res.send(userExist)
    }else{
res.json({
    message : "User name not found"
})
    }
})
}
// --------------------------------------------------------------------------------------------------

// - 5
// GET all users
{
    app.get('/user', (req, res) => {
        res.json(users);
    })
}
// --------------------------------------------------------------------------------------------------

// - 6
{
    app.get('/user/filter', (req, res) => {
        const minAge = req.query.minAge;
        const result = users.filter((user) => {
            return user.age >= minAge;
        })
        if (result.length > 0){
            res.json(result);
        }else{
            res.json({
                message : "No users found"
            })
        }
    })
}
// --------------------------------------------------------------------------------------------------

// - 7
{
    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        const userExist = users.find((user) => {
            return user.id == id;
        })
        if (userExist) {
            res.json(userExist);
        }else{
            res.json({
                message : "User id not found"
            })
        }
    })
}
app.listen(3000);