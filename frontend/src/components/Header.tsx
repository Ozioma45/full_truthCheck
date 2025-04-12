import React from "react";

type Props = {
  headertitle: string;
};

const Header: React.FC<Props> = ({ headertitle }) => {
  return <header>{headertitle}</header>;
};

export default Header;
