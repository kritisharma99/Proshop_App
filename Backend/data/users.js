import bcrypt from "bcryptjs"


const Users = [
    {
        name:'Admin User',
        email:'admin@abc.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John User',
        email:'John@abc.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Dev User',
        email:'dev@abc.com',
        password:bcrypt.hashSync('123456',10),
    },
]

export default Users