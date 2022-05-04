import React from "react";
import UpdateUser from "../../components/updateUser/UpdateUser";
import Nav from "../../components/nav/Nav";

export default function Update({
  user,
  currentPage,
  setCurrentPage,
  updateType,
  handleSidebar,
}) {
  setCurrentPage("Update");
  return (
    <div className="container" id="container">
      <Nav
        user={user}
        currentPage={currentPage}
        handleSidebar={handleSidebar}
      />
      {updateType === "user" && <UpdateUser user={user} />}
    </div>
  );
}
