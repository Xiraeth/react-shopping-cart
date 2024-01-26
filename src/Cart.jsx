import Header from "./Header";
import { useCartContext } from "./CartContext";
import { v4 as uuidv4 } from "uuid";

function Cart() {
  const { cart, setCart } = useCartContext();

  const calcFinalPrice = (price, amount) => {
    const finalPrice = price * amount;
    return finalPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const removeItemFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item !== itemToRemove);
    setCart(updatedCart);
  };

  //TODO: MAKE THESE FUNCTIONAL
  const increaseItemInCart = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  const decreaseItemInCart = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.amount > 1
        ? { ...cartItem, amount: cartItem.amount - 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  return (
    <div>
      <Header />
      {cart.length === 0 ? (
        <div className="cartMessage">
          Add items to your cart and they will show up here!
        </div>
      ) : (
        <div>
          <section className="cartDivContainer">
            {cart.map((item) => {
              return (
                <div key={uuidv4()} className="cartItemPanel">
                  <img src={item.image} alt={item.description} />
                  <h3>{item.title}</h3>
                  <div className="cartItemQuantityContainer">
                    Qty: {item.amount}
                    <div>
                      <button onClick={() => increaseItemInCart(item)}>
                        +
                      </button>
                      <button onClick={() => decreaseItemInCart(item)}>
                        -
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>{calcFinalPrice(item.price, item.amount)}&euro;</div>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => removeItemFromCart(item)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="checkoutButtonsContainer">
            <button className="checkoutButton">Checkout</button>
            <button onClick={() => setCart([])} className="clearCartButton">
              Clear Cart
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Cart;
