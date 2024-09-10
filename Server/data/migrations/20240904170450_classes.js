/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Check if the extension is already installed
    const extensionExists = await knex.schema.raw(`
    SELECT EXISTS(
      SELECT 1 
      FROM pg_extension 
      WHERE extname = 'uuid-ossp'
    )
  `);

    // If not installed, install the extension
    if (!extensionExists.rows[0].exists) {
        await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    }
    return knex.schema
        .createTable('users', tbl => {

            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.string('email')
                .unique()
                .notNullable();
            tbl.string('password')
                .notNullable();
            tbl.boolean('isInstructor')
                .notNullable();
        })
        .createTable('rf_class_type', tbl => {
            tbl.increments("id");
            tbl.string('class_type')
                .notNullable();
        })
        .createTable('rf_class_intensity', tbl => {
            tbl.increments("id");
            tbl.string('intensity')
                .notNullable();
        })
        .createTable('instructor_classes', tbl => {
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.uuid('instructor_id')
                .notNullable()
                .references('id')
                .inTable('users');
            tbl.integer('class_type_id')
                .notNullable()
                .references('id')
                .inTable('rf_class_type');
            tbl.integer('intensity_id')
                .notNullable()
                .references('id')
                .inTable('rf_class_intensity');
            tbl.string('class_name')
                .notNullable();
            tbl.timestamp('start_time')
                .notNullable();
            tbl.integer('duration')
                .notNullable();
            tbl.string('location')
                .notNullable();
            tbl.integer('class_size')
                .notNullable();
            tbl.integer('class_capacity')
                .notNullable();
        })
        .createTable('client_classes', tbl => {
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.uuid('client_id')
                .notNullable()
                .references('id')
                .inTable('users');
            tbl.uuid('class_id')
                .notNullable()
                .references('id')
                .inTable('instructor_classes');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('client_classes')
        .dropTableIfExists('instructor_classes')
        .dropTableIfExists('rf_class_intensity')
        .dropTableIfExists('rf_class_type')
        .dropTableIfExists('users');
};
