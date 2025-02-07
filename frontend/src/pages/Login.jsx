import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const Login = () => {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const [input, setInput] = useState({
    alumni_id: "",
    password: "",
  });

  // Handles the onSubmit from login form
  const handleLogin = async (event) => {
    event.preventDefault();
    const { alumni_id, password } = input;

    try {
      const data = await loginUser(alumni_id, password);
      setInput({ alumni_id: "", password: "" }); // Reset input fields
      const user_role = data.role;
      const full_name = data.full_name;
      // routes the user to specific page based on their role
      navigate(user_role === "DEAN" ? "/admin" : "/home", {
        state: { full_name },
      });
      toast.dismiss();
      toast.success(data.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    }
  };

  return (
    <>
      <div className="login template min-vh-100 d-flex align-items-center justify-content-center bg-secondary">
        <Form
          className="shadow p-5 mb-5 bg-body rounded"
          onSubmit={handleLogin}
        >
          <h2 className="mb-3">Login</h2>
          <Form.Floating className="mb-3">
            <Form.Control
              id="alumniId"
              type="text"
              onChange={(e) =>
                setInput({ ...input, alumni_id: e.target.value })
              }
              value={input.alumni_id}
              placeholder="name@example.com"
            />
            <label htmlFor="alumniId">Alumni ID</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              value={input.password}
              placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
          <Button className="w-100 fw-bold" variant="primary" type="submit">
            LOG IN
          </Button>
        </Form>
      </div>
    </>
  );
};
