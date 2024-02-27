import {IMG_CDN_URL} from '../../constant'

const RestaurantCard = ({
    cloudinaryImageId,
    name,
    cuisines,
    area,
    lastMileTravelString,
    costForTwoString,
    avgRating,
  }) => {
    console.log(cloudinaryImageId,
      name,
      cuisines,
      area,
      lastMileTravelString,
      costForTwoString,
      avgRating,)
    return (
      <div className="card">
        <img
          src={
            IMG_CDN_URL +
            cloudinaryImageId
          }
        />
        <h2>{name}</h2>
        <h3>{cuisines?.join(", ")}</h3>
        <h4>{area} stars</h4>
      </div>
    );
  };

export default RestaurantCard