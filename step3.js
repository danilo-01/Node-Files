const fs = require('fs');
const axios = require('axios');
const process = require('process');

function handleOut(text, pathOverwrite){
    if(pathOverwrite != ''){
        fs.writeFile(pathOverwrite, text, 'utf8', (error)=>{
            if(error){
                console.log(error);
                process.exit(1);
            }
            process.exit(0);
        })

    }else{
    console.log(text);
    process.exit(0);
    }
}
function cat(pathFrom, pathOverwrite){
    fs.readFile(pathFrom, 'utf8', (error, data) => {
        if(error){
            console.log(error);
        }else{
            handleOut(data, pathOverwrite);
        }
    })
}

async function webCat(url, pathOverwrite){
    try{
    const response = await axios.get(url);
    handleOut(response.data, pathOverwrite);
    }catch(error){
        console.log('error');
    }
}

let pathOverwrite = '';
let pathFrom;

if(process.argv[2] == '--out'){
    pathOverwrite = process.argv[3];
    pathFrom = process.argv[4];
}
else{
    pathFrom = process.argv[2];
}


if (pathFrom.slice(0, 4) === 'http') {
    webCat(pathFrom, pathOverwrite);
  } else {
    cat(pathFrom, pathOverwrite);
  }
