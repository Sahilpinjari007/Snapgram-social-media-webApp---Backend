import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowecase: true, trim: true },
    fullname: { type: String, index: true },
    username: { type: String, required: true, unique: true, lowecase: true, trim: true, index: true },
    password: { type: String, required: [true, 'Password is required'] },
    refreshToken: { type: String },
    avtar: { type: String },
    bio: { type: String },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        password: this.password
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

const userModel = mongoose.model('Users', userSchema);

export { userModel };