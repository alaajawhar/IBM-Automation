var express = require("express");
const { response } = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); app.get("/party/getWalletAccounts/:customerId", function (req, res) {
  console.log()
  console.log("-----------------------------------Headers : ----------------------------------------------");
  console.log(req.headers);
  console.log()
  console.log("-----------------------------------Body : -------------------------------------------------");
  console.log(req.body);
  res.status(200).send(
    {
      "header": {
        "audit": {
          "T24_time": 0,
          "versionNumber": "string",
          "requestParse_time": 0,
          "responseParse_time": 0
        },
        "status": "string",
        "page_size": 0,
        "page_start": 0,
        "total_size": 0,
        "page_token": "string"
      },
      "body": [
        {
          "accountNumber": "999",
          "accountName": "string",
          "currency": "LBP",
          "accountType": "9",
          "workingBalance": 0,
          "availableBalance": 99,
          "ledgerBalance": 0,
          "externalReference": 0
        }
      ]
    }
  );
}); app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});