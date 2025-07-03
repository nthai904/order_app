import { Link } from "react-router-dom";
import { ReactComponent as LogoDark1 } from "../../../../assets/images/logos/logo-dark.svg";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "90px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      height={70}
      style={{
        display: "flex",
        alignItems: "center", justifyContent: 'center'
      }}
    >
      <LogoDark1 />
    </LinkStyled>
  );
};

export default Logo;
