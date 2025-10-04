import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// This function runs BEFORE a user document is saved to the database
userSchema.pre('save', async function(next) {
    // We only want to hash the password if it's new or has been modified
    if (!this.isModified('password')) {
        next();
    }

    // Generate a "salt" to make the hash more secure
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Add a method to our schema to compare passwords for login
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;