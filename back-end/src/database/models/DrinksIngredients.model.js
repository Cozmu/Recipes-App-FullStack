/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
*/
module.exports = (sequelize, DataTypes) => {
  const DrinksIngredients = sequelize.define(
    'DrinksIngredients',
    {
      idDrink: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'drinks',
          key: 'id_drink',
        },
      },
      strIngredient1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient3: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient4: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient5: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient6: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient7: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient8: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient9: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient10: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient11: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient12: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient13: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient14: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient15: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure3: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure4: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure5: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure6: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure7: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure8: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure9: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure10: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure11: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure12: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure13: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure14: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure15: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'drinksIngredients',
      underscored: true,
    }
  )

  DrinksIngredients.associate = (models) => {
    DrinksIngredients.belongsTo(models.Drinks, {
      foreignKey: { name: 'idDrink', field: 'id_drink' },
      as: 'ingredientsToDrinks',
    })
  }

  return DrinksIngredients;
}