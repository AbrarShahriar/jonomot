import React from "react";

export default function Avatar({ text, inverted = false }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: "50%",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        background: inverted ? "white" : "rgb(51,51,51)",
        color: inverted ? "rgb(51,51,51)" : "white",
      }}
    >
      {text[0].toUpperCase()}
    </div>
  );
}
