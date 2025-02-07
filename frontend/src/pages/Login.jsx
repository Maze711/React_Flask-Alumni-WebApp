import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    alumni_id: "",
    password: "",
  });

  // Authenticates the user from the server and login
  const loginUser = async (event) => {
    event.preventDefault();
    const { alumni_id, password } = input;

    try {
      const { data } = await axios.post("/api/auth", {
        alumni_id,
        password,
      });

      setInput({});
      toast.dismiss();
      toast.success(data.message);
      const user_role = data.role;
      const full_name = data.full_name;
      // routes the user to specific page based on their role
      navigate(user_role === "DEAN" ? "/admin" : "/home", { state: { full_name } });
    } catch (error) {
      toast.dismiss();
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || error.message);
      }
      console.dir(error, { depth: null });
    }
  };

  return (
    <>
      <div className="login template min-vh-100 d-flex align-items-center justify-content-center bg-secondary">
        <Form className="shadow p-5 mb-5 bg-body rounded" onSubmit={loginUser}>
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
