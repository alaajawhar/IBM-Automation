var Swagger_Generator_By_Alaa = require('./Swagger Generator By Alaa');
// var REST_Request_Generator_By_Alaa = require('./REST Request Generator By Alaa');


Swagger_Generator_By_Alaa.swagger.add("/transaction/push/{paymentReference}", "get");
Swagger_Generator_By_Alaa.swagger.add("/transaction/push/finish", "post");
Swagger_Generator_By_Alaa.swagger.add("/transaction/push/{paymentReference}", "delete");
Swagger_Generator_By_Alaa.swagger.add("/customer/plate", "post");
Swagger_Generator_By_Alaa.swagger.add("/customer/plate/{plateId}", "delete");
Swagger_Generator_By_Alaa.swagger.create();



// REST_Request_Generator_By_Alaa.swagger.add("/account", "get");
// REST_Request_Generator_By_Alaa.swagger.create();


// var Testing_Server_Generator_By_Alaa = require("./Testing Server Generator By Alaa");
// Testing_Server_Generator_By_Alaa.generateServerOf();