const getLineModel = (sequelize, { DataTypes }) => {
    const Line = sequelize.define("line", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Definindo um valor padrão usando UUID
      },
      match_id: {
        type: DataTypes.STRING, // Alterado para STRING
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
        defaultValue: [] // Definindo um valor padrão de uma lista vazia
      }
    });
  
    Line.findByType = async (lineType) => {
        let lines = await Line.findAll({
          where: { line_type: lineType }
        });
      
        return lines;
      };
      
  
    return Line;
  };
  
  export default getLineModel;
  