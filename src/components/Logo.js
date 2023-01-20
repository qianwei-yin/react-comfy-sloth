import styled from 'styled-components';

const Logo = () => {
	return (
		<Wrapper>
			<span>Comfy</span>Sloth
		</Wrapper>
	);
};

const Wrapper = styled.h3`
	margin-bottom: 0;
	color: var(--clr-primary-5);
	span {
		color: var(--clr-grey-2);
	}
`;

export default Logo;
