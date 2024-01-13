'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('BookBorrowers', [{
      borrower_id: 1,
      book_id: 1,
      from_date: "2024-10-1",
      to_date: "2024-11-1",
      retuerned_date: null,
      is_returned: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      borrower_id: 2,
      book_id: 1,
      from_date: "2024-01-1",
      to_date: "2024-02-1",
      retuerned_date: "2024-02-1",
      is_returned: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      borrower_id: 3,
      book_id: 2,
      from_date: "2024-05-1",
      to_date: "2024-07-1",
      retuerned_date: null,
      is_returned: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('BookBorrowers', null, {});
  }
};
