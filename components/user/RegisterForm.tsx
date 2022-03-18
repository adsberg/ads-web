import { FormEvent, useState } from "react";
import { useMutation } from "graphql-hooks";
import { Jwt } from "../../api-client/types";
import { GraphQLError } from "graphql";
import handleError from "../../lib/handle-api-error";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useCurrentUser } from "../../lib/currenct-user";
import Router from "next/router";

const REGISTER_MUTATION = `
  mutation RegisterMutation($input: InputRegister!) {
    register(input: $input) {
      id
      token
    }
  }
`;

export default function RegisterForm() {
  const [registerUserMutation] = useMutation<
    { register: Jwt },
    object,
    GraphQLError
  >(REGISTER_MUTATION);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { onLogin } = useCurrentUser();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return false;
    const { data, error, loading } = await registerUserMutation({
      variables: { input: { email, password, username } }
    });
    setLoading(loading);
    if (error) {
      handleError(error);
    } else if (data) {
      const { token } = data.register;
      onLogin(token);
      Router.push("/");
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
        label="Username"
        labelFor="username-input"
        labelInfo="*"
        disabled={isLoading}
      >
        <InputGroup
          required={true}
          id="username-input"
          placeholder="Username"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
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
        icon="user"
        type="submit"
        intent={Intent.PRIMARY}
        disabled={isLoading}
      >
        {"Register"}
      </Button>
    </form>
  );
}
