
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;

let persons = [
        { 
            name: "Arto Hellas", 
            number: "040-123456",
            id: 1
          },
          { 
            name: "Ada Lovelace", 
            number: "39-44-5323523",
            id: 2
          },
          { 
            name: "Dan Abramov", 
            number: "12-43-234345",
            id: 3
          },
          { 
            name: "Mary Poppendieck", 
            number: "39-23-6423122",
            id: 4
          }
    ]
    

app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    const string = `<B>Phonebook has info for ${persons.length} people <br>${date.toString()}<B>`;
    res.send(string)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        res.send(person)
      } else {
        res.status(404).end()
      }   
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    res.status(204).end()
})


app.post('/api/persons', (req, res) => {
    const body = req.body;

    const generateId = () => {
        return Math.floor(Math.random() * 1000000)
    }

    if (!body.name) {
        return res.status(400).json({ 
          error: 'name missing' 
        })
    }
    if (!body.number) {
        return res.status(400).json({ 
            error: 'number missing' 
        })
    }
    if(persons.find(p => p.name === body.name)) {
        return res.status(400).json({ 
            error: 'name already in the list' 
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    res.send(person)

    })

    
app.listen(port, () => {console.log('listen')})