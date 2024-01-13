'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookBorrowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrower_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Borrowers',
          key: 'id'
        }
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'id'
        }
      },
      from_date: {
        type: Sequelize.DATEONLY
      },
      to_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      retuerned_date: {
        type: Sequelize.DATEONLY
      },
      is_returned: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookBorrowers');
  }
};
// npx sequelize-cli model:generate --name BookBorrower --attributes borrower_id:integer,book_id:integer,from_date:dateonly,to_date:dateoy,to_date:dateonly,retuerned_date:dateonly,is_returned:boolean