import React, { Component } from 'react';
import {
    Card,
    Row,
    Container,
    Col,
    FormGroup,
    FormLabel,
    FormControl,
    Form,
    Button
} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authDataFetched } from './../actions';
import sharedVariables from '../variables/shared';
import axios from 'axios';


const Error = ({ error }) => {
    return (
        <Container fluid>
            <Row style={{ minHeight: "90vh" }}>
                <Col md={4} className="m-auto">
                    <Card className="shadow"
                        style={{ padding: "25px", verticalAlign: "middle", borderColor: "#3472F7" }}>
                        <h4>{error.status} Error</h4>
                        <p>{error.mess}</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: false,
            otp: true,
            toDashboard: false,
            toError: false,
            formData: {},
            error: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.formData, undefined, 2));
        const { baseUrl } = sharedVariables;

        if (!this.state.otp) {
            axios.post(`${baseUrl}/auth/seller/verify-otp`, this.state.formData)
                .then(resp => {
                    console.log(resp);
                    if (resp.status === 200) {
                        
                        this.props.authDataFetched(resp.data.jwt);

                        this.setState({
                            toDashboard: true,
                        })
                    }
                    else {
                        this.setState({
                            toError: true,
                            error: {
                                status: 400,
                                mess: "The OTP entered is Incorrect"
                            }
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        toError: true,
                        error: {
                            status: err.status,
                            mess: err.message
                        }
                    })
                });
        }
        else {
            axios.post(`${baseUrl}/auth/send-otp/`, this.state.formData)
                .then(resp => console.log(resp.data))
                .catch(err => console.log(err.message));

            this.setState({
                phone: true,
                otp: false
            })
        }
    }

    render() {

        if (this.state.toDashboard) {
            return <Redirect to='/admin' />;
        }

        else if (this.state.toError) {
            return <Error error={this.state.error} />;
        }

        else {
            return (
                <Container fluid>
                    <Row style={{ minHeight: "90vh" }}>
                        <Col md={4} className="m-auto">
                            <Card className="shadow"
                                style={{ padding: "25px", verticalAlign: "middle", borderColor: "#3472F7" }}>
                                <h4>Login</h4>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <FormLabel>Phone No</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="phoneNo"
                                            disabled={this.state.phone}
                                            onChange={this.handleChange}
                                            maxLength={10}
                                            minLength={10}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Otp</FormLabel>
                                        <FormControl
                                            type="password"
                                            name="otp"
                                            onChange={this.handleChange}
                                            disabled={this.state.otp}
                                            required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit">Submit</Button>
                                    </FormGroup>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        auth: state.AuthReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authDataFetched }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

