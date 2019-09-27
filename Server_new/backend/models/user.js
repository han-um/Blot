module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false
        },
        wAddr: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false
        } 
    }, {
        tableName: 'user',
        timestamps: false
    });
}