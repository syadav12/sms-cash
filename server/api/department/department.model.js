let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function() {
   return department = connection.define('department',{
     id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:'uniqueDepartment'
       },
       abbreviated_name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:'uniqueDepartment'
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false,
           defaultValue:true
       }
   },
   {
     classMethods:{
       associate:function(model){
         let course=model.course
         let dept=model.department
         course.hasMany(dept,{
           foreignKey:'course_id',
           unique:'uniqueDepartment'
        })
      }
   }
 })
}
module.exports=init