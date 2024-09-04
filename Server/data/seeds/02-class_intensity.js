/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('class-intensity').truncate()
  await knex('class_intensity').insert([
    { name: "High" },
    { name: "Medium" },
    { name: "Low" },
  ]);
};
