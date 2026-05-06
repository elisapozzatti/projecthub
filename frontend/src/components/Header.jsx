function Header({ width, height }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="/logo.png"
        style={{
          width: width,
          height: height,
        }}
      />
    </header>
  );
}

export default Header;
