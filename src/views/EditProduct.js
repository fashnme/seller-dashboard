
import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    FormGroup,
    FormLabel,
    FormControl
} from "react-bootstrap";
import axios from "axios";
import { Card } from "components/Card/Card.js";
import { FormInputs } from "components/FormInputs/FormInputs.js";
import Button from "components/CustomButton/CustomButton.js";
import sharedVariables from './../variables/shared';

class EditProduct extends Component {

    constructor(props) {

        super(props);
        const { id } = this.props.match.params;
        const { baseUrl, headers } = sharedVariables;

        this.state = {
            loading: true,
            formData: {}
        }

        axios.get(`${baseUrl}/product/fetch-product/?productId=${id}`, { headers })
            .then(productData => {
                // console.log("product data recieved ", productData.data.product)
                productData.data.product.size = {
                    'm': 10,
                    'l': 7
                }
                this.setState({
                    loading: false,
                    formData: productData.data.product
                })
            })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    calculatePrice() {
        let cp = this.state.formData.crossedPrice;
        let dis = this.state.formData.discount;
        return (cp - ((dis * 100) / cp)).toFixed(2);
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

        if (this.state.loading) {
            return (
                <div className="text-center">
                    <h2>Loading.....</h2>
                </div>
            )
        }
        else {
            return (
                <div className="content">
                    <Container fluid>
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
                                                        value: this.state.formData.brandName || ''
                                                    }
                                                ]}
                                            />
                                            <FormInputs
                                                ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                                                properties={[
                                                    {
                                                        label: "selling price",
                                                        type: "number",
                                                        name: "price",
                                                        onChange: this.handleChange,
                                                        bsClass: "form-control",
                                                        placeholder: "2599",
                                                        disabled: true,
                                                        value: this.calculatePrice()
                                                    },
                                                    {
                                                        label: "MRP",
                                                        type: "number",
                                                        name: "crossedPrice",
                                                        onChange: this.handleChange,
                                                        bsClass: "form-control",
                                                        placeholder: "2599",
                                                        value: this.state.formData.crossedPrice || ''
                                                    },
                                                    {
                                                        label: "Discount",
                                                        type: "number",
                                                        step: "0.1",
                                                        name: "discount",
                                                        onChange: this.handleChange,
                                                        bsClass: "form-control",
                                                        placeholder: "7.5",
                                                        value: this.state.formData.discount || ''
                                                    },
                                                    {
                                                        label: "gender",
                                                        as: "select",
                                                        name: "gender",
                                                        options: ["male", "female", "unisex"],
                                                        onChange: this.handleChange,
                                                        bsClass: "form-control",
                                                        placeholder: "male",
                                                        value: this.state.formData.gender || '',
                                                    }
                                                ]}
                                            />

                                            <Row>
                                                <Col md={12}>
                                                    {Object.entries(this.state.formData.size).map(([key, value]) => {
                                                        return (
                                                            <FormGroup>
                                                                <FormLabel>{key}</FormLabel>
                                                                <FormControl 
                                                                    type="number"
                                                                    value={value}
                                                                />
                                                            </FormGroup>
                                                        )
                                                    })}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl
                                                            rows="5"
                                                            name="desc"
                                                            componentClass="textarea"
                                                            bsClass="form-control"
                                                            placeholder="Here can be your description"
                                                            onChange={this.handleChange}
                                                            value={this.state.formData.description}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button variant="info" pullRight fill type="submit">
                                                Save Changes
                    					</Button>
                                            <Button variant="warning" pullRight
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
                    </Container>
                </div>
            );
        }
    }
}

export default EditProduct;
