import {  FaShoppingCart} from "react-icons/fa"
export default function My_Cart(){

    return(
        <>
                  <div className="accMenuItem">
                    <div className="accCartWrapper">
                      <FaShoppingCart className="accIcon" />
                      <span className="accCartBadge">0</span>
                    </div>
                    <p>My Cart</p>
                  </div>
        
        </>
    )
}