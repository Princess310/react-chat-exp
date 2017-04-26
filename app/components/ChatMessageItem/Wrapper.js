import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

export default Wrapper;

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
`;

const TouchWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export {
  ItemWrapper,
  TouchWrapper,
};
