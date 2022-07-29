import { Button, Form } from 'antd';
import styled from 'styled-components';
import { colors } from '../../constants';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;

export const Page = styled.div`
  display: flex;
  margin-left: 10px;
  max-width: 300px;
  /* margin-right: 50%; */
  /* justify-content: end; */
`;
export const CheckBoxes = styled(Checkbox.Group)`
  display: inline-grid;
`;
export const BoxContainer = styled.div`
  margin-top: 30px;
  height: 75vh;
  overflow-y: auto;
  border: 1px solid rgb(169, 174, 192);
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0 20px 20px 10px rgb(0 0 0 / 44%);
  padding: 4%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
`;
export const ButtonDel = styled(Button)`
  display: flex;
  background: none;
  border: none;
  color: #fff;
  margin-bottom: 12px;
  justify-content: center;
  width: 33px;
  border-radius: 50% 50% 50% 50%;
  :hover {
    color: black;
    border: 1px solid blue;
  }
  :focus {
    border: 1px solid blue;
    color: black;
  }
`;
