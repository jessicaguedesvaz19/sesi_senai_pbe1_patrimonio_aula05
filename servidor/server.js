const express = require("express")

const patrimonios = require("../dados.json")

const listarPatrimonio = (req, res) => {
    res.status(200).send(patrimonios)
}

const novoPatrimonio = (req, res) => {
    if (req.body) {
        patrimonios.push(req.body)
        res.status(200).send("Patrimônio recebido, em processamento")
    } else {
        res.status(400).send("Erro ao receber patrimônio")
    }
}

const excluirPatrimonio = (req, res) => {
    const id = req.params.id
    let status = 0

    patrimonios.forEach((patrimonio, indice) => {
        if (patrimonio.id == id) {
            status = 1
            patrimonios.splice(indice, 1)
        }
    })

    if (status == 1) {
        res.status(200).send("Patrimônio Excluído com Sucesso")
    } else {
        res.status(404).send("Patrimônio não encontrado")
    }
}

const atualizarPatrimonio = (req, res) => {
    const id = req.query.id
    const dados = req.body
    let status = 0

    patrimonios.forEach((patrimonio) => {
        if (patrimonio.id == id) {
            status = 1
            patrimonio.item = dados.item
            patrimonio.local = dados.local
            patrimonio.dataRegistro = dados.dataRegistro
            patrimonio.valor = dados.valor
            patrimonio.patrimonio = dados.patrimonio
        }
    })

    if (status == 1) {
        res.status(200).send("Patrimônio atualizado com sucesso!")
    } else {
        res.status(404).send("Patrimônio não encontrado")
    }
}

const buscarPatrimonio = (req, res) => {
    const id = req.query.id

    const resultado = patrimonios.filter(p =>
        p.id == id
    )

    res.json(resultado)
}


const app = express()

app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.post("/", novoPatrimonio)
app.get("/", listarPatrimonio)
app.delete("/:id", excluirPatrimonio)
app.patch("/", atualizarPatrimonio)
app.get("/buscar", buscarPatrimonio)

app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}`)
})