import React, { useState } from "react";
import * as API from "../../api/API";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export default function SetPassword(props) {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const setPasswordHandler = e => {
        e.preventDefault();
        if (password === repeatPassword) {
            API.request("http://localhost:4000/api/users/set-password", {
                password: password,
                hash: props.match.params.id
            })
                .then(res => {
                    setMessage(res.data.message);
                })
                .catch(err => {
                    setMessage(err.response.data);
                });
        }
        setMessage("passwords not compare");
    };
    return (
        <Container>
            <form onSubmit={e => setPasswordHandler(e)}>
                <FormControl style={{ marginBottom: "20px" }}>
                    <InputLabel htmlFor="standard-adornment-email">
                        Password
                    </InputLabel>
                    <Input
                        id="password"
                        aria-describedby="email-helper-text"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="standard-adornment-email">
                        Repeat password
                    </InputLabel>
                    <Input
                        id="repeat-password"
                        aria-describedby="email-helper-text"
                        type="password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" color="primary" variant="contained">
                    Send
                </Button>
            </form>
            <div>{message}</div>
        </Container>
    );
}
