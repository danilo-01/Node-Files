const fs = require('fs');
const axios = require('axios');
const { argv } = require('process');

function cat(path){

    fs.readFile(path, 'utf8', (error, data) => {
        if(data){
            console.log(data)
            process.exit(0)
        }
    })
    throw 'Please enter a valid file path';
}

function webCat(url){
    axios.get(url)
    .then(response => console.log(response.data))
    .catch((err) => {
        console.log(`Request failed with status code ${err.response.status}`)
    })
}

try{
    cat(argv[2]);
}
catch{
    webCat(argv[2]);
}




