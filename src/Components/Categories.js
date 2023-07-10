import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory, getAllProducts, deleteCategory } from "../api/helpers";
import { useNavigate } from "react-router";

const Categories = (props) => {
  const { categories, setCategories, products, setProducts, me } = props;

  const [name, setName] = useState("");
  const [photos, setPhotos] = useState("");

  const productsToCreate = [
    //dairy
    {
      id: 1,
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Milk",
      description: "Locally sourced milk from fantastic Scottish Highland Cows",
      photos: 'milk.jpg',
      price: 3,
      quantity: 5,
    },
    {
      id: 2,
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Cheese",
      description: "Locally made and churned by my grandmother",
      photos: "cheese.jpg",
      price: 2,
      quantity: 5,
    },
    {
      id: 3,
      categoryId: 1,
      creatorId: 1,
      isAvailible: true,
      name: "Cream",
      description: "An amazing addition to a fresh cup of coffee",
      photos: "cream.jpg",
      price: 4,
      quantity: 5,
    },
    //veggies
    {
      id: 4,
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
      id: 5,
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Cucumber",
      description: 'Fantastic for a summer greek salad.',
      price: 3,
      photos: "cucumber.jpg",
      quantity: 5,
    },
    {
      id: 6,
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Kale",
      description: "You hate it but it's healthy.",
      price: 5,
      photos: "kale.jpg",
      quantity: 5,
    },
    {
      id: 7,
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Peppers",
      description: 'A wide variety of colors to make plenty of dishes with.',
      price: 4,
      photos: "peppers.jpg",
      quantity: 5,
    },
    {
      id: 8,
      categoryId: 2,
      creatorId: 1,
      isAvailible: true,
      name: "Lettuce",
      description: 'A great base for tons of things, like salad.',
      price: 1,
      photos: "lettuce.jpg",
      quantity: 5,
    },
    //Meat
    {
      id: 9,
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Ground Beef",
      description: "Season it how you want, a great item to have around. *Price by lb",
      photos: 'beef.jpg',
      price: 6,
      quantity: 5,
    },
    {
      id: 10,
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Steak",
      description: "Step up your dinner with this fantastic cut of meat. *Price by lb",
      photos: 'steak.jpg',
      price: 13,
      quantity: 5,
    },
    {
      id: 11,
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Chicken",
      description: "Lean but full of flavour. *Price by lb",
      photos: 'chicken.jpg',
      price: 8,
      quantity: 5,
    },
    {
      id: 12,
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Tofu",
      description: "Availible for the healthy family member. *Price by lb",
      photos: 'tofu.jpg',
      price: 10,
      quantity: 5,
    },
    {
      id: 13,
      categoryId: 3,
      creatorId: 1,
      isAvailible: true,
      name: "Bacon",
      description: "Get some man meat. *Price by package",
      photos: 'bacon.jpg',
      price: 9,
      quantity: 5,
    },
    //snacks
    {
      id: 14,
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Chips",
      description: "Great for snacking",
      photos: 'chips.jpg',
      price: 3,
      quantity: 5,
    },
    {
      id: 15,
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Tortilla Chips",
      description: "Get your siesta on, great for salsa.",
      photos: 'tortillachips.jpg',
      price: 3,
      quantity: 5,
    },
    {
      id: 16,
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Fruit Snacks",
      description: "Easy to take on the go",
      photos: 'fruitsnacks.jpg',
      price: 4,
      quantity: 5,
    },
    {
      id: 17,
      categoryId: 4,
      creatorId: 1,
      isAvailible: true,
      name: "Cereal",
      description: "Corn flakes are good for the heart",
      photos: 'cereal.jpg',
      price: 5,
      quantity: 5,
    },
    //fruit
    {
      id: 18,
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
      id: 19,
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Mango",
      description: "Fresh from Mexico.",
      price: 1,
      photos: 'mango.jpg',
      quantity: 5,
    },
    {
      id: 20,
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
      id: 21,
      categoryId: 5,
      creatorId: 1,
      isAvailible: true,
      name: "Blueberries",
      description: "A delectable and tasty item for any fridge.",
      price: 1,
      photos: 'blueberry.jpg',
      quantity: 5,
    },
  ];
  
  // You can now use the `productsToCreate` array in your code as needed.
  
  const catagoryToCreate = [
    {
      id: 1,
      name: 'Dairy',
      photos:'dairy.jpg'
    },
    {
      id: 2,
      name: 'Veggies',
      photos:'veggies.jpg'
    },
    {
      id: 3,
      name: 'Meat',
      photos:'meat.jpg'

    },
    {
      id: 4,
      name: 'Snacks',
      photos:'snacks.jpg'
    },
    {
      id: 5,
      name: 'Fruit',
      photos:'fruit.jpg'
    },
  ]


  const navigate = useNavigate();


  console.log(me)

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((e) => {
        console.error('Failed to get category')
      });
  }, [setCategories])

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        console.log(products); // log the received products
        setProducts(products);
      })
      .catch((e) => {
        console.error('Failed to get products')
      });
  }, [setProducts])


  const catSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory({ name, photos });
      console.log(result);
      setCategories([...categories, result]);
      setName("");
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  console.log(categories)
  console.log(productsToCreate)


  const handleDelete = async (categoryId) => {
    try {
      const result = await deleteCategory(categoryId);
      // console.log(result)
      if (result === false) {
        window.alert('Successfully deleted');
        window.location.reload();
      } else {
        window.alert('Cannot delete category because it contains products')
      }
    } catch (e) {
      if (e.message === 'Cannot delete category because it contains products') {
        window.alert('Cannot delete category because it contains products');
      } else {
        console.error(e);
        // Handle other errors
      }
    }
  };



  return products ? (
    <>
      <div className="banner-container">
        <img className="banner" src={require(`../img/food-groups.png`)} alt="Placeholder" />
        <div className="banner-summary">
          <h1>Made For the Health of Our Community</h1>
          <p>Discover our local, organic grocery store!
            We offer fresh and healthy produce, meats,
            and pantry staples directly from local farms
            and artisans. Shop with us for nourishing
            foods that support local growers and promote
            a sustainable community.
          </p>
        </div>
      </div>
      {/* {me.username === "Admin" ?
        <form id="productForm" onSubmit={catSubmit}>
          <input
            type="text"
            placeholder="Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Make Category</button>
        </form> :
        null} */}
      <div className="mainProductPage">
        <span className="categoryCards">
          {catagoryToCreate.map((category) => {
            return (
              <div key={category.id} className="categoryLinks">
                <h2>
                  <button id="catergoryClick" onClick={() => { navigate(`category/${category.id}`) }}>{category.name}</button>
                </h2>
                {category.photos ? 
                  <img className="categoryImg"src={require(`../img/${category.photos}`)} alt={category.name} />
                : null}
                {/* {me.username === "Admin" ?
                  <button id="deleteCategoryButton" onClick={() => { handleDelete(category.id) }}>
                    Delete
                  </button> :
                  null
                } */}
              </div>

            )
          })}
        </span>
        <span className="productHeader">
          <h1 className="productHeader">All Products</h1>
          <span className="productCards">
            {Array.isArray(productsToCreate) && productsToCreate.length > 0 ?
              productsToCreate.map((product) => {
                return (
                  <button key={product.id}
                    onClick={() => { navigate(`category/product/${product.id}`) }}
                    className="productCard">

                    <div className="categoryImage">
                      {product.photos ? (
                        <img
                          src={product.photos.startsWith('http') || product.photos.startsWith('https') ? product.photos : require(`../img/${product.photos}`)}
                          alt={product.name}
                        />
                      ) : (
                        <img src={require(`../img/placeholder-image.png`)} alt="Placeholder" />
                      )}
                    </div>
                    <div>
                      <h2>{product.name}</h2>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </button>
                )
              }) : <p>No product found</p>}

          </span>
        </span>

      </div>
    </>
  ) : (
    <span className="loader">
      <span className="loader-inner">
      </span>
    </span>
  )

}

export default Categories;