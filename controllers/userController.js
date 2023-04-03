const { User, Doctor, Service } = require("../models");

const userController = {};

userController.getAllUsersAsDoctor = async (req, res) => {
    try {
        const users = await User.findAll(
            {
                where:{
                    role_id : 1
                },
            attributes: {
                exclude: ["password", "createdAt","updatedAt", "role_id"],
        }
    }
        );
        return res.json(
            {
            success: true,
            message: "All Registered Users succesfully retrieved as user doctor",
            data: users
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong trying to get all registered users as user doctor",
            error: error.message
        })
    }
}

userController.getMyUser = async(req,res) => {
    try {
        const user = await User.findByPk(req.userId);
        return res.json(
            {
                success: true,
                message: "User succesfully retrieved",
                data: user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error.message
            }
        );
    }
}

userController.updateMyUser = async(req,res) => {
    try {
        const user = req.User;
        const changes= req.body.changes;
        
        user.update(changes);
        user.save();
        return res.json(
            {
                success: true,
                message: "User succesfully updated",
                data: user
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error.message
            }
        );
    }
}

userController.getAllUsersAsAdmin = async (req, res) => {
    try {
        const users = await User.findAll(
            {     
            attributes: {
                exclude: ["password"],
        }
    }
        );
        return res.json(
            {
            success: true,
            message: "All Registered Users succesfully retrieved as user admin",
            data: users
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong trying to get all registered users as user admin",
            error: error.message
        })
    }
}

userController.getMyDoctors= async (req, res) => {
    try{
        let doctorUsers = [];
        const doctors = await Doctor.findAll();
        for(let doctor of doctors){
            let user=  await User.findOne(
                {
                    where:{
                        id : doctor.user_id
                    },
                attributes: {
                    exclude: ["password", "createdAt","updatedAt", "role_id","phone", "email", "address"],
                }
            });
            user.doctor_id= doctor.id;
            doctorUsers.push(user);
        }
        
        return res.json(
            {
            success: true,
            message: "All your doctors retrieved",
            data: doctorUsers
            });
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong trying to get my medics",
            error: error.message
        })
    }
}
userController.getMyServices= async (req, res) => {
try{
        const services = await Service.findAll();
        return res.json(
            {
            success: true,
            message: "All your services retrieved",
            data: services
            });
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong trying to get my services",
            error: error.message
        })
    }
}
module.exports = userController;