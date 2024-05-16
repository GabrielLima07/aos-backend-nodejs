// models/profile.js
const getProfileModel = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gamesPlayed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    friendsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Profile;
};

export default getProfileModel;
