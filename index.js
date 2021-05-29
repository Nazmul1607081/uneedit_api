const Joy = require('joi')
const express = require('express')
const Joi = require('joi')
const app = express()

let cources = [
    {
        'id': 1,
        'name': "bangla"
    },
    {
        'id': 2,
        'name': "bangla"
    }
    , {
        'id': 3,
        'name': "bangla"
    }
]
app.use(express.json());
app.get('/api/cources', (req, res) => {

    res.send(cources)

})

app.get('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) {
        res.status(404).send("Not Find")
    }
    else {
        res.send(cource);
    }
})

app.post('/api/cources', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const cource = {
        id: cources.length + 1,
        'name': req.body.name
    }

    cources.push(cource);
    res.status(200).send(cource);
})


app.put('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) {
        res.status(404).send("Not Find")
    }
    else {
        const schema = Joi.object({
            name: Joi.string().min(3).required()
        });
        const result = schema.validate(req.body)
        if (result.error) {
            res.status(400).send(result.error.details[0].message)
            return;
        }
        cource.name = req.body.name
        res.send(cource)
    }
})

app.delete('/api/cources/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) {
        res.status(404).send("Not Find")
    }
    else {
        let index = cources.indexOf(cource);
        cources.splice(index, 1);
        res.send(cource);
    }
})





const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on the port ${port}`))