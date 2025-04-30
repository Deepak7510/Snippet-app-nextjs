import AuthContextProvider from "./AuthContext";
import Header from "./header";
import SnippetContextProvider from "./SnippetContext";

function CustomLayout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <SnippetContextProvider>
          <Header />
          {children}
        </SnippetContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default CustomLayout;
