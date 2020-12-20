Response = JSON.parse(responseBody);
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    
    if(pm.response.status == "OK")
{
  if(Response.day)
  {
      pm.test("checking if Response.day is a string",function(){ 
          pm.expect(Response.day).to.be.a('string');
      });
  }
  pm.test("checking if Response.day is not null",function(){ 
      pm.expect(Response.day).to.be.not.undefined;
  });   

  if(Response.device[0].adjustToken)
  {
      pm.test("checking if Response.device[0].adjustToken is a string",function(){ 
          pm.expect(Response.device[0].adjustToken).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].adjustToken is not null",function(){ 
      pm.expect(Response.device[0].adjustToken).to.be.not.undefined;
  });   

  if(Response.device[0].deviceGuid)
  {
      pm.test("checking if Response.device[0].deviceGuid is a string",function(){ 
          pm.expect(Response.device[0].deviceGuid).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].deviceGuid is not null",function(){ 
      pm.expect(Response.device[0].deviceGuid).to.be.not.undefined;
  });   

  if(Response.device[0].loginType)
  {
      pm.test("checking if Response.device[0].loginType is a string",function(){ 
          pm.expect(Response.device[0].loginType).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].loginType is not null",function(){ 
      pm.expect(Response.device[0].loginType).to.be.not.undefined;
  });   

  if(Response.device[0].mac)
  {
      pm.test("checking if Response.device[0].mac is a string",function(){ 
          pm.expect(Response.device[0].mac).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].mac is not null",function(){ 
      pm.expect(Response.device[0].mac).to.be.not.undefined;
  });   

  if(Response.device[0].make)
  {
      pm.test("checking if Response.device[0].make is a string",function(){ 
          pm.expect(Response.device[0].make).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].make is not null",function(){ 
      pm.expect(Response.device[0].make).to.be.not.undefined;
  });   

  if(Response.device[0].name)
  {
      pm.test("checking if Response.device[0].name is a string",function(){ 
          pm.expect(Response.device[0].name).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].name is not null",function(){ 
      pm.expect(Response.device[0].name).to.be.not.undefined;
  });   

  if(Response.device[0].osName)
  {
      pm.test("checking if Response.device[0].osName is a string",function(){ 
          pm.expect(Response.device[0].osName).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].osName is not null",function(){ 
      pm.expect(Response.device[0].osName).to.be.not.undefined;
  });   

  if(Response.device[0].osVersion)
  {
      pm.test("checking if Response.device[0].osVersion is a string",function(){ 
          pm.expect(Response.device[0].osVersion).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].osVersion is not null",function(){ 
      pm.expect(Response.device[0].osVersion).to.be.not.undefined;
  });   

  if(Response.device[0].platform)
  {
      pm.test("checking if Response.device[0].platform is a string",function(){ 
          pm.expect(Response.device[0].platform).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].platform is not null",function(){ 
      pm.expect(Response.device[0].platform).to.be.not.undefined;
  });   

  if(Response.device[0].publicKey)
  {
      pm.test("checking if Response.device[0].publicKey is a string",function(){ 
          pm.expect(Response.device[0].publicKey).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].publicKey is not null",function(){ 
      pm.expect(Response.device[0].publicKey).to.be.not.undefined;
  });   

  if(Response.device[0].pushToken)
  {
      pm.test("checking if Response.device[0].pushToken is a string",function(){ 
          pm.expect(Response.device[0].pushToken).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].pushToken is not null",function(){ 
      pm.expect(Response.device[0].pushToken).to.be.not.undefined;
  });   

  if(Response.device[0].signAlgType)
  {
      pm.test("checking if Response.device[0].signAlgType is a string",function(){ 
          pm.expect(Response.device[0].signAlgType).to.be.a('string');
      });
  }
  pm.test("checking if Response.device[0].signAlgType is not null",function(){ 
      pm.expect(Response.device[0].signAlgType).to.be.not.undefined;
  });   

  if(Response.flowStatus)
  {
      pm.test("checking if Response.flowStatus is a string",function(){ 
          pm.expect(Response.flowStatus).to.be.a('string');
      });
  }
  pm.test("checking if Response.flowStatus is not null",function(){ 
      pm.expect(Response.flowStatus).to.be.not.undefined;
  });   

  if(Response.idNumber)
  {
      pm.test("checking if Response.idNumber is a string",function(){ 
          pm.expect(Response.idNumber).to.be.a('string');
      });
  }
  pm.test("checking if Response.idNumber is not null",function(){ 
      pm.expect(Response.idNumber).to.be.not.undefined;
  });   

  if(Response.mobileNumber)
  {
      pm.test("checking if Response.mobileNumber is a string",function(){ 
          pm.expect(Response.mobileNumber).to.be.a('string');
      });
  }
  pm.test("checking if Response.mobileNumber is not null",function(){ 
      pm.expect(Response.mobileNumber).to.be.not.undefined;
  });   

  if(Response.month)
  {
      pm.test("checking if Response.month is a string",function(){ 
          pm.expect(Response.month).to.be.a('string');
      });
  }
  pm.test("checking if Response.month is not null",function(){ 
      pm.expect(Response.month).to.be.not.undefined;
  });   

  if(Response.password)
  {
      pm.test("checking if Response.password is a string",function(){ 
          pm.expect(Response.password).to.be.a('string');
      });
  }
  pm.test("checking if Response.password is not null",function(){ 
      pm.expect(Response.password).to.be.not.undefined;
  });   

  if(Response.year)
  {
      pm.test("checking if Response.year is a string",function(){ 
          pm.expect(Response.year).to.be.a('string');
      });
  }
  pm.test("checking if Response.year is not null",function(){ 
      pm.expect(Response.year).to.be.not.undefined;
  });   

  }