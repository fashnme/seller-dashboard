
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from 'components/CustomButton/CustomButton';
import { style } from './../variables/Variables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from "components/Card/Card.js";
import { inventoryPageDataFetch } from '../actions';
import { Link, Route, Switch, NavLink } from "react-router-dom";


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

            console.log("inventory props", this.props.inventory);
            const thArray = ["title", "description", "discount", "brandName", "gender", "crossedPrice", "price", "ecommerce"];
            const tdArray = this.props.inventory.inventoryData.map(item => {
                const { title, description, discount, brandName, gender, crossedPrice, price, ecommerce } = item._source
                return [title, description, discount, brandName, gender, crossedPrice, price, ecommerce]
            })
            // const tdArray = [];

            return (
                <div className="content" style={style.vh}>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Link to='inventory/add-product'>
                                    <Button bsStyle="warning"
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
                                                {tdArray.map((prop, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            {prop.map((prop, key) => {
                                                                return <td key={key}>{prop}</td>;
                                                            })}
                                                            <td><Link
                                                                to={{
                                                                    pathname: "inventory/edit-product",
                                                                    state: {prop}
                                                                }}
                                                            >
                                                                <Button
                                                                    bsStyle="primary"
                                                                    bsSize="xs"
                                                                    fill
                                                                    style={{ margin: 2 }}
                                                                >edit</Button>
                                                            </Link></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
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
