import Header from "./Header.jsx";

function Home() {
  return (
    <>
      <Header />
      <h1 className="homeText">Shopping cart app made using React</h1>
      <h2 className="apiCredit">
        This app utilizes{" "}
        <a href="https://fakestoreapi.com/" target="_blank">
          FakeStore API
        </a>
      </h2>
    </>
  );
}

export default Home;
