import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.components";
import CustomButton from "../Custom-button/custom-button.components";
import { signInWithGoogle } from "../../firebase/firebase.util";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }); //if the field name is email then set the email state with the value
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I had an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle}>
            {" "}
            Sign In With Google{" "}
          </CustomButton>
        </form>
      </div>
    );
  }
}
export default SignIn;
