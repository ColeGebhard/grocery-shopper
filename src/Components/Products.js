import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllProducts, createProducts, getAllCategories, deleteProduct, getSingleCategory } from "../api/helpers";

const Products = (props) => {
    const { products, setProducts, categories, setCategories, me } = props;

    const [categoryList, setCategoryList] = useState('any');
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [price, setPrice] = useState();
    const [quantity, setQuanity] = useState(5);
    const [photos, setPhotos] = useState("");
    const [categoryId, setCategoryId] = useState();

    // console.log(photos)

    const navigate = useNavigate()

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
                setProducts(products);
            })
            .catch((e) => {
                console.error('Failed to get products')
            });
    }, [setProducts])


    console.log(categories)

    const handleChange = (e) => {
        setCategoryList(e.target.value);
        const filteredCategory = categories.find(category => category.name === e.target.value);
        if (filteredCategory) {
            setCategoryId(filteredCategory.id);
        }
    };


    const productSubmit = async (e) => {
        e.preventDefault();

        if(!price){
            window.alert('Please set a price')
        }

        console.log(quantity)
        try {
            const result = await createProducts({
                categoryId,
                name,
                description,
                price,
                photos,
                quantity
            });

            console.log(quantity)
            if (result.error === 'error: duplicate key value violates unique constraint "products_name_key"') {
                window.alert(`${name} already exists`)
            }

            if (result.id) {
                window.alert(`Succesfully made product with ${result.name}`)
                window.location.reload()
            }
            return result
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const handleDelete = async (productId) => {
        try {
            const result = await deleteProduct(productId);

            if (result === false) {
                window.alert('Successfully deleted');
                window.location.reload();
              } else {
                window.alert('Cannot delete product as it is in cart')
              }

            return result
        } catch (e) {
            console.error(e);
            // Handle error
        }
    };

    console.log(me)

    const {categoryName} = useParams();
    console.log(categoryName)


    console.log(products)

    // const filteredCat = async (categoryName) => {
    //     try {
    //         const category = await getSingleCategory(categoryName);
    //         console.log(categoryName)

    //         return category
    //     } catch(error) {
    //         console.error(error)
    //     }
    // }

    
    const filteredProducts = Array.isArray(products) && products.length > 0 ? products.filter(product => product.categoryId == categoryName) : [];
    // const filteredProducts = products
    console.log(filteredProducts)
    return (
        <>
            {me.username === "Admin" ?
                <form id="productForm" onSubmit={productSubmit}>

                    <select name="category" id="category" value={categoryList} onChange={handleChange}>
                        <option value="any">--Select Category--</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDesciption(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Quanity"
                        value={quantity}
                        onChange={(e) => setQuanity(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="imageURL"
                        accept="image/*"
                        value={photos}
                        onChange={(e) => setPhotos(e.target.value)}

                    />
                    <button type="submit">Make a Product</button>
                </form>
                : null}

            {/* <h1 className="productHeader">{categoryName}</h1> */}

            <div className="productNav">
                <a href="/">All Products |</a>
                <p></p>
            </div>
            <span className="productCards">
                {filteredProducts.map((product) => {

                    return (
                        <div className="productCard">
                            <button key={product.id}
                                onClick={() => { navigate(`/category/product/${product.id}`) }}
                                >
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
                            {me.username === "Admin" ?
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(product.id);
                                }}>Delete</button> :
                                null}
                        </div>
                    )
                })}
            </span>
        </>
    )

}

export default Products;