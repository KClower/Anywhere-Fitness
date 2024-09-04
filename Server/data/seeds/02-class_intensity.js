/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('rf_class_intensity').delete()
  await knex('rf_class_intensity').insert([
    { intensity: "High" },
    { intensity: "Medium" },
    { intensity: "Low" },
  ]);
};
