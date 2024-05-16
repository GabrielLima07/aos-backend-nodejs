const getMoveModel = (sequelize, DataTypes) => {

  const Move = sequelize.define('Move', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    matchId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    playerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    squarePosition: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  
  Move.associate = (models) => {
  
  };

  return Move;
};


export default getMoveModel;
