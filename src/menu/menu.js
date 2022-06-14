const fs = require("fs");
const path = require("path");

const newBtn = document.getElementById("new-btn");
const openBtn = document.getElementById("open-btn");
const projectInput = document.getElementById("Project");

var file;
var file2;

newBtn.addEventListener('click', () => {
    fs.writeFile(projectInput.value, "/src/main.c", (err, data) => {
        if (err) { throw err; }
    });
    fs.mkdir(path.parse(projectInput.value).dir + "/src", { recursive: true }, (err) => {})
    localStorage.setItem("SRC", path.parse(projectInput.value).dir + "/src/main.c")
    let file = localStorage.getItem("SRC")
    fs.writeFile(file, "#include <stdio.h>\n#include <nds.h>", (err, data) => {
        if (err) { throw err; }
    });
    localStorage.setItem("ProjectName", path.parse(projectInput.value).name);
    fs.readFile(localStorage.getItem("SRC"), 'utf-8', (err, data) => {
        if (err) { throw err; }
        localStorage.setItem("code", data);
    });
    fs.copyFile(`${path.parse(path.parse(__dirname).dir).dir}/Makefile.dll`, `${path.parse(path.parse(localStorage.getItem("SRC")).dir).dir}/Makefile`, (err) => { if(err) { console.log(err) } if(!err) { /*location.href = "../../views/editor.html";*/ }});
});
openBtn.addEventListener('click', () => {
    fs.readFile(projectInput.value, 'utf-8', (err, data) => {
        if (err) { confirm(err); }
        file = path.parse(projectInput.value).dir + data;
        localStorage.setItem("SRC", file)

        localStorage.setItem("ProjectName", path.parse(projectInput.value).name);
        file2 = localStorage.getItem("SRC");
        fs.readFile(file2, 'utf-8', (err, data) => {
            if (err) { confirm(err); }

            if(!err){
                localStorage.setItem("code", data);
                location.href = "../../views/editor.html";
            }
        });
    });
});