import { Form } from "antd";
import styled from "styled-components";
import { colors } from "../../constants";
export const StyledForm = styled(Form)`
        background-color: ${colors.colorForm};
        margin-top: 80px;
        border: 2px solid grey;
        border-radius: 15px 15px 15px 15px;
        box-shadow: 0 20px 30px 20px rgb(0 0 0 / 44%);
        max-width: 500px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 25px;
        @media (max-width: 575px){
            max-width: 350px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;

        }
        .ant-form-item {
            display: flex;
            align-items: center;
            
            .ant-form-item-required {
                color: black
            }
            .ant-input {
                width: 300px;
                margin-bottom: 0;
                @media (max-width: 575px){
                    max-width: 94%
        
                }
        }
        .ant-input-password {
            width: 300px;
            @media (max-width: 575px){
                    max-width: 94%;
        
                }
        }
        .ant-form-item-control-input {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 0px;
}
.ant-col-8 {
    display: block;
    flex: 0 0 33.33333333%;
    max-width: 33.33333333%;
}
    }
`;