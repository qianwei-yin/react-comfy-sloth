import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { Home, About, Cart, Checkout, Error, Products, SingleProduct, PrivateRoute, AuthWrapper } from './pages';

function App() {
	return (
		<AuthWrapper>
			<BrowserRouter>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="products" element={<Products />} />
					<Route path="products/:id" element={<SingleProduct />} />
					<Route path="cart" element={<Cart />} />
					{/* <Route path="checkout" element={<Checkout />} /> */}
					<Route
						path="checkout"
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</AuthWrapper>
	);
}

export default App;
