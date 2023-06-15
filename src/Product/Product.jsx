import React, { useState, useEffect } from 'react';



export const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleDelete = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const newProduct = {
        name,
        description,
        price,
        imageURL,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);

    setName('');
    setDescription('');
    setPrice('');
    setImageURL('');
  };



  return (
    <div>
      <h1>Product Page</h1>
      <h2>Create a New Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
            type="text"
            id="name"
            placeholder="Product Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
        />
        <br />
        <input
         min={0}
         max={Infinity}
          type="number"
          placeholder="Price"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value,)}
          required
        />
         <br />
        <input 
          type="text"
          placeholder="description"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value,)}
          required
        />
         <br />
        <input
          type="text"
          placeholder= "URL"
          id="imageURL"
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
          required
        />
        <br />
        <button type="submit">Add Product</button>
      </form>
      <ul >
        {products.map((product, index) => (
          <il className="product" key={index}>
            <img src={product.imageURL} alt={product.name} />
            <h3>{product.name}</h3>
            <h5>{product.description}</h5>
            <br/>
            {product.price}$
            <br/>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </il>
        ))}
       
      </ul>
    </div>
  );

 
  };


