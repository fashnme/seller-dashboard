
import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Button from 'components/CustomButton/CustomButton';
import { style } from './../variables/Variables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from "components/Card/Card.js";
import { inventoryPageDataFetch } from '../actions';
import { Link } from "react-router-dom";


class Inventory extends Component {

    componentDidMount() {
        this.props.inventoryPageDataFetch();
    }

    render() {

        if (this.props.inventory.isLoading) {
            return (
                <div className="text-center">
                    <h2>Loading.....</h2>
                </div>
            )
        }

        else {
            const inventory = this.props.inventory.inventoryData;
            console.log("inventory data", inventory);
            const thArray = ["title", "price", "crossed price", "gender", "brand"];

            return (
                <div className="content" style={style.vh}>
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <Link to='inventory/add-product'>
                                    <Button variant="warning"
                                        pullRight style={{ margin: "10px 0px 10px 0px" }}>
                                        + Add Product
                    			    </Button>
                                </Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Card
                                    title="Inventory"
                                    category="Here is a subtitle for this table"
                                    ctTableFullWidth
                                    ctTableResponsive
                                    content={
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    {thArray.map((prop, key) => {
                                                        return <th key={key}>{prop}</th>;
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inventory.map((row, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{row.title}</td>
                                                            <td>{row.price}</td>
                                                            <td>{row.crossedPrice}</td>
                                                            <td>{row.gender}</td>
                                                            <td>{row.brandName}</td>
                                                            <td>
                                                                <Link
                                                                    to={`inventory/${row.productId}`}
                                                                >
                                                                    <Button
                                                                        variant="primary"
                                                                    size="xs"
                                                                        fill
                                                                        style={{ margin: 2 }}
                                                                    >edit</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
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

function mapStateToProps(state) {
    return {
        inventory: state.InventoryReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ inventoryPageDataFetch }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
