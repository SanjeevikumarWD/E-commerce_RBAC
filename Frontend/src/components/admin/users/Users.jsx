import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router";
import axios from "axios";

const Users = () => {
  const { users, staffs, fetchStaffs, fetchUsers, userRole } =
    useProductStore(); // Fetch userRole from the store
  const [showPopup, setShowPopup] = useState(false); // Popup state for success message
  const navigate = useNavigate();


  useEffect(() => { 
    if(userRole === null){
      navigate("/")
    }    
  }, [userRole]);

  
  // Fetch users and staff on component mount
  useEffect(() => {
    fetchStaffs();
    fetchUsers();
  }, [fetchUsers, fetchStaffs]);

  const toggleActiveStatus = async (id) => {
    console.log(id)
    try {
      const response = await axios.put(`http://localhost:3000/api/staff/toggle-active/${id}`);
      if (response.status === 200) {
        console.log(`Toggled active status for user with ID: ${id}`);
        fetchStaffs(); // Refresh the staff list after toggling
      } else {
        console.error("Failed to toggle active status");
      }
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const handleRegisterClick = () => {
    if (userRole === "ADMIN") {
      setShowPopup(true); // Show the popup when admin is registering a staff
      setTimeout(() => {
        navigate("/admin/register"); // Navigate to the register page after showing the popup
      }, 2000);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-20 container mx-auto px-4 py-8 space-y-16">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
              Staffs Working
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              onClick={handleRegisterClick} // Register button logic
            >
              Register Staff
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Email
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Role
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffs && staffs.length > 0 ? (
                  staffs.map((staff) => (
                    <tr key={staff._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {staff.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {staff.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {staff._id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {staff.role || "STAFF"}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        <button
                          onClick={() => toggleActiveStatus(staff._id)}
                          className={`px-4 py-2 rounded-lg shadow transition ${
                            staff.active
                              ? "bg-green-300 text-green-900"
                              : "bg-red-300 text-red-900 font-semibold"
                          } hover:opacity-80`}
                        >
                          {staff.active ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center px-4 py-2 border border-gray-300"
                    >
                      No staffs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-6">
            Users
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Email
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300 lg:text-2xl">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {user.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {user._id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 lg:text-xl">
                        {user.role || "USER"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center px-4 py-2 border border-gray-300"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center">
              Re-Directing To Staff Account Registration..
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
