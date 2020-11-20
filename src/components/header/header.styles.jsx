import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between; //so they will spaced out as possible
  margin-bottom: 25px;
`;
//extended styled components into Link components
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding-left: 25px;
`;
export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end; //always on the end
`;
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
