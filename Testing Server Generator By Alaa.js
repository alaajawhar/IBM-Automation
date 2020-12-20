// let RestRequestSwaggerPath="C:\\Users\\alaaj\\Documents\\NodeJs\\IBM Automation\\Generators\\Useful_RestRequestApis.json";
try {
  // console.log(RestRequestSwaggerPath)
    let json = require("C:\\Users\\E195\\Desktop\\.NET\\Swaggers\\getWalletAccounts.json");
    var AllDefinitions = json["definitions"];
    var Allpaths = json["paths"];
  } catch (err) {
    throw err;//"bad URL for a JSON file !!! recheck it please"
  }
const { Console } = require("console");
  var fs = require('fs');
  FixedServerText1 = `var express = require("express");
  const { response } = require("express");
  var bodyParser = require('body-parser');
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());`;
FixedServerText2 = `app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});`
  function Mocking (field){
    let mockData= {};
    if(AllDefinitions[field]){
      if(AllDefinitions[field]["properties"]){
        for(prop in AllDefinitions[field]["properties"] ){
          if(AllDefinitions[field]["properties"][prop]["type"] === "string"){
            mockData[prop] = String(Math.random().toString(20).substr(2, 9));
          }else if(AllDefinitions[field]["properties"][prop]["type"] === "boolean"){
            mockData[prop] = true;
          }else if(AllDefinitions[field]["properties"][prop]["type"] === "integer" || AllDefinitions[field]["properties"][prop]["type"] === "number"){
            mockData[prop] = Math.floor(Math.random() * 1000);
          }else if(AllDefinitions[field]["properties"][prop]["type"] === "array"){
            if(AllDefinitions[field]["properties"][prop]["items"]){
              if(AllDefinitions[field]["properties"][prop]["items"]["$ref"]){
                arr = AllDefinitions[field]["properties"][prop]["items"]["$ref"].split('/');
                newField = AllDefinitions[field]["properties"][prop]["items"]["$ref"].split('/')[arr.length -1];
                if(newField === field){
                  break;
                }else{
                  mockData[prop] =[];
                  mockData[prop].push(Mocking(newField));
                }
              }else if(AllDefinitions[field]["properties"][prop]["items"]["type"] === "string"){
                mockData[prop] =[];
                mockData[prop].push(String(Math.random().toString(20).substr(2, 9)));
                mockData[prop].push(String(Math.random().toString(20).substr(2, 9)));
              }
            }
          }else if(AllDefinitions[field]["properties"][prop]["$ref"]){
            arr = AllDefinitions[field]["properties"][prop]["$ref"].split('/');
            newField =AllDefinitions[field]["properties"][prop]["$ref"].split('/')[arr.length-1];
            
            if(AllDefinitions[field]["properties"][prop]["$ref"]){
              arr = AllDefinitions[field]["properties"][prop]["$ref"].split('/');
              newField = AllDefinitions[field]["properties"][prop]["$ref"].split('/')[arr.length -1];
              if(newField === field){
                break;
              }else{
                mockData[prop] ={}; 
                mockData[prop]=Mocking(newField);
              }
              
            }

          }
        }
      }
      else if (AllDefinitions[field]["type"] === "string"){
        mockData[field] = AllDefinitions[field]["enum"][1];
      }
    }else{
      console.log(`${field} not found please check it`)
    }
    return mockData;
  }
  function generateServer(){
    fs.writeFile(".\\Generators\\API Testing.js", FixedServerText1, function (err) {
      if (err) throw err;
    });
    for(path in  Allpaths){
      for(api in Allpaths[path]){
        if (Allpaths[path][api]["responses"]) {
          if (Allpaths[path][api]["responses"]["200"]) {
            if (Allpaths[path][api]["responses"]["200"]["schema"]) {
              if (Allpaths[path][api]["responses"]["200"]["schema"]["$ref"]) {
                arr =Allpaths[path][api]["responses"]["200"]["schema"]["$ref"].split('/')
                VariableText = `app.${api}("${path}", function (req, res) {
                  console.log()
                  console.log("-----------------------------------Headers : ----------------------------------------------");
                  console.log(req.headers);
                  console.log()
                  console.log("-----------------------------------Body : -------------------------------------------------");
                  console.log(req.body);
                  res.send(${JSON.stringify(Mocking(arr[arr.length-1]),null,4)});});`
                fs.appendFile(".\\Generators\\API Testing.js",VariableText,function (err) {
                  if (err) throw err;
                  console.log(`Generate ${path}`)
                });
              }else if(Allpaths[path][api]["responses"]["200"]["schema"]["items"] && Allpaths[path][api]["responses"]["200"]["schema"]["items"]["$ref"] ){
                arr =Allpaths[path][api]["responses"]["200"]["schema"]["items"]["$ref"].split('/')
                  VariableText = `app.${api}("${path}", function (req, res) {
                    console.log()
                    console.log("-----------------------------------Headers : ----------------------------------------------");
                    console.log(req.headers);
                    console.log()
                    console.log("-----------------------------------Body : -------------------------------------------------");
                    console.log(req.body);
                    res.send(${JSON.stringify(Mocking(arr[arr.length-1]),null,4)});});`
                  fs.appendFile(".\\Generators\\API Testing.js",VariableText,function (err) {
                    if (err) throw err;
                    console.log(`Generate ${path}`)
                  });
              }
            }
            }
        }
      }
    }
  }
  
  function generateServerOf(){
    generateServer();
    fs.appendFile(".\\Generators\\API Testing.js",FixedServerText2,function (err) {
      if (err) throw err;
    });
  }
  generateServerOf();
  // module.exports.generateServerOf=generateServerOf;
