import { Button } from 'antd';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { GithubPicker } from 'react-color';

export const Page = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 460px;
`;
export const CheckBoxes = styled(Checkbox.Group)`
  display: inline-grid;
`;
export const BoxContainer = styled.div`
  margin-top: 30px;
  overflow-y: auto;
  border: 1px solid rgb(169, 174, 192);
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0 20px 20px 10px rgb(0 0 0 / 44%);
  padding: 4%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent 50%;
  vertical-align: middle;
  align-items: center;
  text-align: center;
  height: 38px;
  border-radius: 25px 25px 25px 25px;
  border-bottom: 1px solid white;
`;

export const GithubPickers = styled(GithubPicker)`
  max-width: min-content !important;
  flex-wrap: nowrap !important;
`;
export const Circle = styled.div`
  width: 0px;
  height: 0px;
  border-radius: 50% 50% 50% 50%;
  margin-right: 10px;
  margin-left: 25px;
  margin-top: 12px;
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
    border: none;
    color: black;
    background: none;
  }
`;
