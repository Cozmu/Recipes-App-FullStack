/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  const Drinks = sequelize.define(
    'Drinks',
    {
      idDrink: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      strDrink: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strAlcoholic: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strCategory: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strArea: {
        allowNull: true, 
        type: DataTypes.STRING,
      },
      strInstructions: {
        allowNull: false, 
        type: DataTypes.TEXT,
      },
      strDrinkThumb: {
        allowNull: false, 
        type: DataTypes.STRING,
      },
      strTags: {
        allowNull: true, 
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'drinks',
      underscored: true,
    },
  );

  Drinks.associate = (models) => {
    Drinks.hasOne(models.DrinksIngredients, {
      foreignKey: { name: 'idDrink', field: 'id_drink' },
      as: 'drinksToIngredients',
    })
  }

  return Drinks;
}