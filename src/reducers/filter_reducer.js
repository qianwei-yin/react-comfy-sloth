import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			let maxPrice = action.payload.map((pro) => pro.price);
			maxPrice = Math.max(...maxPrice);
			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
				filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
			};
		case SET_GRIDVIEW:
			return { ...state, grid_view: true };
		case SET_LISTVIEW:
			return { ...state, grid_view: false };
		case UPDATE_SORT:
			return { ...state, sort: action.payload };
		case SORT_PRODUCTS:
			let tempProducts = [...state.filtered_products];
			if (state.sort === 'price-lowest') {
				tempProducts = tempProducts.sort((a, b) => a.price - b.price);
			} else if (state.sort === 'price-highest') {
				tempProducts = tempProducts.sort((a, b) => b.price - a.price);
			} else if (state.sort === 'name-a') {
				tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
			} else if (state.sort === 'name-z') {
				tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
			}
			return { ...state, filtered_products: tempProducts };
		case UPDATE_FILTERS:
			const { name, value } = action.payload;
			return { ...state, filters: { ...state.filters, [name]: value } };
		case FILTER_PRODUCTS:
			const { all_products } = state;
			const { text, company, category, color, price, shipping } = state.filters;

			let newProducts = [...all_products];
			console.log(newProducts);

			if (text) {
				newProducts = newProducts.filter((pro) => pro.name.toLowerCase().includes(text));
			}
			if (category !== 'all') {
				newProducts = newProducts.filter((pro) => pro.category === category);
			}
			if (company !== 'all') {
				newProducts = newProducts.filter((pro) => pro.company === company);
			}
			if (color !== 'all') {
				newProducts = newProducts.filter((pro) => pro.colors.includes(color));
			}
			newProducts = newProducts.filter((pro) => pro.price <= price);
			if (shipping) {
				newProducts = newProducts.filter((pro) => pro.shipping === true);
			}

			return { ...state, filtered_products: newProducts };
		case CLEAR_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					text: '',
					company: 'all',
					category: 'all',
					color: 'all',
					price: state.filters.max_price,
					shipping: false,
				},
			};
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
