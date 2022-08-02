import styled from 'styled-components';

export const BoxContainer = styled.div`
  margin-top: 30px;
  overflow-y: auto;
  border: 1px solid rgb(169, 174, 192);
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0 5px 15px 10px rgb(0 0 0 / 44%);
  padding: 4%;
`;

export const Title = styled.h1`
  margin-right: 4%;
  text-align: center;
`;
export const Li = styled.li`
  display: flex;
  list-style: none;
  border: 1px solid red;
  width: 100%;
  border: 1px solid rgb(169, 174, 192);
  border-radius: 6px 6px 6px 6px;
  margin-right: 8px;
`;
export const LiMain = styled.li`
  display: flex;
  list-style: none;
  margin-right: 80px;
  margin-bottom: 10px;
`;

export const Div = styled.div`
  width: 50%;
  /* border-right: 1px solid red; */
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Vertical = styled.div`
  border-right: 1px solid rgb(169, 174, 192);
`;

export const P = styled.p`
  margin: 0;
`;
