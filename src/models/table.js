import { table } from "console";


const getTableModel = (sequelize,{DataTypes}) =>{
     const Table = sequelize.define('Table', {
          id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
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
        }, {
          // Outras opções do modelo aqui, como nome da tabela, timestamps, etc.
        });
        
        Table.associate = (models) => {
          models.Match.belongsTo(Table, { foreignKey: 'match_id', onDelete: "CASCADE" });
        };
        
           return Table;
}
export default getTableModel;


