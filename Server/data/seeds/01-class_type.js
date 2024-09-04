/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('class_type').truncate()
  await knex('class_type').insert([
    { name: 'Indoor Yoga' },
    { name: 'Outdoor Yoga' },
    { name: 'Indoor Crossfit' },
    { name: 'Outdoor Crossfit' },
    { name: 'Indoor Pilates' },
    { name: 'Outdoor Pilates' },
    { name: 'Power Lifting' },
    { name: 'Weight Training' },
  ]);
};
