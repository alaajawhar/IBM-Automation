var input=`
@HOLD_ID INT OUTPUT, 
      @STATUS_ID INT OUTPUT,
	  @XACT_STATUS_ID INT OUTPUT,	  
	  @TRANS_TYPE_ID INT=NULL, 
      @TRANS_CODE INT=NULL, 
      @NARRATIVE NVARCHAR(500)=NULL, 
      @NARRATIVE_AR NVARCHAR(500)=NULL,      
	  @CUST_ID INT=NULL, 
      @ACCOUNT_ID INT=NULL, 
      @LNK_ACCOUNT_CONTRACT_ID INT=NULL, 
      @LNK_CUST_ID INT=NULL, 
      @AMOUNT DECIMAL(24,3)=NULL, 
      @CURRENCY_ID INT=1, 
      @EXPIRY_DATE DATETIME=NULL, 
      @HOLD_REFERENCE VARCHAR(100)=NULL, 
      @CUSTOMER_NOTE NVARCHAR(200)=NULL,
	  @TRY_HOLD BIT=0,
	  @ALLOW_BLOCKING_EXCESS BIT=0,
	  @BLOCK_EXCESS_FIRST BIT=0,
	  @HOLD_AMOUNT DECIMAL(24,3) OUTPUT, 
      @EXCESS_LIMIT_AMOUNT DECIMAL(24,3) OUTPUT,
	  @EXECUTED_BY VARCHAR(100) =NULL
`

function extractInput(input){
    let array = input.split("\n");
    for (let i=0;i<array.length;i++){
        if(array[i].trim() === '') continue;
        console.log(RetrieveWord(array[i].trim(),"@"," "));
    }
}

function RetrieveWord(string,firstCharacter,secondCharacter){
    return string.substring(string.indexOf(firstCharacter)+1,string.indexOf(secondCharacter));
}
// console.log(RetrieveWord(`      @STATUS_ID INT OUTPUT,`.trim(),"@"," "));
extractInput(input)