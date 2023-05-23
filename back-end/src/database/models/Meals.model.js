/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define(
    'Meals',
    {
      idMeal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      strMeal: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strCategory: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strArea: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strInstructions: {
        allowNull: false, 
        type: DataTypes.TEXT,
      },
      strMealThumb: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strTags: {
        allowNull: true, 
        type: DataTypes.STRING,
      },
      strYoutube: {
        allowNull: false, 
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
      tableName: 'meals',
      underscored: true,
    }
  )

  Meals.associate = (models) => {
    Meals.hasOne(models.MealsIngredients, {
      foreignKey: { name: 'idMeal', field: 'id_meal' },
      as: 'mealsToIngredients',
    })
  }

  return Meals;
}