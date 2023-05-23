/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
*/
module.exports = (sequelize, DataTypes) => {
  const MealsIngredients = sequelize.define(
    'MealsIgredients',
    {
      idMeal: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'meals',
          key: 'id_meal',
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
      strIngredient16: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient17: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient18: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient19: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strIngredient20: {
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
      strMeasure16: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure17: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure18: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure19: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      strMeasure20: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'mealsIgredients',
      underscored: true,
    }
  )

  MealsIngredients.associate = (models) => {
    MealsIngredients.belongsTo(models.Meals, {
      foreignKey: { name: 'idMeal', field: 'id_meal' },
      as: 'igredientsTomeals',
    })
  }

  return MealsIngredients;
}