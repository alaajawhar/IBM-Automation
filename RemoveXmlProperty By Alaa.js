const { Console } = require("console");
var fs = require("fs");
path="C:\\Users\\E195\\Desktop\\STC\\Swagger Files\\swagger.json";
try {
  var json = require(path);
  if(json["info"]) var info = json["info"];
  if(json["host"]) var host = json["host"];
  if(json["schemes"]) var schemes=json["schemes"];
  if(json["consumes"]) var consumes=json["consumes"];
  if(json["produces"]) var produces = json["produces"]
  if(json["basePath"]) var basePath=json["basePath"];
  var Filename = path.split("\\")[path.split("\\").length - 1]
  var AllDefinitions = json["definitions"];
  var Allpaths = json["paths"];
} catch (err) {
  throw "bad json file !!! recheck it please" + err;
}


for(field in AllDefinitions){
    if(AllDefinitions[field]["xml"]){
        delete AllDefinitions[field]["xml"];
    }
    for(subfield1 in AllDefinitions[field]){
        if(AllDefinitions[field][subfield1]["xml"]) {
            delete AllDefinitions[field][subfield1]["xml"]
        }
        for(subfield2 in AllDefinitions[field][subfield1]){
            if(AllDefinitions[field][subfield1][subfield2]["xml"]){
                delete AllDefinitions[field][subfield1][subfield2]["xml"]
            }
            for(subfield3 in AllDefinitions[field][subfield1][subfield2]){
                if(AllDefinitions[field][subfield1][subfield2][subfield3]["xml"]){
                    delete AllDefinitions[field][subfield1][subfield2][subfield3]["xml"]
                }
                for(subfield4 in AllDefinitions[field][subfield1][subfield2][subfield3]){
                    if(AllDefinitions[field][subfield1][subfield2][subfield3][subfield4]["xml"]){
                        delete AllDefinitions[field][subfield1][subfield2][subfield3][subfield4]["xml"]
                    }
                    for(subfield5 in AllDefinitions[field][subfield1][subfield2][subfield3][subfield4]){
                        if(AllDefinitions[field][subfield1][subfield2][subfield3][subfield4][subfield5]["xml"]){
                            delete AllDefinitions[field][subfield1][subfield2][subfield3][subfield4][subfield5]["xml"]
                        }
                    }
                }
            }
        }
    }
}

fs.writeFile(
    `.\\Generators\\removedxml.json`,
    JSON.stringify(AllDefinitions, null, 4),
    function (err) {
      if (err)
        console.log(
          "error occupied when swagger file writting is processing"
        );
      else console.log(`removedxml.json file was successfully created`);
    }
  );
