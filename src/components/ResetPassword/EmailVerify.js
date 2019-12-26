import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import * as API from "../../api/API";
import Button from "@material-ui/core/Button";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const emailHandler = e => {
        e.preventDefault();
        API.request("http://localhost:4000/api/users/reset-password", {
            email: email
        })
            .then(res => {
                setSuccess(true);
                setError(res.data.message);
            })
            .catch(err => {
                setError(err.response.data);
            });
    };
    return (
        <Container>
            <form onSubmit={e => emailHandler(e)}>
                <FormControl style={{ marginBottom: "20px" }}>
                    <InputLabel htmlFor="standard-adornment-email">
                        Email address
                    </InputLabel>
                    <Input
                        id="email"
                        aria-describedby="email-helper-text"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
