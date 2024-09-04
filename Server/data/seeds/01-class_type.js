/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('rf_class_type').delete()
  await knex('rf_class_type').insert([
    { class_type: 'Indoor Yoga' },
    { class_type: 'Outdoor Yoga' },
    { class_type: 'Indoor Crossfit' },
    { class_type: 'Outdoor Crossfit' },
    { class_type: 'Indoor Pilates' },
    { class_type: 'Outdoor Pilates' },
    { class_type: 'Power Lifting' },
    { class_type: 'Weight Training' },
  ]);
};
