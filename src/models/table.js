const getTableModel = (sequelize,{DataTypes}) =>{
     const Table = sequelize.define('Table', {
          id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          match_id: {
            type: DataTypes.UUID,
            allowNull: false
          },
          square_position: {
            type: DataTypes.STRING,
            allowNull: false
          },
          square_value: {
            type: DataTypes.STRING,
            allowNull: false
          }
        });
        
        Table.associate = (models) => {
          Table.belongsTo(models.Match, { foreignKey: 'match_id', onDelete: "CASCADE" });
        };
        
      return Table;
}
export default getTableModel;


