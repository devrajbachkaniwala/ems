import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type TLayoutProps = {
  children: ReactNode;
};

const Layout: FC<TLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
