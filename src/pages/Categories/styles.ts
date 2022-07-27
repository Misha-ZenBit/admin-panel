import { Form } from 'antd';
import styled from 'styled-components';
import { colors } from '../../constants';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;

export const Page = styled.div`
  /* display: inline; */
  margin-left: 10px;
  /* margin-right: 50%; */
  /* justify-content: end; */
`;
export const CheckBoxes = styled(Checkbox.Group)`
  display: inline-grid;
`;
export const CheckBoxContainer = styled.div`
  margin-top: 40px;
`;
