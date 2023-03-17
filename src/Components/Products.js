import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, createProducts, getAllCategories } from "../api/helpers";

const Products = (props) => {
    const { products, setProducts, categories, setCategories } = props;

    const [categoryList, setCategoryList] = useState('any');
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [price, setPrice] = useState();
    const [quanity, setQuanity] = useState();
    const [photos, setPhotos] = useState("");
    const [categoryId, setCategoryId] = useState();

    // console.log(photos)



    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setProducts(products);
            })
            .catch((e) => {
                console.error('Failed to get products')
            });
    }, [setProducts])

    useEffect(() => {
        getAllCategories()
            .then((categories) => {
                setCategories(categories);
            })
            .catch((e) => {
                console.error('Failed to get category')
            });
    }, [setCategories])

    console.log(categories)

    const productSubmit = async (e) => {
        e.preventDefault();

        if (!categoryList || categoryList === 'any') {
            window.alert('Please select a category');
            return;
        }

        const filteredCategory = categories.find(category => category.name === categoryList);
        if (!filteredCategory) {
            window.alert('Invalid category');
            return;
        }

        setCategoryId(filteredCategory.id);

        try {
            const result = await createProducts({
                categoryId,
                name,
                description,
                price,
                photos,
                quanity,
            });
            console.log(result)
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }


    const { categoryName } = useParams();

    const filteredProducts = products.filter(product => product.categoryName === categoryName)
    return (
        <>
            <form id="productForm" onSubmit={productSubmit}>

                <select name="categoryDrop" id="categoryDrop"
                    value={categoryList}
                    onChange={(e) => {
                        setCategoryList(e.target.value)
                    }}
                >
                    <option value="any">Select A Category</option>
                    {categories.map((category) =>
                        <option value={category.name} key={category.name}>{category.name}</option>
                    )};
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
                    value={quanity}
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

            <h1>{categoryName}</h1>
            {filteredProducts.map((product) => {

                return (
                    <a href={`product/${product.id}`} className="productCard">
                        <div>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                        <div className="categoryImage">
                            {product.photos && <img src={product.photos.startsWith('http') || product.photos.startsWith('https') ? product.photos : require(`../img/${product.photos}`)} alt={product.name} />}
                        </div>
                    </a>
                )
            })}
        </>
    )

}

export default Products;