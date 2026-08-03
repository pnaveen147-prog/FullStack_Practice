const userService = require('../services/user.service');
const successResponse = require('../responses/successResponse');
const AppError = require('../errors/AppError');


//Old w
// const createUser = async (req, res) => {
//     try {
//         const user = await userService.createUser(req.body);
//         // res.status(201).json({
//         //     success: true,
//         //     message: 'User created successfully',
//         //     data: user
//         // });
//         return successResponse
//         (res, 201, 'User created successfully', user);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to create user'
//         });
//     }   
// };

// const getUsers = async (req, res) => {
//     try {
//         const users = await userService.getUsers();
//         // res.status(200).json({  
//         //     success: true,
//         //     count: users.length,
//         //     data: users
//         // });

//         return successResponse
//         (res, 200, 'Users fetched successfully', users, { count: users.length });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to fetch users'
//         });
//     }
// };

// const getUser = async (req, res) => {
//     try {
//         const user = await userService.getUserById(req.params.id);
//         if (!user) {    
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         // res.status(200).json({
//         //     success: true,
//         //     data: user
//         // });
//         return successResponse
//         (res, 200, 'User fetched successfully', user);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to fetch user'
//         });
//     }   
// };

// const updateUser = async (req, res) => {
//     try {
//         const user = await userService.updateUser(req.params.id, req.body);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         // res.status(200).json({
//         //     success: true,
//         //     data: user
//         // });
//         return successResponse
//         (res, 200, 'User updated successfully', user);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to update user'
//         });
//     }
// };

// const deleteUser = async (req, res) => {
//     try {
//         const user = await userService.deleteUser(req.params.id);   
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         // res.status(200).json({
//         //     success: true,
//         //     message: 'User deleted successfully'
//         // });
//         return successResponse
//         (res, 200, 'User deleted successfully', null);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Failed to delete user'
//         });
//     }
// };

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    return successResponse(res, 201, 'User created successfully', user);
}

const getUsers = async (req, res) => {
    const { page = 1, limit = 10, search, role, age } = req.query;
    const result = await userService.getUsers({page, limit, search, role, age});
    return successResponse(res, 200, 'Users fetched successfully',result.data, result.pagination);
}
   

const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
       throw new AppError('User not found', 404);
    }
    return successResponse(res, 200, 'User fetched successfully', user);
}

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
     throw new AppError('User not found', 404);
    }
    return successResponse(res, 200, 'User updated successfully', user);
}

const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return successResponse(res, 200, 'User deleted successfully', null);
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};