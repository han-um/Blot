module.exports = function(sequelize, DataTypes) {
    return sequelize.define('library', {
        projId: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'library',
        timestamps: false
    });
}