const {
  createUser,
  createCategory,
  createProduct,
  createReview,
  createCarts,
  createCartItems,
  createOrders,
  createOrderItems
} = require("./");
const client = require("./client");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS carts;
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
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
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
      "userId" INT REFERENCES users ( id ),
      "reviewRating" INTEGER,
      description VARCHAR(255) 
    );

    CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      "userId" INT REFERENCES users ( id ),
      status SMALLINT
    );

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      "cartId" INT REFERENCES carts ( id ),
      "productId" INT REFERENCES products ( id ),
      quantity INT,
      price INT,
      "isActive" BOOLEAN default true
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      "userId" INT REFERENCES users ( id ),
      status VARCHAR(255)
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
        firstName: "Test One",
        lastName: "Testing",
        email: "email1@gmail.com"
      },
      {
        username: "wineGlass2",
        password: "rose2",
        firstName: "Test One",
        lastName: "Testing",
        email: "email2@gmail.com"
      },
      {
        username: "wineGlass3",
        password: "rose3",
        firstName: "Test One",
        lastName: "Testing",
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
    {
      categoryId: 2,
      creatorId: 2,
      isAvailible: true,
      name: "Broccolli",
      description: "Taste of summer",
      price: 25,
      quantity: 10,
    },
    {
      categoryId: 1,
      creatorId: 2,
      isAvailible: true,
      name: "Milk",
      description: "Freshest of cows",
      price: 50,
      quantity: 2,
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

async function createInitialReviews() {
  console.log('Starting to create test reviews...');
  try {
    const reviewsToCreate = [
      { 
        productId: 3,
        userId: 1,
        reviewRating: 4,
        description: "Kinda moldy"
      },
      { 
        productId: 2,
        userId: 1,
        reviewRating: 1,
        description: "Horrendus"
      },
      { 
        productId: 1,
        userId: 1,
        reviewRating: 5,
        description: "Kinda amazing"
      },
    ]

    const review = await Promise.all(reviewsToCreate.map(createReview))

    console.log('Reviews created:', review);
    console.log('Finished creating reviews!');
  } catch (e) {
    console.error("Error creating reviews");
    throw e;
  }
}

async function createInitialCarts() {
  console.log('Starting to create test cart...');
  try {
    const cartsToCreate = [
      { 
        userId: 2,
        status: 2,
      }
    ]

    console.log(createCarts)

    const cart = await Promise.all(cartsToCreate.map(createCarts))

    console.log('Carts created:', cart);
    console.log('Finished creating cart!');
  } catch (e) {
    console.error("Error creating cart");
    throw e;
  }
}

async function createInitialCartItems() {
  console.log('Starting to create test cart items...');
  try {
    const cartItemsToCreate = [
      { 
        cartId: 1,
        productId: 2,
        quantity: 3,
        price: 40,
        isActive: true
      }
    ]

    console.log(createCartItems)

    const cartItems = await Promise.all(cartItemsToCreate.map(createCartItems))

    console.log('Carts created:', cartItems);
    console.log('Finished creating cart items!');
  } catch (e) {
    console.error("Error creating cart");
    throw e;
  }
}

async function createInitialOrders() {
  console.log('Starting to create test orders...');
  try {
    const ordersToCreate = [
      { 
        userId: 2,
        status: 2,
      }
    ]

    console.log(createOrders)

    const order = await Promise.all(ordersToCreate.map(createOrders))

    console.log('Orders created:', order);
    console.log('Finished creating order!');
  } catch (e) {
    console.error("Error creating order");
    throw e;
  }
}

async function createInitialOrderItems() {
  console.log('Starting to create test order items...');
  try {
    const orderItemsToCreate = [
      { 
        orderId: 1,
        productId: 2,
        quantity: 3
      }
    ]

    console.log(createOrderItems)

    const orderItems = await Promise.all(orderItemsToCreate.map(createOrderItems))

    console.log('Order items created:', orderItems);
    console.log('Finished creating order items!');
  } catch (e) {
    console.error("Error creating order items");
    throw e;
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers();
    await createInitialProductCatagories();
    await createInitialProducts();
    await createInitialReviews();
    await createInitialCarts();
    await createInitialCartItems();
    await createInitialOrders();
    await createInitialOrderItems();
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
