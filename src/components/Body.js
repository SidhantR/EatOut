import { useEffect, useState } from "react";
import { restaurantList, swiggy_api_URL } from "../../constant";
import RestaurantCard from "./RestaurantCard";

function filterData(searchText, restaurants) {
  return restaurants?.filter((restaurant) => {
    return restaurant.info.name.includes(searchText);
  });
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState(restaurantList);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      async function checkDataJson(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const data = await checkDataJson(json);
      setAllRestaurants(data);
      setFilteredRestaurant(data);
    } catch (error) {
      console.log(error, "error");
    }
  }

  const searchData = async (searchInput, restaurants) => {
    if (searchInput !== "") {
      const filteredData = await filterData(searchInput, restaurants);
      console.log(filteredData, 'filteredData')
      setFilteredRestaurant(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No Restaurant Found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurant(restaurants);
    }
  };

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
        <button
          className="search-btn"
          onClick={() => searchData(searchInput, allRestaurants)}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurant?.map((restaurant) => {
          console.log(restaurant, 'restaurant')
          return (
            <RestaurantCard key={restaurant?.info?.id} {...restaurant.info} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
