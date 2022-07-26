import styled from "styled-components";
import { colors } from "../../constants";


export const Header = styled.header`
  width: 100vw;
  padding: 2px 24px;
  border-bottom: 1px solid;
`;

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  .navLink {
    position: relative;
    padding: 2px 0;
    margin: 0 8px;
  }
  .navLink.active {
    color: ${colors.PageColor};
  }
  .navLink:hover {
    color: ${colors.PageColor};
  }
`;