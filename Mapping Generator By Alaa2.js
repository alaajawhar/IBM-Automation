const { Console } = require("console");
var fs = require("fs");
const { findSourceMap } = require("module");
STCSwaggerPath =
  "C:\\Users\\E195\\Desktop\\STC\\T24\\Workspace\\LocalTransferForTemenos\\t24swaggers_createLocal-Transfer-v1.0.0-swagger";
try {
  let STC_Swagger = require(STCSwaggerPath);
  var AllDefinitions = STC_Swagger["definitions"];
  var Allpaths = STC_Swagger["paths"];
} catch (err) {
  throw `bad json file !!! recheck it please : ${STCSwaggerPath}`;
}
let xmlDefinitionParameters = "ssssssssssss";
let xmlOutputParameters = "";
let inputField = "";
let outputField = "";

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
function XmlOutputParameters_XmlDefinition_Generator(path_api) {
  xmlOutputParameters = "";
  xmlDefinitionParameters = "";
  if (Allpaths[path_api["path"]][path_api["api"]]["parameters"]) {
    for (param in Allpaths[path_api["path"]][path_api["api"]]["parameters"]) {
      if (Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["type"]) {
          xmlDefinitionParameters = xmlDefinitionParameters.concat(`<xsd:element name="${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}" type="xsd:${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["type"]}"/>\n`)
          xmlOutputParameters = xmlOutputParameters.concat(`<cast castType="userDefined" path="$MessageAssembly1/LocalEnvironment/Destination/REST/Request/Parameters/any" qualifier="${Allpaths[path_api["path"]][path_api["api"]]["parameters"][param]["name"]}" ref="var6"/> \n`)
      }
    }
  }
}
function RequestBodyExtractor(path_api) {
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
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  return "Error in RequestBodyExtractor";
}

