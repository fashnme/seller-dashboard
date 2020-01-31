
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

class AddProduct extends Component {

    constructor(props) {

        super(props);

        this.state = {
            formData: {},
            files: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    calculatePrice() {
        let cp = this.state.formData.crossedPrice;
        let dis = this.state.formData.discount;
        return (cp - ((dis * 100) / cp)).toFixed(2);
    }

    handleChange(e) {

        if (e.target.type === 'file') {
            this.setState({ files: e.target.files })
        }
        else {

            const value = e.target.value;
            const name = e.target.name;
            this.setState({
                formData: {
                    ...this.state.formData,
                    [name]: value
                }
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state, undefined, 2));
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="text-center">
                    <h2>Loading.....</h2>
                </div>
            )
        }
        else if (this.state.err) {
            return (
                <div className="text-center">
                    <h2>{this.state.err}</h2>
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
                                    title="Add Product"
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
                                                        bsPrefix: "form-control",
                                                        placeholder: "Exotic Kutri",
                                                        value: this.state.formData.title || '',
                                                    },
                                                    {
                                                        label: "brand",
                                                        type: "text",
                                                        name: "brand",
                                                        onChange: this.handleChange,
                                                        bsPrefix: "form-control",
                                                        placeholder: "Levis",
                                                        value: this.state.formData.brandName || ''
                                                    }
                                                ]}
                                            />

                                            <Row>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <FormLabel>Category</FormLabel>
                                                        <FormControl
                                                            as="select"
                                                            name="category"
                                                            onChange={this.handleChange}
                                                            value={this.state.formData.category}
                                                            defaultValue="select"
                                                        >
                                                            <option disabled>select</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </FormControl>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <FormInputs
                                                ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                                                properties={[
                                                    {
                                                        label: "selling price",
                                                        type: "number",
                                                        name: "price",
                                                        onChange: this.handleChange,
                                                        bsPrefix: "form-control",
                                                        placeholder: "2599",
                                                        disabled: true,
                                                        value: this.calculatePrice()
                                                    },
                                                    {
                                                        label: "MRP",
                                                        type: "number",
                                                        name: "crossedPrice",
                                                        onChange: this.handleChange,
                                                        bsPrefix: "form-control",
                                                        placeholder: "2599",
                                                        value: this.state.formData.crossedPrice || 0
                                                    },
                                                    {
                                                        label: "Discount",
                                                        type: "number",
                                                        step: "0.1",
                                                        name: "discount",
                                                        onChange: this.handleChange,
                                                        bsPrefix: "form-control",
                                                        placeholder: "7.5",
                                                        value: this.state.formData.discount || 0
                                                    },
                                                    {
                                                        label: "gender",
                                                        as: "select",
                                                        name: "gender",
                                                        options: ["male", "female", "unisex"],
                                                        onChange: this.handleChange,
                                                        bsPrefix: "form-control",
                                                        value: this.state.formData.gender || 'select',
                                                    }
                                                ]}
                                            />

                                            <Row>
                                                <Col xs={12}>
                                                    <FormLabel>Sizes</FormLabel>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={12}>
                                                    <FormGroup>
                                                        <FormLabel>Images</FormLabel>
                                                        <FormControl
                                                            type="file"
                                                            multiple
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl
                                                            rows="5"
                                                            name="desc"
                                                            as="textarea"
                                                            placeholder="Here can be your description"
                                                            onChange={this.handleChange}
                                                            value={this.state.formData.description || ''}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button variant="info" pullRight fill type="submit">
                                                Add Product
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

export default AddProduct;
