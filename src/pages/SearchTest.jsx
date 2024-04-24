import { useState, useEffect, useRef } from "react";
import ProductList from "../features/search/ProductList";
import SearchInput from "../features/search/SearchInput";

const AutocompleteSearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setSelectedProductIndex(-1);
    setSearchResults(
      products.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === "Enter") {
      if (selectedProductIndex !== -1) {
        const selectedProduct = searchResults[selectedProductIndex];
        alert(`You selected ${selectedProduct.title}`);
        setQuery("");
        setSelectedProductIndex(-1);
        setSearchResults([]);
      }
    }
  };

  const handleProductClick = (product) => {
    alert(`You selected ${product.title}`);
    setQuery("");
    setSelectedProductIndex(-1);
  };

  const scrollActiveProductIntoView = (index) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex);
    }
  }, [selectedProductIndex]);

  return (
    <div className="flex flex-col mt-20 ring-2">
      <SearchInput
        className={`transform transition-all duration-300 ease-in-out ${
          query !== "" && searchResults.length > 0 ? "w-full" : "w-12"
        }`}
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        placeholder="Search products"
      />

      {query !== "" && searchResults.length > 0 && (
        <ProductList
          className={`transition-all duration-200 ease-in-out ${
            query !== "" && searchResults.length > 0 ? "w-full" : ""
          }`}
          products={searchResults}
          selectedProductIndex={selectedProductIndex}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default AutocompleteSearchBar;
