
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from "components/Card/Card.js";
import { thArray } from "variables/Variables.js";
import { ordersPageDataFetch } from '../actions';

class TableList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tdArray: []
        }
    }

    componentDidMount() {

        this.props.ordersPageDataFetch();
        const { isLoading, ordersData } = this.props.orders;

        if (!isLoading) {

            console.log("-->", ordersData.ordersInfo);
            const tdArray = ordersData.ordersInfo.map((element, index) => {
                const { orderId, orderCreated, orderAmount } = element;
                const productIds = element.products.map(item => item.productId).join(', ')
                return [index, orderId, orderCreated, productIds, orderAmount];
            })
            this.setState({ tdArray });

        }
    }

    render() {
        return (
            <div className="content">
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
                                            {this.state.tdArray.map((prop, key) => {
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

                        <Col md={12}>
                            <Card
                                plain
                                title="Active Orders"
                                category="Here is a subtitle for this table"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {thArray.map((prop, key) => {
                                                    return <th key={key}>{prop}</th>;
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tdArray.map((prop, key) => {
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

function mapStateToProps(state) {
    return {
        orders: state.ordersReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ordersPageDataFetch }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TableList);
