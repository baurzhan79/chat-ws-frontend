import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Avatar, Button, CssBaseline, Grid, Typography, Container, Link, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";

import { registerUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: "#9c27b0" //palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    }
});

const Register = ({ isAllowed }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    });

    const registerError = useSelector(state => state.users.registerError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAllowed) navigate("/");
    }, [isAllowed, navigate]);

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const submitFormHandler = async event => {
        event.preventDefault();
        await dispatch(registerUser({ ...state }));
    };

    const getFieldError = fieldName => {
        try {
            return registerError.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box mt={5} className={classes.paper}>
                <Box m={1}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Box>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box mt={3}>
                    <form className={classes.form} sx={{ marginTop: 3 }} noValidate onSubmit={submitFormHandler}>
                        <Grid container spacing={2}>
                            <FormElement
                                error={getFieldError("username")}
                                name="username"
                                label="Username"
                                required={true}
                                // value={state.username}
                                onChange={inputChangeHandler}
                            />
                            <FormElement
                                error={getFieldError("email")}
                                name="email"
                                label="Email"
                                type="email"
                                required={true}
                                // value={state.email}
                                onChange={inputChangeHandler}
                            />
                            <FormElement
                                error={getFieldError("password")}
                                name="password"
                                label="Password"
                                type="password"
                                required={true}
                                // value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Box my={3} mx={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign Up
                            </Button>
                        </Box>
                        <Grid container justify="flex-end" style={{ marginBottom: "10px" }}>
                            <Grid item>
                                <Link to="/login" variant="body2" component={RouterLink}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box >
        </Container >
    );
}

export default Register;