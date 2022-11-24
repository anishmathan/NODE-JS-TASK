const { response } = require('express')
const Employee =require('../model/Employee')
//show the list of Employees

const index =(req, res, next)=>{
    Employee.Paginate({}, {page:req.query.page, limit:req.query.limit})

    //Employee.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message: 'An Error Occured' +error
        })
    })
}

    
       
//show single  employee

const show=(req, res, next)=>{
let employeeID = req.body.employeeID
Employee.findById(employeeID)
.then(response=>{
    res.json({
        response
    })
})

.catch(error=>{
    message:'An Error Occured'
})
}

// add new Employee
const store=(req, res, next)=>{
    let employee=new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
       
    })
    if(req.file){
        employee.avatar = req.file.path
    }

    employee.save()

    .then(response =>{
        res.json({
            message:'Employee Added Successfully'
        })
    })
    .then(error=>{
        res.json({
            message:'An Error Occured'
        })
    })
}

//update an Employee

const update = (req, res, next)=>{
    let employeeID=req.body.employeeID

    letupdateData={
        name:req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    //Employee.findByIdAndUpdate(employeeID {$set: updateData})
    Employee.findByIdAndUpdate(employeeID)
    .then(()=>{
        res.json({
            message: 'Employee Updated Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An Error Occured'
    })
    })
}

// delete an employee

const destroy =(req, res, next)=>{
    let employeeID=req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        message:'Employee Deleted Successfully'
    })
    .catch(error=>{
        req.json({
            message:'An Error Occurred'
        })
    })
}
module.exports={
    index, show, store, update, destroy
}