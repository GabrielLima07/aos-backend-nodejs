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
  
    return Match;
  };
  
  export default getMatchModel;
  