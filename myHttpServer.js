const http = require('http'); 
const fs=require('fs');//文件系统
const url=require('url');
const queryString = require('querystring');
var i=0;
const server = http.createServer((req, res) => {//服务器就是获得请求，解析后返回想要的数据
    if(req.url=="/favicon.ico"){
        res.statusCode = 200;//状态码（返回码）
        res.setHeader('Content-Type', 'text/img');
        fs.readFile("favicon.ico",(err,fsData)=>{
            if(err){
                console.log("Read file error.");
                throw err
            }
            res.write(fsData);
            res.end();
        })
    }
    else if (req.url == "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile("form3.html", (err, fsData) => {
            if (err) {
                console.log("Read file error.")
                throw err
            }
            res.write(fsData);
            res.end()
        })
    }
    else if (req.url.slice(0, 6) == "./input") {

        let url1 = req.url.split("?");
        let obQuery = queryString.parse(url1[1]);
        if (obQuery.submit1 == "Save") {
            fs.writeFile('./savefile', obQuery.name123, (err) => {
                if (err) console.log("write file error")
                else console.log("write file success")
            })
        }
        else {
            fs.appendFile('./savefile', obQuery.name123, (err) => {
                if (err) console.log("Append file error")
                else console.log("Append file success")
            })
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        fs.readFile("form1.html", (err, fsData) => {
            if (err) {
                console.log("read file error");
                throw err;
            }
        })
        res.write(fsData);
        res.end();


        // res.setHeader('Content-Type', 'text/html');
        // // res.write(firstQuery[1]+"<br>")
        // // res.write(secondQuery[1]+"<br>")
        // res.write(obQuery.name123+"<br>");
        // res.write(obQuery.submit1+"<br>");

        // res.end("submit success！")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>This is Wujunhao. You are the '+i+'th visitor!!!</h1>')
        res.end();
    }
      
    // i++;
    console.log("This is my consolelog");
});

server.listen(3000);