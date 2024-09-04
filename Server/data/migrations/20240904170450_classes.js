/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
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
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.string('class_type')
                .notNullable();
        })
        .createTable('rf_class_intensity', tbl => {
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.string('intensity')
                .notNullable();
        })
        .createTable('instructor_classes', tbl => {
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.integer('instructor_id')
                .uuid()
                .notNullable()
                .references('id')
                .inTable('users');
            tbl.integer('class_type_id')
                .uuid()
                .notNullable()
                .references('id')
                .inTable('rf_class_type');
            tbl.integer('intensity_id')
                .uuid()
                .notNullable()
                .references('id')
                .inTable('rf_class_intensity');
            tbl.string('class_name')
                .notNullable();
            tbl.timestamp('start_time')
                .notNullable();
            tbl.bigint('duration')
                .notNullable();
            tbl.string('location')
                .notNullable();
            tbl.bigint('class_size')
                .notNullable();
            tbl.bigint('class_capacity')
                .notNullable();
        })
        .createTable('client_classes', tbl => {
            tbl.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
            tbl.integer('client_id')
                .uuid()
                .notNullable()
                .references('id')
                .inTable('users');
            tbl.integer('class_id')
                .uuid()
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
