import { useEffect, useState } from "react";
import { restaurantList } from "../constant";
import RestaurantCard from "./RestaurantCard";

function filterRestaurant (searchText, restaurants){
  return restaurants?.filter((restaurant) => {
    restaurant.data.name.includes(searchText)
  })
}

const Body = () => {
  const [restaurants, setRestaurants] = useState(restaurantList)
  const [searchInput, setSearchInput] = useState('')

  // useEffect(() => {
  //   getRestaurants()
  // }, [])

  // const getRestaurants = async() => {
  //   fetch()
  // }

  return (
    <>
      <div className="search-container">
        <input 
          type="text" 
          className="serach-input" 
          placeholder="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-btn" onClick={() => {
          const restaurants = filterRestaurant

        }}>Search</button>
      </div>
      <div className="restaurant-list">
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} {...restaurant.data} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
