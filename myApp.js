const express = require('express');
const app = express();

users = [
    {
        name: "junior",
        id: 1,
        paid: true 
    },
    {
        name: "matheus",
        id: 2,
        paid: true 
    },
    {
        name: "oliver",
        id: 3,
        paid: false
    },
    {
        name: "mari",
        id: 4,
        paid: false
    }
]

app.get('/users', (req,res) => {
    res.send(users);
})

app.get('/paid/:id',(req,res) => {
    id = req.params.id;
    let foundUser = users.find((user) => user.id == id);
    
    if(foundUser.paid){
        res.send("access granted");
    }
    else{
        res.send("access denied");
    }
})

app.get('/change/:id',(req,res) => {
    id = req.params.id;
    let foundUser = users.find((user) => user.id == id);

    foundUser.paid = !foundUser.paid;
    res.redirect('/paid/' + id);
})

app.use((req,res) => {
    res.status(404);
    res.send("not found");
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Wrong!');
  });  


app.listen('3000', () => console.log("listening on port 3000"));
