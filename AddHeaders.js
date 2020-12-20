const { CONNREFUSED } = require("dns");
let allHeaders=[
    {
      name: 'X-platform',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-language-key',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-version',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-build-number',
      in: 'header',
      required: true,
      type: 'integer',
      format: 'int32',
      description: ''
    },
    {
      name: 'X-message-id',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-latitude',
      in: 'header',
      required: false,
      type: 'string',
      description: ''
    },
    {
      name: 'X-longitude',
      in: 'header',
      required: false,
      type: 'string',
      description: ''
    },
    {
      name: 'X-user-token',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-security-token',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-device-id',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    },
    {
      name: 'X-mobile-number',
      in: 'header',
      required: true,
      type: 'string',
      description: ''
    }];
let missing_param=[];
path="C:\\Users\\E195\\Desktop\\STC\\T24\\Workspace\\localTransfer\\t24swaggers_createLocal-Transfer-v1.0.0-swagger";
let json = require(path);
for(path in json["paths"]){
    for( api in json["paths"][path]){
        arr = json["paths"][path][api]["parameters"];
        for(let i =0;i<arr.length;i++){
            if(arr[i]["name"] !== "X-platform" && arr[i]["name"] !== "X-language-key" &&arr[i]["name"] !== "X-build-number"&&arr[i]["name"] !== "X-message-id"&&arr[i]["name"] !== "X-latitude"
            &&arr[i]["name"] !== "X-longitude" &&arr[i]["name"] !== "X-user-token" && arr[i]["name"] !== "X-security-token"&& arr[i]["name"] !== "X-device-id"&& arr[i]["name"] !== "X-mobile-number"&& arr[i]["name"] !== "X-version"){
                missing_param=arr[i]
            }
        }
        json["paths"][path][api]["parameters"] = allHeaders.concat(missing_param);
    }
}
var fs = require("fs");
fs.writeFile(".\\Generators\\addedHeadersSTCwebApp.json",JSON.stringify(json,null,4),function(err){
    if(err) throw err;
})