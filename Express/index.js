import express from "express"

const app = express()
const port = 3000
app.use(express.json())

let Data = []
let nextId = 1

app.post("/teas", (req, res) => {
    const {name, price} = req.body
    const newTea = {id : nextId++, name, price}
    Data.push(newTea)
    res.status(201).send(newTea)
})

app.get("/teasList", (req, res) => {
    res.status(200).send(Data)
})
    
app.get("/teasList/:id", (req, res) => {
    const TeaVar = Data.find(t => t.id === parseInt(req.params.id))
    if(!TeaVar){
        return res.status(404).send("Not Found")
    }
    res.status(200).send(TeaVar)
})


app.put("/teas/:id", (req, res) => {
    const tea = Data.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})


app.delete("/teas/:id", (req, res) => {
    const index = Data.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Does not exist")
    }
    Data.splice(index, 1)
    return res.status(204).send("Deleted");
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
    
})

















































