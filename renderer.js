const fs = require('fs');
const { exec } = require("child_process");
const { ipcRenderer } = require('electron');

const path = require("path");

const editor = document.querySelector('#editor');
const importFile = document.querySelector('#importFile');
const saveButton = document.querySelector('#save-btn');
const playButton = document.querySelector('#play-btn');
const comButton = document.querySelector('#compile-btn');
var thePath;

importFile.addEventListener('change', () => {
  thePath = importFile.files[0].path;
  fs.readFile(importFile.files[0].path, 'utf-8', (err, data) => {
        if (err) { throw err; }
        editor.value = data;
      });
}, true);

saveButton.addEventListener('click', () => {
    fs.writeFile(loadInput.files[0].path, editor.value, (err, data) => {
        if (err) { throw err; }
      });
}, true);

playButton.addEventListener("click", () => exec(`cd ${path.parse(path.parse(thePath).dir + ".me").dir} && make && xdg-open ${path.parse(path.parse(thePath).dir + ".me").dir}/${path.parse(path.parse(path.parse(thePath).dir + ".me").dir + ".me").name}.nds`, (error, stdout) => {
  if (error) {
    if (error.signal == 'SIGTERM') {
      
    } else {
      confirm(error)
    }
  } else {
    console.log(stdout.trim());
  }
}));

comButton.addEventListener("click", () => exec(``cd ${path.parse(path.parse(thePath).dir + ".me").dir} && make, (error, stdout) => {
  if (error) {
    if (error.signal == 'SIGTERM') {
      
    } else {
      confirm(error)
    }
  } else {
    console.log(stdout.trim());
  }
}));