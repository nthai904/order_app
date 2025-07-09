import { Link } from "react-router-dom";
import LogoDark1 from "../../../../assets/images/logos/logo-1-resized.jpg";
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
      height={30}
      style={{
        display: "flex",
        alignItems: "center", justifyContent: 'center'
      }}
    >
      <img
        src={LogoDark1}
        alt="Logo"
        style={{ maxWidth: "50%", maxHeight: "50%", objectFit: "contain" }}
      />
    </LinkStyled>
  );
};

export default Logo;
