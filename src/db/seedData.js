const {
  createUser,
  createCategory,
  createProduct,
  createReview,
  createCarts,
  createCartItems,
  createOrders,
  createOrderItems,
  getAllProductsWithCategoryId
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
      "isAdmin" BOOLEAN default false,
      "isActive" BOOLEAN default true
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
      photos VARCHAR(255),
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
      "isActive" BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      "cartId" INT REFERENCES carts ( id ),
      "productId" INT REFERENCES products ( id ),
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      photos VARCHAR(255),
      quantity INT,
      UNIQUE("cartId", "productId")
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
        username: "Admin",
        password: "Secret123",
        firstName: "Admin",
        lastName: "Test",
        email: "admin@gmail.com",
        isAdmin: true
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
      { id:1, name: 'Dairy' },
      { id:2, name: 'Veggies' },
      { id:3, name: 'Meat' },
      { id:4, name: 'Snacks' },
      { id:5, name: 'Fruit' }
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
    //fruit
    {
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Apple",
      description: "Plucked from the orchards down the road.",
      price: 1,
      photos: 'apple.jpg',
      quantity: 5,
    },
    {
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Mango",
      description: "Fresh from mexico.",
      price: 1,
      photos: 'mango.jpg',
      quantity: 5,
    },
    {
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Banana",
      description: "Certain to make your pet monkey jealous.",
      price: 3,
      photos: 'bananan.jpg',
      quantity: 5,
    },
    {
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Blueberries",
      description: "A delectable and tasty item for any fridge.",
      price: 1,
      photos: 'blueberry.jpg',
      quantity: 5,
    },
    //veggies
    {
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Broccolli",
      description: 'Earthy and green.',
      price: 2,
      photos: "broccolli.jpg",
      quantity: 5,
    },
    {
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Cucumber",
      description: 'Fantastic for a summer greek salad.',
      price: 2,
      photos: "cucumber.jpg",
      quantity: 5,
    },
    {
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Kale",
      description: "You hate it but it's healthy.",
      price: 2,
      photos: "kale.jpg",
      quantity: 5,
    },
    {
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Peppers",
      description: 'A wide variety of colors to make plenty of dishes with.',
      price: 2,
      photos: "peppers.jpg",
      quantity: 5,
    },
    {
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Lettuce",
      description: 'A great base for tons of things, like salad.',
      price: 2,
      photos: "lettuce.jpg",
      quantity: 5,
    },
    //dairy
    {
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Milk",
      description: "Locally sourced milk from fantastic Scottish Highland Cows",
      photos: 'milk.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Cheese",
      description: "Locally made and churned by my grandmother",
      photos:"https://www.pngfind.com/pngs/m/55-551675_cheese-transparent-background-cheese-png-png-download.png",
      price: 499,
      quantity: 5,
    },
    {
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Cream",
      description: "An amazing addition to a fresh cup of coffee",
      photos:"https://www.pngitem.com/pimgs/m/323-3234497_whip-cream-png-transparent-png.png",
      price: 499,
      quantity: 5,
    },
    //snakcs
    {
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Chips",
      description: "Great for snacking",
      photos: 'chips.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Tortilla Chips",
      description: "Get your sieste on, great for salsa.",
      photos: 'tortillachips.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Fruit Snacks",
      description: "Easy to take on the go",
      photos: 'fruitsnacks.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Cereal",
      description: "Corn flakes are good for the heart",
      photos: 'cereal.jpg',
      price: 367,
      quantity: 5,
    },
    //Meat
    {
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Ground Beef",
      description: "Season it how you want, a great item to have around.*Price by lb",
      photos: 'beef.jpg',
      price: 6,
      quantity: 5,
    },
    {
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Steak",
      description: "Step up your dinner with this fantastic cut of meat.",
      photos: 'steak.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Chicken",
      description: "Lean but full of flavour.",
      photos: 'chicken.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Tofu",
      description: "Availible for the healthy family member.",
      photos: 'tofu.jpg',
      price: 367,
      quantity: 5,
    },
    {
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Bacon",
      description: "Get some man meat",
      photos: 'bacon.jpg',
      price: 367,
      quantity: 5,
    },

  ]

  const products = await Promise.all(
    productsToCreate.map((product) => createProduct(product))
  )

  console.log("Products Created: ", products)
  console.log("Finished creating products.")
} catch (e) {
  console.error("Error creating products");
  throw e;
}
}

async function filterByCategory() {
  const filteredProduct = await getAllProductsWithCategoryId(1)

  console.log(filteredProduct)
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
        userId: 1,
        status: 2,
      },
      { 
        userId: 2,
        status: 0,
      }, 
      { 
        userId: 3,
        status: 1,
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
      },
      { 
        cartId: 2,
        productId: 4,
        quantity: 4,
        price: 20,
        isActive: true
      },
      { 
        cartId: 3,
        productId: 1,
        quantity: 3,
        price: 25,
        isActive: true
      },     
      { 
        cartId: 3,
        productId: 2,
        quantity: 2,
        price: 10,
        isActive: true
      }
    ]

    console.log(createCartItems)

    const cartItems = await Promise.all(cartItemsToCreate.map(createCartItems))

    console.log('Cart Items created:', cartItems);
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
    await filterByCategory();
    // await createInitialReviews();
    // await createInitialCarts();
    // await createInitialCartItems();
    // await createInitialOrders();
    // await createInitialOrderItems();
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
