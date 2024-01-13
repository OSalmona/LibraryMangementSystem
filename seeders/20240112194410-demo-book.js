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

    await queryInterface.bulkInsert('Books', [{
      title: 'Surrounded by Idiots',
      isbn: '978-1-60309-492-4',
      author: "krisson jacsson",
      quantity: 15,
      shelf_location: "R2-C8",
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      title: '1919 novel',
      isbn: '978-0-9767736-6-5',
      author: "ahmed morad",
      quantity: 15,
      shelf_location: "R2-C6",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Animal Stories',
      isbn: '978-1-60309-502-0',
      author: "Osama Fawzy",
      quantity: 30,
      shelf_location: "R4-C5",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
      await queryInterface.bulkDelete('Books', null, {});
     
  }
};
