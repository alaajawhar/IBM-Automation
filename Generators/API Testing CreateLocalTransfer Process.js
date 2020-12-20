var express = require("express");
const { response } = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); app.post("/order/processLocalTransfer/:paymentId", function (req, res) {
  console.log()
  console.log("-----------------------------------Headers : ----------------------------------------------");
  console.log(req.headers);
  console.log()
  console.log("-----------------------------------Body : -------------------------------------------------");
  console.log(req.body);
  res.status(200).send(


    {
      "header": {
        "id": "string",
        "status": "string",
        "transactionStatus": "string",
        "uniqueIdentifier": "string",
        "audit": {
          "T24_time": 0,
          "versionNumber": "string",
          "requestParse_time": 0,
          "responseParse_time": 0
        }
      },
      "body": {
        "recordStatus": "string"
      }
    }
  


  );
}); app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});