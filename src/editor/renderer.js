const fs = require('fs');
const { exec } = require("child_process");
const { ipcRenderer } = require('electron');

const path = require("path");

const editor = document.querySelector('#editor');
const saveButton = document.querySelector('#save-btn');
const playButton = document.querySelector('#play-btn');
const comButton = document.querySelector('#compile-btn');

var thePath = localStorage.getItem("SRC");

var fileContents;
fileContents = localStorage.getItem("code");
editor.value = fileContents;
document.title = `libnIDE : ${localStorage.getItem("ProjectName")}`

editor.addEventListener('input', () => {
  if(fileContents === editor.value){
    document.title = `libnIDE : ${localStorage.getItem("ProjectName")}`
  }
  else{
    document.title = `libnIDE : *${localStorage.getItem("ProjectName")}`
  }
})
editor.addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

saveButton.addEventListener('click', () => {
  fs.writeFile(thePath, editor.value, (err, data) => {
    if (err){
      throw err;
    }
    else{
      document.title = `libnIDE : ${localStorage.getItem("ProjectName")}`
      fileContents = editor.value;
    }
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

comButton.addEventListener("click", () => exec(`cd ${path.parse(path.parse(thePath).dir + ".me").dir} && make`, (error, stdout) => {
  if (error) {
    if (error.signal == 'SIGTERM') {
      
    } else {
      confirm(error)
    }
  } else {
    console.log(stdout.trim());
  }
}));