
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { style } from './../variables/Variables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from "components/Card/Card.js";
import { thArray } from "variables/Variables.js";
import { ordersPageDataFetch } from '../actions';

class Orders extends Component {

    componentDidMount() {
        this.props.ordersPageDataFetch();
    }

    render() {

        if (this.props.orders.isLoading) {
            return (
                <div className="text-center">
                    <h2>Loading.....</h2>
                </div>
            )
        }

        else {

            const tdArray = this.props.orders.ordersData.ordersInfo.map((element, index) => {
                const { orderId, orderCreated, orderAmount } = element;
                const productIds = element.products.map(item => item.productId).join(', ')
                return [index, orderId, orderCreated, productIds, orderAmount];
            })

            return (
                <div className="content" style={style.vh}>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Card
                                    title="Active Orders"
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
        orders: state.OrdersReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ordersPageDataFetch }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
