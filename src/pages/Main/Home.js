import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrnads } from "../../app/features/filters/filterSlice";
import { getProducts } from "../../app/features/products/productsSlice";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter)
  const { brands, stock } = filter
  const { products } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const activeClass = "text-white bg-indigo-500 border-white";

  let content;

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  if (products.length && (stock || brands.length)) {
    content =
      products
        .filter(product => {
          if (stock) {
            return product.status === true
          }
          return products;
        })
        .filter(product => {
          if (brands.length) {
            return brands.includes(product.brand)
          }
          return products;
        })
        .map((product) => (
          <ProductCard key={product.model} product={product} />
        ))
  };

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrnads("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null}`}>
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrnads("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null}`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {
          content
        }
      </div>
    </div>
  );
};

export default Home;
