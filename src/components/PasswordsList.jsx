import React from "react";
import PasswordCard from "./PasswordCard";

const PasswordsList = ({ passwords }) => {
  if (!passwords.length) return <p>Немає збережених паролів.</p>;

  return (
    <div>
      {passwords.map((pwd) => (
        <PasswordCard key={pwd.entryId} password={pwd} />
      ))}
    </div>
  );
};

export default PasswordsList;
