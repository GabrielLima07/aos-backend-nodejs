const getUserMatchHistoryModel = (sequelize, { DataTypes }) => {
    const UserMatchHistory = sequelize.define("user_match_history", {
        /* id: uuid / user_id: uuid / match_id: uuid/ result: string */
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true,
            validate: {
                notEmpty: true,
            },
        }, 
        match_id: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true,
            validate: {
                notEmpty: true,
            },
        },
        result: {
            type: DataTypes.STRING,
        },
    });

    /* UserMatchHistory.associate = (models) => {
        UserMatchHistory.belongsTo(models.User);
        UserMatchHistory.hasMany(models.Match);
    } */
    return UserMatchHistory;
};

export default getUserMatchHistoryModel;