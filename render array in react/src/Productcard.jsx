import "./Productcard.css";
import { HeartPlus } from 'lucide-react'
import { Heart } from 'lucide-react'

export function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  iswishlisted,
  onAddtocart,
  onTogglewishlist
}) {
  return (
    <div className="product-card">
      {/* Discount Badge */}
      {/* {id} */}
      {discount && <span className="discount-badge">{discount}</span>}
      <button className={`wishlisted ${iswishlisted ? 'active' : ''}`}
        onClick={onTogglewishlist}
      >
        {iswishlisted ? <HeartPlus /> : <Heart />}

      </button>
      {/* Product Image */}
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      {/* Content */}
      <div className="card-content">
        <h3 className="product-name">{name}</h3>

        {/* Rating */}
        <div className="rating">
          <span className="stars">{"★".repeat(Math.floor(rating))}{'☆'.repeat(Math.ceil(5 - rating))}</span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestseller-tag">Best Seller</span>}
        </div>

        {/* Price */}
        <div className="price-row">
          <span className="price">₹ {price}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>

        {/* Button */}
        <button className="add-btn" onClick={onAddtocart} >Add to Cart</button>
      </div>
    </div>
  );
}