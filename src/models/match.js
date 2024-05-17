const getMatchModel = (sequelize, { DataTypes }) => {
    const Match = sequelize.define("match", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      player_x_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      player_o_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Match.associate = (models) => {
      Match.belongsTo(models.User, { as: 'player_x', foreignKey: 'player_x_id' });
      Match.belongsTo(models.User, { as: 'player_o', foreignKey: 'player_o_id' });
      Match.hasMany(models.Table, { foreignKey: 'match_id', onDelete: "CASCADE" });
      Match.hasMany(models.Move, { foreignKey: 'matchId', onDelete: "CASCADE" });
      Match.hasMany(models.Line, { foreignKey: 'match_id', onDelete: "CASCADE" });
    }
  
    return Match;
  };
  
  export default getMatchModel;
  