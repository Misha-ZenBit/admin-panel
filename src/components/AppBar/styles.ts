import styled from "styled-components";
import { colors } from "../../constants";


export const Header = styled.header`
  padding: 2px 24px;
  border-bottom: 1px solid grey;
  /* @media (max-width: 575px){
       
  } */
`;

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  .navLink {
    color: ${colors.lightBlue};
    font-weight: 500;
    font-size: large;
    position: relative;
    padding: 2px 0;
    margin: 0 8px;
    @media (max-width: 575px){
      font-weight: 300;
      font-size: medium;
       
  }
}
.navLink.active {
    color: aqua ;
  }
  .navLink:hover {
    color: blue;
  }
`;