import React from "react";
import { useRegister } from "@refinedev/core";

export const Register = () => {
    const { mutate: register } = useRegister();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get form data
        const formData = Object.fromEntries(
            new FormData(e.currentTarget).entries(),
        );

        // call register mutation
        register(formData);

        // reset form data
        e.currentTarget.reset();
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type="email"
                    placeholder="email" name="email"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};