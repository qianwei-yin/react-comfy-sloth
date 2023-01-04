/* 
Why do we set up this file ?
Because when isAuthenticated got true, the user info comes later.
So even when the user logs in, he/she wants to go to the checkout, he/she will be kicked out.

So this AuthWrapper will wrap all out components,
and we check is the user info is still loading or getting any error.
If all set, then we go to show our components.
So the user can see everything ONLY after the user info arrives.
*/

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const AuthWrapper = ({ children }) => {
	const { isLoading, error } = useAuth0();

	if (isLoading) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		);
	}
	if (error) {
		return (
			<Wrapper>
				<h1>{error.message}</h1>
			</Wrapper>
		);
	}
	return children;
};

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
`;

export default AuthWrapper;
