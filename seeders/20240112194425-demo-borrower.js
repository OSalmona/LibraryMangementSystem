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
    await queryInterface.bulkInsert('Borrowers', [{
      SSN: 25632148957426, 
      name: 'Osama Fawzy',
      email: 'O.Salmona16@gmail.com',
      registered_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      SSN: 26958745215698, 
      name: 'Ahmed Fawzy',
      email: 'Ahmed_FAwzy@yahoo.com',
      registered_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      SSN: 24569854123657,
      name: 'Ayman Fawzy',
      email: 'Aymooon@gmail.com',
      registered_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete('Borrowers', null, {});
     
  }
};
