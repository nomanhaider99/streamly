import mongoose, { Schema } from 'mongoose';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    isVerified: boolean;
    posts: any[];
}

export interface Posts {
    image: string
    description: string;
    createdAt: Date;
}

const postSchema: Schema<Posts> = new Schema({
    image: { type: String },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const userSchema: Schema<User> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    posts: [postSchema]
});

// Check if the model already exists
const UserModel = mongoose.models.Accounts || mongoose.model<User>('Accounts', userSchema);

export default UserModel;
