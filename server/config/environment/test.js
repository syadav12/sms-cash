'use strict';
// Development specific configuration
// ==================================
module.exports = {
    sequelize: {
        uri: 'postgres://postgres:password@localhost:5432/localsms',
        options: {
            logging: false,
            dialect: 'postgres',
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true,
            }
        }
    }
};
//uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',