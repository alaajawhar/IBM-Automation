const { Console } = require("console");
var fs = require("fs");
const { findSourceMap } = require("module");
STCSwaggerPath ="C:\\Users\\E195\\Desktop\\STC\\Swagger Files\\STCPayWallet.json";
try {
  let STC_Swagger = require(STCSwaggerPath);
  var AllDefinitions = STC_Swagger["definitions"];
  var Allpaths = STC_Swagger["paths"];
} catch (err) {
  throw `bad json file !!! recheck it please : ${STCSwaggerPath}`;
}

function mapNameGenerator(RequestPath, ResponsePath) {
  let mapName = "";
  if (RequestPath === "input") {
    mapName = mapName.concat("Input");
  } else if (RequestPath["path"]) {
    let arr = RequestPath["path"].split("/");
    for (let i = 1; i < arr.length; i++) {
      mapName = mapName.concat(
        arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      );
    }
  }
  mapName = mapName.concat("_To_");
  if (ResponsePath === "output") {
    mapName = mapName.concat("Output");
  } else if (ResponsePath[["path"]]) {
    arr = ResponsePath["path"].split("/");
    for (let i = 0; i < arr.length; i++) {
      mapName = mapName.concat(
        arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      );
    }
  }
  return mapName;
}
function XmlDefinition_XmlInput_XmlOutput_Generator(path_api){
  xmlOutputParameters = "";
  xmlInputParameters = "";
  xmlDefinitionParameters = "";
  let xmlMoving="";
  if (Allpaths[path_api["path"]][path_api["api"]]["parameters"]) {
    for (param in Allpaths[path_api["path"]][path_api["api"]]["parameters"]) {
      if (Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["type"]) {
          xmlDefinitionParameters = xmlDefinitionParameters.concat(`<xsd:element name="${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}" type="xsd:${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["type"]}"/>\n`);
          xmlOutputParameters = xmlOutputParameters.concat(`<cast castType="userDefined" path="$MessageAssembly/LocalEnvironment/Destination/REST/Request/Parameters/any" qualifier="${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}" ref="var6"/> \n`);
          xmlInputParameters = xmlInputParameters.concat(`<cast castType="userDefined" path="$MessageAssembly/LocalEnvironment/REST/Input/Parameters/any" qualifier="${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}" ref="var6"/> \n`);
          xmlMoving=xmlMoving.concat(`<move>
          <input path="$MessageAssembly/LocalEnvironment/REST/Input/Parameters/${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}"/>
          <output path="$MessageAssembly/LocalEnvironment/Destination/REST/Request/Parameters/${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}"/>
      </move>\n`);
      }
    }
  }
  return {"xmlDefinition": xmlDefinitionParameters, "xmlOutput": xmlOutputParameters, "xmlInput" : xmlInputParameters,"xmlMoving":xmlMoving};
}
function RequestBodyExtractor(path_api) {//if get--> JSONObject else returns requestBody
  if(path_api["api"] === "get") return "JSONObject";
  if (Allpaths[path_api["path"]][path_api["api"]]["requestBody"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"]["$ref"]) {
    arr = Allpaths[path_api["path"]][path_api["api"]]["requestBody"]["content"]["application/json"]["schema"]["$ref"].split("/");
    return arr[arr.length - 1];
  } else {
    for (param in Allpaths[path_api["path"]][path_api["api"]]["parameters"]) {
      if (Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["in"] === "body") {
        arr = Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["schema"]["$ref"].split("/");
        return arr[arr.length - 1];
      }
    }
  }
}
function ResponseBodyExtractor(path_api) {
  if (Allpaths[path_api["path"]][path_api["api"]]["responses"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"]["$ref"]) {
    arr = Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"]["$ref"].split("/");
    return arr[arr.length - 1];
  }else if (Allpaths[path_api["path"]][path_api["api"]]["responses"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"]) {
    arr = Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"].split("/");
    return arr[arr.length - 1];
  } else {
    console.log("ResponseBodyExtractor problem : swagger Imported is not valid swagger File (at least its not generator by 'Swagger Generator By Alaa :P')"+JSON.stringify(path_api,null,4));
  }
}
function GatewayMappingGenerator(path_api){
    let requestBody = RequestBodyExtractor(path_api);
    let xmlDefinition_XmlInput_XmlOutput =XmlDefinition_XmlInput_XmlOutput_Generator(path_api);
    let mapName= mapNameGenerator("input",path_api);
    if(path_api["api"] ==="get" || path_api["api"] ==="delete"){
      fs.writeFile(
        //get and delete input condition
        ".\\Generators\\" + `${path_api["api"].toUpperCase()+ "_"+mapName}` + ".map",`<?xml version="1.0" encoding="UTF-8"?><mappingRoot xmlns="http://www.ibm.com/2008/ccl/Mapping" domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="true" targetNamespace="default" version="8.0.5.0" xmlns:map="default">
        <inlinedXMLSchema><![CDATA[<?xml version="1.0" encoding="UTF-8"?><xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">  
            ${xmlDefinition_XmlInput_XmlOutput["xmlDefinition"]} 
                                                      </xsd:schema>]]></inlinedXMLSchema>
        <input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var4"/>
        <input inlinedXMLSchema="true" path="../schema_0.xsd" var="var6"/>
        <output path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var5"/>
        <namespaces>
            <namespace kind="supplement" prefix="out" uri="http://www.ibm.com/iib/msl/json"/>
        </namespaces>
        <generation engine="xquery"/>
        <mappingDeclaration name="${path_api["api"].toUpperCase()+ "_"+mapName}">
            <input namespace="http://www.ibm.com/iib/msl/json" path="$var4/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly">
                <cast castType="userDefined" path="$MessageAssembly/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}JSONObject" ref="var4"/>
                ${xmlDefinition_XmlInput_XmlOutput["xmlInput"]}
            </input>
            <output namespace="http://www.ibm.com/iib/msl/json" path="$var5/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly1">
                <cast castType="userDefined" path="$MessageAssembly1/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}JSONObject" ref="var5"/>
                ${xmlDefinition_XmlInput_XmlOutput["xmlOutput"]}
                            </output>
                            ${xmlDefinition_XmlInput_XmlOutput["xmlMoving"]}
        </mappingDeclaration>
    </mappingRoot>`,function (err) {
          if (err) {
            console.log(path_api["api"] + "path: " + path_api["path"]  +" Input has a Error ")
            throw err
          };
          console.log(path_api["api"].toUpperCase() + " "+ path_api["path"]  + " Input is successfully created");
        });
    }else{
      //post input codition
      fs.writeFile(
        ".\\Generators\\" + `${path_api["api"].toUpperCase()+ "_"+mapName}` + ".map",`<?xml version="1.0" encoding="UTF-8"?><mappingRoot xmlns="http://www.ibm.com/2008/ccl/Mapping" domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="true" targetNamespace="default" version="8.0.5.0" xmlns:map="default">
        <inlinedXMLSchema><![CDATA[<?xml version="1.0" encoding="UTF-8"?><xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">   
        ${xmlDefinition_XmlInput_XmlOutput["xmlDefinition"]}  
    </xsd:schema>]]></inlinedXMLSchema>
        <input inlinedXMLSchema="true" path="../schema_0.xsd" var="var6"/>
        <input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var"/>
        <input derivedFrom="MB:JSON_schema_in_swagger_document" path="/swagger.json" var="var1"/>
        <output path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var2"/>
        <output derivedFrom="MB:JSON_schema_in_swagger_document" path="/swagger.json" var="var3"/>
        <namespaces>
            <namespace kind="supplement" prefix="out" uri="http://www.ibm.com/iib/msl/json"/>
        </namespaces>
        <generation engine="xquery"/>
        <mappingDeclaration name="${path_api["api"].toUpperCase()+ "_"+mapName}">
            <input namespace="http://www.ibm.com/iib/msl/json" path="$var/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly">
                <cast derivedFrom="MB:JSON_operation_request" path="$MessageAssembly/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}${requestBody}" ref="var1"/>
                ${xmlDefinition_XmlInput_XmlOutput["xmlInput"]}
            </input>
            <output namespace="http://www.ibm.com/iib/msl/json" path="$var2/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly2">
                <cast derivedFrom="MB:JSON_operation_response" path="$MessageAssembly2/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}${requestBody}" ref="var3"/>
                ${xmlDefinition_XmlInput_XmlOutput["xmlOutput"]}
            </output>
            ${xmlDefinition_XmlInput_XmlOutput["xmlMoving"]}
        </mappingDeclaration>
    </mappingRoot>`,function (err) {
          if (err) {
            console.log(path_api["api"] + "path: " + path_api["path"]  +" Input has a Error ")
            throw err
          };
          console.log(path_api["api"].toUpperCase() + " "+ path_api["path"]  + " Input is successfully created");
        });
    }
}


GatewayMappingGenerator({"path": "/contact/invitation", "api" :"post" });
// GatewayMappingGenerator({"path": "/transaction/bulk/inquiry", "api" :"post" });