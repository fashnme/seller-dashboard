
import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.js";
import { FormInputs } from "components/FormInputs/FormInputs.js";
import Button from "components/CustomButton/CustomButton.js";
import { Link } from "react-router-dom";

class EditProduct extends Component {

    constructor(props) {

        super(props);
        const product = this.props.location.state.prop;
        this.state = {
            fetched: false,
            formData: {
                title: product[0],
                desc: product[1],
                dis: product[2],
                brand: product[3],
                gender: product[4],
                cprice: product[5],
                price: product[6]
            }
        };

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
    }

    render() {
        // console.log(this.props.location.state.prop);
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Edit Product"
                                content={
                                    <form onSubmit={this.handleSubmit}>
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Title",
                                                    name: "title",
                                                    onChange: this.handleChange,
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Exotic Kutri",
                                                    value: this.state.formData.title || '',
                                                },
                                                {
                                                    label: "brand",
                                                    type: "text",
                                                    name: "brand",
                                                    onChange: this.handleChange,
                                                    bsClass: "form-control",
                                                    placeholder: "Levis",
                                                    value: this.state.formData.brand || ''
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                                            properties={[
                                                {
                                                    label: "Price",
                                                    type: "text",
                                                    name: "price",
                                                    onChange: this.handleChange,
                                                    bsClass: "form-control",
                                                    placeholder: "2599",
                                                    value: this.state.formData.price || ''
                                                },
                                                {
                                                    label: "Crossed price",
                                                    type: "text",
                                                    name: "cprice",
                                                    onChange: this.handleChange,
                                                    bsClass: "form-control",
                                                    placeholder: "2599",
                                                    value: this.state.formData.cprice || ''
                                                },
                                                {
                                                    label: "Discount",
                                                    type: "text",
                                                    name: "dis",
                                                    onChange: this.handleChange,
                                                    bsClass: "form-control",
                                                    placeholder: "7.5",
                                                    value: this.state.formData.dis || ''
                                                },
                                                {
                                                    label: "gender",
                                                    type: "select",
                                                    name: "gender",
                                                    onChange: this.handleChange,
                                                    bsClass: "form-control",
                                                    placeholder: "male",
                                                    value: this.state.formData.gender || '',
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>Description</ControlLabel>
                                                    <FormControl
                                                        rows="5"
                                                        name="desc"
                                                        componentClass="textarea"
                                                        bsClass="form-control"
                                                        placeholder="Here can be your description"
                                                        onChange={this.handleChange}
                                                        value={this.state.formData.desc || ''}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button bsStyle="info" pullRight fill type="submit">
                                            Save Changes
                    					</Button>
                                        <Button bsStyle="warning" pullRight
                                            style={{ margin: "0px 10px 0px 0px" }}
                                            onClick={() => this.props.history.push('/admin/inventory')}>
                                            Cancel
                    					</Button>
                                        <div className="clearfix" />
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default EditProduct;
