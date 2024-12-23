// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */



// Used for applying migrations and seeds to production database
// Using npm script prod:seed and prod:migrate
if (process.env.NODE_ENV === "knexProd") {
  require("dotenv").config()
  console.log(process.env)
}
console.log("Running knex file")
console.log("process.env.CONN_STRING:", process.env.CONN_STRING)
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'anywhere-fitness',
      user: 'kclower',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'postgresql',
    connection: {
      database: 'testdb',
      user: 'kclower',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.CONN_STRING,
    // connection: {
    //   host: process.env.PGHOST,
    //   database: process.env.PGDATABASE,
    //   user: process.env.PGUSER,
    //   password: process.env.PGPASSWORD
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
