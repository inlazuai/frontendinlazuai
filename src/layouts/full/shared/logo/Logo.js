import { Link } from "react-router-dom";
import { ReactComponent as LogoFull } from "../../../../assets/logo/inlazu-ai-1.svg";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "100px",
  width: "200px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoFull height={100} width={200} />
    </LinkStyled>
  );
};

export default Logo;
