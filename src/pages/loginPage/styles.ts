import { Form } from "antd";
import styled from "styled-components";

export const StyledForm = styled(Form)`
        background-color: bisque;
        margin-top: 80px;
        border: 1px solid black;
        box-shadow: 0 50px 50px 20px rgb(0 0 0 / 64%);
        width: 600px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 10px;
        .ant-form-item {
      
        display: flex;
        align-items: center;

        .ant-form-item-required {
            color: red
        }
        .ant-input {
            width: 300px;
        }
        .ant-input-password {
            width: 300px;
        }
    }
`;