function ResponseBodyExtractor(path_api) {
  inputField = "";
  outputField = "";
  xmlOutputParameters = "";
  xmlDefinitionParameters = "";
  if (Allpaths[path_api["path"]][path_api["api"]]["responses"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"]["$ref"]) {
    arr = Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["items"]["$ref"].split("/");
    return arr[arr.length - 1];
  }else if (Allpaths[path_api["path"]][path_api["api"]]["responses"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"] && Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"]) {
    arr = Allpaths[path_api["path"]][path_api["api"]]["responses"]["200"]["schema"]["$ref"].split("/");
    return arr[arr.length - 1];
  } else {
    console.log("inputField extractiong problem : swagger Imported is not valid swagger File (at least its not generator by 'Swagger Generator By Alaa :P')"+JSON.stringify(path_api,null,4));
  }
}

function MappingGeneratorOf(requestPath_requestAPI, responsePath_responseAPI) {
  let mapName = mapNameGenerator(
    requestPath_requestAPI,
    responsePath_responseAPI
  );
  console.log(mapName + ".map");

  if (requestPath_requestAPI === "input") {
    inputField = "JSONObject";
  } else {
    inputField = ResponseBodyExtractor(requestPath_requestAPI);
  }

  if (responsePath_responseAPI === "output") {
    outputField = "JSONObject";
    xmlDefinitionParameters= `<xsd:element name="X-platform" type="xsd:string"/> 
    <xsd:element name="X-language-key" type="xsd:string"/> 
    <xsd:element name="X-version" type="xsd:string"/> 
    <xsd:element name="X-build-number" type="xsd:integer"/> 
    <xsd:element name="X-message-id" type="xsd:string"/> 
    <xsd:element name="X-latitude" type="xsd:string"/> 
    <xsd:element name="X-longitude" type="xsd:string"/> 
    <xsd:element name="X-user-token" type="xsd:string"/> 
    <xsd:element name="X-security-token" type="xsd:string"/> 
    <xsd:element name="X-device-id" type="xsd:string"/> 
    <xsd:element name="X-mobile-number" type="xsd:string"/>`
  } else if (responsePath_responseAPI["api"] === "get") {
    XmlOutputParameters_XmlDefinition_Generator(responsePath_responseAPI);
    outputField = "JSONObject";
  } else {
    XmlOutputParameters_XmlDefinition_Generator(responsePath_responseAPI);
    outputField = RequestBodyExtractor(responsePath_responseAPI);
    // console.log(xmlOutputParameters)
  }
  fs.writeFile(
    ".\\Generators\\" + mapName + ".map",
    `<?xml version="1.0" encoding="UTF-8"?><mappingRoot xmlns="http://www.ibm.com/2008/ccl/Mapping" domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="true" targetNamespace="default" version="8.0.5.0" xmlns:map="default">
    <inlinedXMLSchema><![CDATA[<?xml version="1.0" encoding="UTF-8"?><xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    ${xmlDefinitionParameters}
    </xsd:schema>]]></inlinedXMLSchema>
    <input path="jar:file://!com/ibm/etools/mft/map/xsds/assembly/Environment.xsd" var="var"/>
    <input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var4"/>
    <input derivedFrom="MB:JSON_schema_in_json_file" path="/${STCSwaggerPath.split("\\")[STCSwaggerPath.split("\\").length - 1]
    }" var="var2"/>
    <input inlinedXMLSchema="true" path="../schema_0.xsd" var="var6"/>
    <output path="jar:file://!com/ibm/etools/mft/map/xsds/assembly/Environment.xsd" var="var1"/>
    <output path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/JsonDomainMsg.xsd" var="var5"/>
    <output derivedFrom="MB:JSON_schema_in_json_file" path="/${STCSwaggerPath.split("\\")[STCSwaggerPath.split("\\").length - 1]
    }" var="var3"/>
    <namespaces>
    <namespace kind="supplement" prefix="in" uri="http://www.ibm.com/iib/msl/json"/>
    </namespaces>
    <generation engine="xquery"/>
    <mappingDeclaration name="${mapName}">
    <input path="$var/mb:env(Environment)" var="Environment">
            <cast castType="userDefined" path="$Environment/any" qualifier="X-platform" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-language-key" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-version" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-build-number" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-message-id" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-latitude" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-longitude" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-user-token" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-security-token" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-device-id" ref="var6" var="any11"/> 
<cast castType="userDefined" path="$Environment/any" qualifier="X-mobile-number" ref="var6" var="any11"/>
        </input>
    <input namespace="http://www.ibm.com/iib/msl/json" path="$var4/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly">
    <cast derivedFrom="MB:JSON_TYPE" path="$MessageAssembly/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}${inputField}" ref="var2"/>
    </input>
    <output path="$var1/mb:env(Environment)" var="Environment1">
            <cast castType="userDefined" path="$Environment1/any" qualifier="X-platform" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-language-key" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-version" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-build-number" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-message-id" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-latitude" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-longitude" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-user-token" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-security-token" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-device-id" ref="var6" var="any12"/> 
<cast castType="userDefined" path="$Environment1/any" qualifier="X-mobile-number" ref="var6" var="any12"/>
        </output>
    <output namespace="http://www.ibm.com/iib/msl/json" path="$var5/mb:msg(JSON,assembly,JSON,LocalEnvironment,Properties)" var="MessageAssembly1">
            <cast derivedFrom="MB:JSON_TYPE" path="$MessageAssembly1/JSON/Data/type('anyType')" qualifier="{http://www.ibm.com/iib/msl/json}${outputField}" ref="var3"/>
            ${xmlOutputParameters}
            </output>
            <passthrough>
            <input path="$Environment/."/>
            <output path="$Environment1/."/>
            <updates/>
        </passthrough>
            </mappingDeclaration>
        </mappingRoot>`,

    function (err) {
      if (err) throw err;
    }
  );
}
function ultimateMappingGeneratorOf(...path_api) {
  for (let i = 0; i < path_api.length - 1; i++) {
    MappingGeneratorOf(path_api[i], path_api[i + 1]);
  }
}

module.exports.ultimateMappingGeneratorOf =ultimateMappingGeneratorOf;


ultimateMappingGeneratorOf("input",
{"path": "/Gift/v1/Receive", "api" :"post" },
"output");

// ultimateMappingGeneratorOf("input",
// {"path": "/Global/v2/Region", "api" :"get" },
// "output");

ultimateMappingGeneratorOf("input",
{"path": "/party/createLocalTransfer/{debitAccountId}/{amount}/{benAccountNumber}/{benCustomer}", "api" :"post" },
"output");

// ultimateMappingGeneratorOf("input",
// {"path": "/Global/v2/District", "api" :"post" },
// "output");

// ultimateMappingGeneratorOf("input",
// {"path": "/Mss/v1/FinishKYCVerify", "api" :"post" },
// "output");