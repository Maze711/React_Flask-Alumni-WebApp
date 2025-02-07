import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Login = () => {



  const loginUser = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="login template min-vh-100 d-flex align-items-center justify-content-center bg-secondary">
        <Form className="shadow p-5 mb-5 bg-body rounded" onSubmit={loginUser}>
          <h2 className="mb-3">Login</h2>
          <Form.Floating className="mb-3">
            <Form.Control
              id="alumniId"
              type="text"
              placeholder="name@example.com"
            />
            <label htmlFor="alumniId">Alumni ID</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
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
