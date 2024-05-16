const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    points: {
      type: DataTypes.INTEGER
    },
    profile_pic: {
      type: DataTypes.STRING,
      isUrl: true
    }
  });

  /* User.associate = (models) => {
    User.hasMany(models.User_match_history, { onDelete: "CASCADE" });
    User.hasMany(models.Match, { onDelete: "CASCADE"});
  }; */

  User.findByEmail = async (email) => {
    let user = await User.findOne({
      where: { email: email },
    });

    return user;
  };

  return User;
};

export default getUserModel;