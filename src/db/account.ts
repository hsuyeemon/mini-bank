import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
     
    account_no : { type : String  , required : true , unique :true},
    user_id : {type : String , required : true } ,
    account_type : { type : String , required : true },
    account_status :{ type : String },
    balance : { type : String },
    created_date : { type : Date }

});


export const AccountModel = mongoose.model('Account', AccountSchema);


export const getAccountByAccountNo = (account_no: string)=> AccountModel.findOne({account_no});

export const createAccount = ( values : Record<string,any> )=> {
    new AccountModel(values).save()
    .then((acc)=> acc.toObject() )
}

//export const updateAccountByAccountNo = (account_no : string , values : Record<string,any>) => {

  //  console.log("model",values)
  //  AccountModel.findOneAndUpdate({account_no}, {$set:values}, { new: true } )
//}

export const updateAccountByAccountNo = (account_no: string, values: Record<string, any>) => AccountModel.findOneAndUpdate({account_no}, values
  , {new:true});
