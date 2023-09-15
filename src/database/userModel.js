import {Schema, model} from 'mongoose';
import {hash, compare} from 'bcrypt';

const {HASHING_SALT} = process.env;


const userSchema = new Schema({
    username: {
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
    }
});

userSchema.pre('save', async function(next) {
   if (this.isModified()) {
    this.password = await hash(this.password, +HASHING_SALT);
    next();
   }
})

userSchema.methods.verifyPassword = async function(password) {
  return await compare(password, this.password);
}

const User = model('User', userSchema);

export default User;