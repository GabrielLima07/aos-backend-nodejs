const getLineModel = (sequelize, { DataTypes }) => {
    const Line = sequelize.define("line", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      match_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      line_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      squares_positions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
      }
    });

    Line.associate = (models) => {
      Line.belongsTo(models.Match, { foreignKey: 'match_id', onDelete: "CASCADE" });
    };
  
    Line.findByType = async (lineType) => {
        let lines = await Line.findAll({
          where: { line_type: lineType }
        });
      
        return lines;
      };
      
  
    return Line;
  };
  
  export default getLineModel;
  