import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { updateUser } from "../apis/api";

const Profile = () => {
  const { user, setUser } = useContext(LoginContext);
  const [values, setValues] = useState({ mobile: "", address: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setValues({ mobile: user.mobile, address: user.address });
  }, [user]);

  const changeUser = async (values) => {
    let response = await updateUser(user._id, values);
    setUser({ ...user, ...values });
    if (values.role === "seller") {
      setMessage(
        "Congratulations! You are now a seller and can manage products and orders from seller dashboard."
      );
    } else {
      setMessage("Profile saved successfully!");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <section className="bg-secondary flex flex-col rounded-md items-center py-4">
      <h1 className="text-yellow text-center medium:text-[2rem] text-[1.1rem] medium:mb-4 mb-1">
        My Profile
      </h1>
      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="name" className="text-yellow medium:mx-2 mr-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          readOnly
          className="bg-primary p-2 rounded-md"
        />
      </div>
      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="email" className="text-yellow medium:mx-2 mr-1">
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          readOnly
          className="bg-primary p-2 rounded-md"
        />
      </div>
      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="mobile" className="text-yellow medium:mx-2 mr-1">
          Mobile:
        </label>
        <input
          type="text"
          value={values.mobile}
          name="mobile"
          className="bg-primary p-2 rounded-md"
          id="mobile"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="address" className="text-yellow medium:mx-2 mr-1">
          Address:
        </label>
        <input
          type="text"
          value={values.address}
          name="address"
          className="bg-primary p-2 rounded-md"
          id="address"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div>
        {user.role === "user" && (
          <button
            onClick={() => changeUser({ role: "seller" })}
            className="medium:m-3 m-1 medium:text-[1rem] text-[3.5vw] bg-primary text-yellow p-2 rounded-md "
          >
            Become a Seller
          </button>
        )}
        <button
          onClick={() => {
            changeUser(values);
          }}
          className="medium:m-3 m-1 medium:text-[1rem] text-[3.5vw] bg-primary text-yellow p-2 rounded-md "
        >
          Save Profile
        </button>
      </div>
      <div className="text-center">{message}</div>
    </section>
  );
};

export default Profile;
