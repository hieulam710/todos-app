const express = require('express');
const fs = require('fs');
const url = require('url')
const { nextTick, title } = require('process');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { get } = require('http');
const app = express();
const port = 3000;

app.use(express.static("public")); // serving static file.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());;
//Exercise 1:
app.get('/', (req, res) => {
    // res.sendFile('index')
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "index.html";
    res.sendFile(fileName, options, (err) => {
        if (err) throw err
    });
})

// B1: Tạo GET request với đường dẫn “/api/v1/todos”
app.get("/api/v1/todos", (req, res) => {
    let queryStr = req.query
    fs.readFile("./dev-data/todos.json", (err, data) => {
        if (err) {
            res.status(500).json({
                err: err,
                status: "fail",
                message: err.message
            })
        }
        data = JSON.parse(data)
        let dataPerPage = data.find((e)=>{
            return data.length == queryStr.per_page 
        })
        
        console.log(dataPerPage);
        res.status(200).json({
            status: 'success',
            data: data
        })
    })
});
//B2:   Tạo GET request với đường dẫn “/api/v1/todos/:id”
app.get("/api/v1/todos/:id", checkExistById, (req, res) => {
    let { id } = req.params
    console.log(id);
    fs.readFile("./dev-data/todos.json", (err, data) => {
        if (err) {
            res.status(500).json({
                err: err,
                status: "fail",
                message: err.message
            })
        }
        data = JSON.parse(data);
        let find = data.find((e, i) => `${e.id}` === id);
        res.status(200).json({
            status: 'success',
            todo: find
        })
    })
});
//b3 Tạo POST request với đường dẫn “/api/v1/todos” :
app.post("/api/v1/todos", checkExistByTitle, (req, res) => {
    fs.readFile("./dev-data/todos.json", "utf-8", (err, data) => {
        if (err) res.status(500).json({ message: "can't read file" });
        data = JSON.parse(data);
        let form = req.body
        data.push(form);
        fs.writeFile('./dev-data/todos.json', JSON.stringify(data), (err) => {
            if (err)
                res.status(500).json({ message: "can't write file" });
            res.status(200).json({
                status: "success",
                message: "create succsesfuly"
            })
        })
    })
})

//b4: Tạo PUT request với đường dẫn “/api/v1/todos/:id”
app.put("/api/v1/todos/:id", checkExistById, (req, res) => {
    let { id } = req.params;
    fs.readFile('./dev-data/todos.json', 'utf-8', (err, data) => {
        if (err) res.status(500).json({ message: "can't read file" });
        data = JSON.parse(data);
        let findIndex = data.findIndex((e, i) => `${id}` === id);
        data[findIndex] = {
            ...data[findIndex],
            ...req.body,
        }
        fs.writeFile("./dev-data/todos.json", JSON.stringify(data), (err) => {
            if (err) res.status(500).json({ message: "can't write file" });
            res.status(200).json({
                status: "success",
                message: "Update succsesfuly"
            })
        })
    })
})
// b5:Tạo DELETE request với đường dẫn “/api/v1/todos/:id”

app.delete("/api/v1/todos/:id", checkExistById, (req, res) => {
    let { id } = req.params;
    console.log(id);
    fs.readFile("./dev-data/todos.json", 'utf-8', (err, data) => {
        if (err) res.status(500).json({ message: "can't read file" });
        data = JSON.parse(data)
        let findIndex = data.findIndex((e, i) => `${e.id}` === id);

        data.splice(findIndex, 1)
        fs.writeFile("./dev-data/todos.json", JSON.stringify(data), (err) => {
            if (err) res.status(500).json({ message: "can't write file" });
            res.status(200).json({
                status: "success",
                message: "Update succsesfuly"
            })
        })
    })
})



//Exercise 3:Viết một middleware tên là checkExist - theo cả id và title
function checkExistById(req, res, next) {
    let { id } = req.params
    fs.readFile("./dev-data/todos.json", 'utf-8', (err, data) => {
        if (err) res.status(500).json({ message: err.message });
        data = JSON.parse(data);
        let find = data.find((e, i) => `${e.id}` === id);
        if (!find) {
            res.status(500).json({
                status: "fail",
                message: "Todo not found"
            })
        } else {
            next()
        }
    })
}
function checkExistByTitle(req, res, next) {
    let titleBody = req.body.title
    console.log(title);
    fs.readFile("./dev-data/todos.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({
                err: err,
                status: "fail",
                message: "can't read file"
            })
        }
        let valueData = JSON.parse(data);
        const findTitle = valueData.find((item) => `${item.title}` == titleBody)
        if (findTitle) {
            res.status(500).json({ message: "Todo already exists" })
        } else {
            next()
        }
    })
}



app.listen(3000, () => {
    console.log(`Server listening in http://127.0.1:${port}`);
})