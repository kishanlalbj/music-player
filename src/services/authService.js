import User from "../models/User"

export const getUserById = async (id) => {

    const user = await User.findById(id);

    return user

}