const { Console } = require("console");
var fs = require("fs");
try {
  let json = require("C:\\Users\\alaaj\\Documents\\NodeJs\\IBM Automation\\STC\\Sprint5\\STCPayWebApi.json");
  if(json["info"]) var info = json["info"];
  if(json["host"]) var host = json["host"];
  if(json["schemes"]) var schemes=json["schemes"];
  if(json["consumes"]) var consumes=json["consumes"];
  if(json["produces"]) var produces = json["produces"]
  if(json["basePath"]) var basePath=json["basePath"];
  var AllDefinitions = json["definitions"];
  var Allpaths = json["paths"];
} catch (err) {
  throw "bad json file !!! recheck it please" + err;
}

function RequestBodyExtractor(path_api){
    if(Allpaths[path_api["path"]][path_api["api"]]["requestBody"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"]&& Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"]["$ref"]){
        arr = Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"]["$ref"].split("/");
        return arr[arr.length-1];
    }else{
        for(param in Allpaths[path_api["path"]][path_api["api"]]["parameters"]){
            if(Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["in"] === "body"){
                arr = Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["schema"]["$ref"].split("/");
                return arr[arr.length-1];
            }
        }
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!")
    return "Error in RequestBodyExtractor";
};
function ResponseBodyExtractor(path_api){
    inputField="";
    outputField="";
    xmlOutputParameters="";
    xmlDefinitionParameters ="";
    if(Allpaths[path_api["path"]][path_api["api"]]["responses"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"] ){
        arr = Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"].split("/");
        return arr[arr.length-1];
    }else{
        console.log("inputField extractiong problem : swagger Imported is not valid swagger File (at least its not generator by 'Swagger Generator By Alaa :P')");
    }
};

function ExtractFieldsFromPath(path, api) {
    if (AllDefinitions[path]) {
      if (PathsResults[path]) {
        PathsResults[path][api] = Allpaths[key][api];
      } else {
        PathsResults[path] = { [api]: Allpaths[key][api] };
      }
      ExtractFieldsFromApi(Allpaths[path][api]);
    } else {
      console.log(`the path : ${path} is wrong`);
    }
  };
  function ExtractFieldsFromApi(api) {
    for (i = 0; i < api["parameters"].length; i++) {
      if (
        api["parameters"][i]["schema"] &&
        api["parameters"][i]["schema"]["$ref"]
      ) {
        arr = api["parameters"][i]["schema"]["$ref"].split("/");
        if (!searchitem.includes(arr[arr.length - 1]))
          searchitem.push(arr[arr.length - 1]);
      }
    }
  
    for (statusCode in api["responses"]) {
      if (api["responses"][statusCode]["schema"]) {
        if (api["responses"][statusCode]["schema"]["$ref"]) {
          // for those who does not have schema type array
          arr = api["responses"][statusCode]["schema"]["$ref"].split("/");
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        } else if (api["responses"][statusCode]["schema"]["items"]["$ref"]) {
          //for those who have shema of type array
          arr = api["responses"][statusCode]["schema"]["items"]["$ref"].split(
            "/"
          );
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        }
      }
    }
  
    if (api["requestBody"]) {
      if (api["requestBody"]["content"]) {
        if (api["requestBody"]["content"]["application/json;charset=UTF-8"]) {
          if (
            api["requestBody"]["content"]["application/json;charset=UTF-8"][
              "schema"
            ]
          ) {
            if (
              api["requestBody"]["content"]["application/json;charset=UTF-8"][
                "schema"
              ]["$ref"]
            ) {
              arr = api["requestBody"]["content"][
                "application/json;charset=UTF-8"
              ]["schema"]["$ref"].split("/");
              if (!searchitem.includes(arr[arr.length - 1]))
                searchitem.push(arr[arr.length - 1]);
            }
          }
        }
      }
    }
    if (api["responses"]) {
      for (response in api["responses"]) {
        if (api["responses"][response]["content"]) {
          if (
            api["responses"][response]["content"][
              "application/json;charset=UTF-8"
            ]
          ) {
            if (
              api["responses"][response]["content"][
                "application/json;charset=UTF-8"
              ]["schema"]
            ) {
              if (
                api["responses"][response]["content"][
                  "application/json;charset=UTF-8"
                ]["schema"]["$ref"]
              ) {
                arr = api["responses"][response]["content"][
                  "application/json;charset=UTF-8"
                ]["schema"]["$ref"].split("/");
                if (!searchitem.includes(arr[arr.length - 1]))
                  searchitem.push(arr[arr.length - 1]);
              }
            }
          }
        }
      }
    }
  }
// var hello = require('./Swagger Generator By Alaa');
// hello.swagger.add("/customer/mostFrequentContact", "get");;


  console.log(`<xsd:element name="X-version" type="xsd:string"/>    
  <xsd:element name="X-latitude" type="xsd:string"/>    
  <xsd:element name="X-mobile-number" type="xsd:string"/>    
  <xsd:element name="X-security-token" type="xsd:string"/>    
  <xsd:element name="X-platform" type="xsd:string"/>    
  <xsd:element name="X-language-key" type="xsd:string"/>
  <xsd:element name="X-message-id" type="xsd:string"/>    
  <xsd:element name="X-device-id" type="xsd:string"/>    
  <xsd:element name="X-build-number" type="xsd:string"/>    
  <xsd:element name="X-longitude" type="xsd:string"/>    
  <xsd:element name="X-user-token" type="xsd:string"/>`.includes(`<xsd:element name="x-language-key" type="xsd:string"/>`));

  console.log(`<xsd:element name="X-version" type="xsd:string"/>    
  <xsd:element name="X-latitude" type="xsd:string"/>    
  <xsd:element name="X-mobile-number" type="xsd:string"/>    
  <xsd:element name="X-security-token" type="xsd:string"/>    
  <xsd:element name="X-platform" type="xsd:string"/>    
  <xsd:element name="X-language-key" type="xsd:string"/>
  <xsd:element name="X-message-id" type="xsd:string"/>    
  <xsd:element name="X-device-id" type="xsd:string"/>    
  <xsd:element name="X-build-number" type="xsd:string"/>    
  <xsd:element name="X-longitude" type="xsd:string"/>    
  <xsd:element name="X-user-token" type="xsd:string"/>`.includes(`<xsd:element name="X-language-key" type="xsd:string"/>`));
