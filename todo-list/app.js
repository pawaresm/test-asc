const express = require('express');
// var bodyParser = require('body-parser')
const app = express();
const PORT = 4000;

app.use(express.json());


// create application/json parser
// var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
var todo= []
// title
// detail
// create_date
// update_date


  app.get('/todo',(req, res)=> {
    res.send(todo)
  })
  app.post('/todo',(req, res)=> {
    const todoForm = { id: todo.length + 1, title: req.body.title, detail: req.body.detail ,create_date:new Date()};
    todo.push(todoForm);
    res.status(201).send(todo)
  })
  app.put('/todo/:id',(req, res)=> {
    const index = todo.findIndex((l)=>l.id == req.params.id)
    if(index !=-1){
        todo[index].title = req.body.title;
        todo[index].detail = req.body.detail;
        todo[index].update_date = new Date();
        res.json(todo[index]);
    }else{
        res.status(404).send();
    }

  })
  app.delete('/todo/:id',(req, res)=> {
    todo = todo.filter(todo => todo.id != req.params.id);
    res.status(204).send(todo);
  })
  


  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});