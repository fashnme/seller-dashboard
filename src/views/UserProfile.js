
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import { UserCard } from "components/UserCard/UserCard.js";
import Button from "components/CustomButton/CustomButton.js";
import { profilePageDataFetch } from '../actions/ProfilePageDataFetched';

class UserProfile extends Component {

  constructor(props) {

    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(this.state, undefined, 2));
  }

  componentDidMount() {
    this.props.profilePageDataFetch();
    // console.log("UserProfile-->", this.props.profile.profileData);
    const { isLoading, profileData } = this.props.profile;
    if (!isLoading) {
      // console.log(profileData);
      this.setState(profileData);
    }
  }

  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Seller Name",
                          name: "sellerName",
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Seller Name",
                          value: this.state.sellerName || '',
                          disabled: true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          name: "email",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Email",
                          value: this.state.email || ''
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          name: "firstName",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "First name",
                          value: this.state.firstName || ''
                        },
                        {
                          label: "Last name",
                          type: "text",
                          name: "lastName",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: this.state.lastName || ''
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Phone No.",
                          type: "text",
                          name: "phoneNo",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Phone No.",
                          value: this.state.phoneNo || '',
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          name: "address",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          value: this.state.address || ''
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City",
                          type: "text",
                          name: "city",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "City",
                          value: this.state.city || ''
                        },
                        {
                          label: "Country",
                          type: "text",
                          name: "country",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Country",
                          value: this.state.country || ''
                        },
                        {
                          label: "Postal Code",
                          name: "postalCode",
                          type: "number",
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          value: this.state.postalCode || ''
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            name="about"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            onChange={this.handleChange}
                            value={this.state.about || ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar="https://p16.muscdn.com/img/musically-maliva-obj/1646185398498309~c5_220x220.jpeg"
                name={this.state.firstName + " " + this.state.lastName}
                userName={this.state.sellerName}
                description={this.state.about}
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
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
    profile: state.ProfileReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ profilePageDataFetch }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

