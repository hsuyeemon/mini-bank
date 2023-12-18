
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type : String , required : true , unique :true } , 
    password : { type : String  , required : true }
})


export const UserModel = mongoose.model('User', UserSchema);

export const createUser = (values : Record<string,any>) => {
    new UserModel(values).save()
    .then((user)=>user.toObject() )
} ;


export const getUserByName = (username: string) => UserModel.findOne({ username });