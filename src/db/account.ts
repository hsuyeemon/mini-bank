// Import required modules and libraries
import mongoose from "mongoose";

// Define a Mongoose Schema for the Account model
const AccountSchema = new mongoose.Schema({

  account_no: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  account_type: { type: String, required: true },
  account_status: { type: String },
  balance: { type: String },
  created_date: { type: Date }

});

// Create a Mongoose model for the Account using the defined schema
export const AccountModel = mongoose.model('Account', AccountSchema);

// Function to retrieve an account by its account number
export const getAccountByAccountNo = (account_no: string) => AccountModel.findOne({ account_no });

// Function to create a new account
export const createAccount = (values: Record<string, any>) => {
  new AccountModel(values).save()
    .then((acc) => acc.toObject())
}

//export const updateAccountByAccountNo = (account_no : string , values : Record<string,any>) => {

//  console.log("model",values)
//  AccountModel.findOneAndUpdate({account_no}, {$set:values}, { new: true } )
//}

// Function to update an account by its account number
export const updateAccountByAccountNo = (account_no: string, values: Record<string, any>) => AccountModel.findOneAndUpdate({ account_no }, values
  , { new: true });
