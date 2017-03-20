let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let personalCalendar= connection.define('personal_calendar',{
   id: {
       type: sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
   heading: {
        type: sequelize.TEXT,
       allowNull: false,
     },
    content: {
       type: sequelize.TEXT,
       allowNull: false
     },
   start_date: {
       type: sequelize.DATE,
       allowNull: false
    },
    end_date: {
       type: sequelize.DATE,
       allowNull: false
    }
  },
 {
 classMethods : {
    associate : function(models){
      let personalCalendar  = models.personal_calendar
      let userDetail  = models.user_detail
      userDetail.hasMany(personalCalendar,{
        foreignKey : "user_id"
      })
    },
    fetchPersonalCalendarList: function(db, userId){
      personalCalendar = db.personal_calendar

      return personalCalendar.findAll({
        attributes: ['heading', 'end_date', 'start_date', 'content'],
        where: { user_id: userId}
      }).then((data) => {
        return data
      })
    }
  }
},
{
 instanceMethods:{}
}
);
 return personalCalendar;
};

/*
$.getJSON( "ajax/test.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
*/