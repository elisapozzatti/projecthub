function Box({ title, confirm, cancel, onClickConfirm, onClickCancel, input }) {
  return (
    <>
      <div
        style={{
          background: "rgba(2, 6, 23, 0.7)",
          color: "white",
          borderRadius: "10px",
          height: "40vh",
          width: "40vw",
          position: "absolute",
          top: "30%",
          left: "35%",
          width: "30vw",
          height: "auto",
          textAlign: "center",
        }}
      >
        <h2>{title}</h2>
        <div>{input}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <button
            onClick={onClickConfirm}
            style={{
              width: "100px",
            }}
          >
            {confirm}
          </button>
          <button
            onClick={onClickCancel}
            style={{
              width: "100px",
            }}
          >
            {cancel}
          </button>
        </div>
      </div>
    </>
  );
}

export default Box;
