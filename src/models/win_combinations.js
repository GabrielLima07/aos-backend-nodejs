const getWinCombinations = (sequelize, { DataTypes }) => {
   
    const Win = sequelize.define('Win', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          line_type: {
            type: DataTypes.STRING,
            allowNull: false
          },
          squares_positions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
          },
        combination: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
          }
        });

return Win
    }
    

export default getWinCombinations;