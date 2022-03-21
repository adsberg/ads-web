import { FormEvent, useState } from "react";
import { useMutation } from "graphql-hooks";
import { Jwt } from "../../api-client/types";
import { GraphQLError } from "graphql";
import handleError from "../../lib/handle-api-error";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";

const LOGIN_MUTATION = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export type LoginFormProps = {
  onLogin: (token: string) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [loginUserMutation] = useMutation<{ login: Jwt }, object, GraphQLError>(
    LOGIN_MUTATION
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return false;
    const { data, error, loading } = await loginUserMutation({
      variables: { email, password }
    });
    setLoading(loading);
    if (error) {
      handleError(error);
    } else if (data) {
      const { token } = data.login;
      onLogin(token);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormGroup
        helperText="Helper text with details..."
        label="Email"
        labelFor="email-input"
        labelInfo="*"
        disabled={isLoading}
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
        disabled={isLoading}
      >
        <InputGroup
          required={true}
          id="pass-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button
        icon="log-in"
        type="submit"
        intent={Intent.PRIMARY}
        disabled={isLoading}
      >
        {"Login"}
      </Button>
    </form>
  );
}
