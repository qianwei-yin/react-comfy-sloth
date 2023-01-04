import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';

const cart_reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const { id, color, amount, product } = action.payload;
			const tempItem = state.cart.find((i) => i.id === id + color);
			if (tempItem) {
				const cartItems = state.cart.map((item) => {
					if (item.id === id + color) {
						let newAmount = item.amount + amount;
						if (newAmount > item.max) {
							newAmount = item.max;
						}
						return { ...item, amount: newAmount };
					} else {
						return item;
					}
				});
				return { ...state, cart: cartItems };
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				};
				return { ...state, cart: [...state.cart, newItem] };
			}
		case REMOVE_CART_ITEM:
			return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
		case CLEAR_CART:
			return { ...state, cart: [] };
		case TOGGLE_CART_ITEM_AMOUNT:
			const { id: toggleId, value } = action.payload;
			const tempCart = state.cart.map((item) => {
				if (item.id === toggleId) {
					let newAmount = item.amount;
					newAmount += value === 'inc' ? 1 : -1;
					if (newAmount > item.max) {
						newAmount = item.max;
					}
					if (newAmount < 1) {
						newAmount = 1;
					}
					return { ...item, amount: newAmount };
				} else {
					return item;
				}
			});
			return { ...state, cart: tempCart };
		case COUNT_CART_TOTALS:
			const { total_items, total_amount } = state.cart.reduce(
				(total, item) => {
					total.total_items += item.amount;
					total.total_amount += item.amount * item.price;
					return total;
				},
				{ total_items: 0, total_amount: 0 }
			);
			return { ...state, total_items, total_amount };
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default cart_reducer;
