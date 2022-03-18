import { FormEvent, useContext, useState } from "react";
import { ClientContext, useMutation } from "graphql-hooks";
import Router from "next/router";
import { Jwt } from "../../api-client/types";
import { GraphQLError } from "graphql";
import handleError from "../../lib/handle-api-error";
import { useCookies } from "react-cookie";
import config from "../../lib/config";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useCurrentUser } from "../../lib/currenct-user";

const LOGIN_MUTATION = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default function LoginComponent() {
  const [loginUserMutation] = useMutation<{ login: Jwt }, object, GraphQLError>(
    LOGIN_MUTATION
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = useCurrentUser({
    redirectTo: "/",
    redirectIfFound: true
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await loginUserMutation({
      variables: { email, password }
    });
    if (error) {
      handleError(error);
    } else if (data) {
      const { token } = data.login;
      onLogin(token);
      // Router.push("/");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormGroup
        helperText="Helper text with details..."
        label="Email"
        labelFor="email-input"
        labelInfo="*"
      >
        <InputGroup
          required={true}
          id="email-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup
        helperText="Helper text with details..."
        label="Password"
        labelFor="pass-input"
        labelInfo="*"
      >
        <InputGroup
          required={true}
          id="pass-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button icon="log-in" type="submit" intent={Intent.PRIMARY}>
        {"Login"}
      </Button>
    </form>
  );
}
