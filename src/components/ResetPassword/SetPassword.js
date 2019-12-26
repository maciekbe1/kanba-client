import React, { useState } from "react";
import * as API from "../../api/API";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export default function SetPassword(props) {
    const [password, setPassword] = useState("");
    // const [repeadPassword, setRepeadPassword] = useState("");
    const [error, setError] = useState("");
    const setPasswordHandler = e => {
        e.preventDefault();
        API.request("http://localhost:4000/api/users/set-password", {
            password: password,
            hash: props.match.params.id
        })
            .then(res => {
                setError(res.data.message);
            })
            .catch(err => {
                setError(err.response.data);
            });
    };
    return (
        <Container>
            <form onSubmit={e => setPasswordHandler(e)}>
                <FormControl style={{ marginBottom: "20px" }}>
                    <InputLabel htmlFor="standard-adornment-email">
                        password
                    </InputLabel>
                    <Input
                        id="password"
                        aria-describedby="email-helper-text"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Send
                    </Button>
                </FormControl>
            </form>
            <div>{error}</div>
        </Container>
    );
}
