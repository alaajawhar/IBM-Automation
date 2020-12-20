var fs = require("fs");
var jsonBody =
//-----------------------------------------------JSON Body----------------------------------------
{
  "day": "29",
  "device": [{
    "adjustToken": "e08fd61f74c834d10681e0ecf28a103f",
    "deviceGuid": "9371c9d2b347e9d1",
    "loginType": "PASSWORD",
    "mac": "2:0:0:44:55:66",
    "make": "google generic_x86",
    "name": "Android SDK built for x86",
    "osName": "P",
    "osVersion": "27",
    "platform": "ANDROID",
    "publicKey": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5QlN76b8nJo4XyO8CjmtteqCeWmOJ/ecEJYDkRLT\nb/a1zJpgUU2cTqTgCdvIhJCyJiapI97vG5Ko90CIr4pRJA==\n-----END PUBLIC KEY-----",
    "pushToken": "eddhyvyfST2zXa99w7I08u:APA91bEvSV2qBpOtwbw77V-nCf0MHoxg5p3p9JSrg41U92XvsGseGOixjeSu-wkXfqSsgi1oISR2t3Y5ZUtsvzolJGIRHhHTTmKNPWg2j9Q2qlPhT28QPWgCDACUJt5jVTdA24uT6YDw",
    "signAlgType": "ECDSA"
  }],
  "flowStatus": "REGISTER_NEW_DEVICE",
  "idNumber": "1098970930",
  "mobileNumber": "0565083692",
  "month": "07",
  "password": "123456",
  "year": "1997"
}

//-----------------------------------------------JSON Body----------------------------------------

function writeTests(list) {
  fs.writeFileSync(
    `.\\Generators\\Postman Tests.js`,
    `Response = JSON.parse(responseBody);
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    
    if(pm.response.status == "OK")\n{`,
    function (err) {
      if (err) console.log("Alaa's error 100");
    }
  );
//--------------------------------------------Start Of Loop---------------------------------------------
  for (let item in list) {
    fs.appendFileSync(`.\\Generators\\Postman Tests.js`, `
  if(Response${item})
  {
      pm.test("checking if Response${item} is a ${list[item]}",function(){ 
          pm.expect(Response${item}).to.be.a('${list[item]}');
      });
  }
  pm.test("checking if Response${item} is not null",function(){ 
      pm.expect(Response${item}).to.be.not.undefined;
  });   
`, function (err) {
      if (err) console.log("Alaa's error 101");
    });
  }
//--------------------------------------------End Of Loop---------------------------------------------
  fs.appendFileSync(`.\\Generators\\Postman Tests.js`,`\n  }`,function(err){
    if(err) console.log("Alaa's Error 102")
    else console.log("Done")
  })
}

function Run() {
  ReturnsListOf_Pathvalue(jsonBody, "");
  writeTests(list);
}

let list = {};
function ReturnsListOf_Pathvalue(JsonBody, objectName) {
  for (let i = 0; i < Object.keys(JsonBody).length; i++) {
    key = Object.keys(JsonBody)[i];
    value = Object.values(JsonBody)[i];
    // console.log(key +" "+value + objectName);
    if (typeof (value) === "object") {
      ReturnsListOf_Pathvalue(JsonBody[key], `${objectName}.${key}`);
    }
    else {
      listKey = `${objectName}.${key}`.replace(/.0/g, '[0]');
      list[listKey] = typeof (value);
    }
  }
}




function Json2Csharp(className,JsonBody)
{
  let listOfClasses={};
  fs.appendFileSync(`.\\Generators\\Csharp.cs`,
  `public class ${className}{\n`,
  function(err){console.log("Alaa's Error 105")});
  for(let item in JsonBody)
  {
    if(typeof(JsonBody[item]) == "object")
    {// add object 
      fs.appendFileSync(`.\\Generators\\Csharp.cs`,
      `[JsonProperty("${item}")]\npublic ${item.charAt(0).toUpperCase()+ item.slice(1)} ${item} { get; set; }\n`,
      function(err){if(err) console.log("Alaa's Error 103")});
      listOfClasses[item] = JsonBody[item];
    }
    else{// add property
      fs.appendFileSync(`.\\Generators\\Csharp.cs`,
      `[JsonProperty("${item}")]\npublic ${typeof(JsonBody[item])} ${item} { get; set; }\n`,
      function(err){if(err) console.log("Alaa's Error 104")})
    }
  }
  fs.appendFileSync(`.\\Generators\\Csharp.cs`,
  `}\n//---------------------------------------------\n`,
  function(err){console.log("Alaa's Error 105")});
  for (subField in listOfClasses)
  {
    Json2Csharp(`${subField}`,listOfClasses[subField])
  }
}








Run();
Json2Csharp("firstClassName",jsonBody);
