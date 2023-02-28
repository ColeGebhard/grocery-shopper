const {
  createUser,
  createCategory,
  createProduct
} = require("./");
const client = require("./client");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS product_category;
      DROP TABLE IF EXISTS users;
  `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "fullName" VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "isActive" BOOLEAN default true,
      "isAdmin" BOOLEAN default false
  );

    CREATE TABLE product_category (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      "categoryId" INTEGER REFERENCES product_category ( id ),
      "creatorId" INT REFERENCES users ( id ),
      "isAvailible" BOOLEAN default true,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      photos BYTEA,
      quantity INT
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "productId" INT REFERENCES products ( id ),
      "userName" VARCHAR(255) REFERENCES users ( username ),
      "reviewRating" INTEGER
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" INT REFERENCES users ( id ),
      "productId" INT REFERENCES products ( id ),
      quantity INT,
      status SMALLINT
    );

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      "cartId" INT REFERENCES cart ( id ),
      "productId" INT REFERENCES products ( id ),
      quanity INT,
      price INT
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INT REFERENCES users ( id ),
      status VARCHAR(255),
      "createdAt" VARCHAR(255)  
    );

    CREATE TABLE order_items (
      id SERIAL PRIMARY KEY,
      "orderId" INT REFERENCES orders ( id ),
      "productId" INT REFERENCES products ( id ),
      quantity INT
    )
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log('Starting to create test users...');

  try {
    const usersToCreate = [
      {
        username: "wineGlass1",
        password: "rose1",
        fullName: "Test One",
        email: "email1@gmail.com"
      },
      {
        username: "wineGlass2",
        password: "rose2",
        fullName: "Test Two",
        email: "email2@gmail.com"
      },
      {
        username: "wineGlass3",
        password: "rose3",
        fullName: "Test Three",
        email: "email3@gmail.com"
      }
    ]

    const users = await Promise.all(
      usersToCreate.map((user) => createUser(user))
    )

    console.log('Users created:', users);
    console.log('Finished creating users!');
  } catch (e) {
    console.error("Error creating users");
    throw e;
  }
}

async function createInitialProductCatagories() {
  console.log('Starting to create test catagory...');
  try {
    const catagoryToCreate = [
      { name: 'Dairy' },
      { name: 'Veggies' },
      { name: 'Meat' },
      { name: 'Snacks' },
      { name: 'Fruit' }
    ]

    const catagory = await Promise.all(catagoryToCreate.map(createCategory))

    console.log('Catagories created:', catagory);
    console.log('Finished creating catagories!');
  } catch (e) {
    console.error("Error creating catagories");
    throw e;
  }
}

async function createInitialProducts() {
  console.log("starting to create products...")

  try {
  const productsToCreate = [
    {
      categoryId: 5,
      creatorId: 2,
      isAvailible: true,
      name: "Apple",
      description: "Taste of summer",
      price: 20,
      quantity: 4,
    },

  ]

  const products = await Promise.all(
    productsToCreate.map((product) => createProduct(product))
  )

  console.log("Products Created: ", products)
  console.log("Finished creating products.")
} catch (e) {
  console.error("Error creating users");
  throw e;
}
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers();
    await createInitialProductCatagories()
    await createInitialProducts()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}
