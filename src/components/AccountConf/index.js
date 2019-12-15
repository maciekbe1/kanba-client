import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VerifyPage(props) {
    const [message, setMessage] = useState("");
    useEffect(() => {
        axios({
            method: "post",
            url: `http://localhost:4000/api/users/verify/${props.match.params.hash}`,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                setMessage(res.data.message);
            })
            .catch(err => {
                setMessage(err.response.data.message);
            });
    }, [props.match.params.hash]);

    return <div>{message}</div>;
}
