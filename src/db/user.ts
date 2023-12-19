
// Import required modules and libraries
import mongoose from "mongoose";

// Define a Mongoose Schema for the User model
const UserSchema = new mongoose.Schema({
    username : {type : String , required : true , unique :true } , 
    password : { type : String  , required : true }
})

// Create a Mongoose model for the User using the defined schema
export const UserModel = mongoose.model('User', UserSchema);

// Function to create a new user
export const createUser = (values : Record<string,any>) => {
    // Create a new user instance using the UserModel and save it to the database
    new UserModel(values).save()
    .then((user)=>user.toObject() )
} ;

// Function to retrieve a user by their username
export const getUserByName = (username: string) => UserModel.findOne({ username });

// Function to update a user by their ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);