'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookBorrower.belongsTo(models.Book, { foreignKey: 'book_id' });
      BookBorrower.belongsTo(models.Borrower, { foreignKey: 'borrower_id' });
    }
  }
  BookBorrower.init({
    id : {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    borrower_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    from_date: DataTypes.DATEONLY,
    to_date: DataTypes.DATEONLY,
    retuerned_date: DataTypes.DATEONLY,
    is_returned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BookBorrower',
  });
  return BookBorrower;
};