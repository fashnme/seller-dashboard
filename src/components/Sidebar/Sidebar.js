
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";

import logo from "assets/img/fashn-logo.png";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        };
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    updateDimensions() {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
        const sidebarBackground = {
            backgroundImage: "url(" + this.props.image + ")"
        };
        return (
            <div
                id="sidebar"
                className="sidebar"
                data-color={this.props.color}
                data-image={this.props.image}
            >
                {this.props.hasImage ? (
                    <div className="sidebar-background" style={sidebarBackground} />
                ) : (
                        null
                    )}
                <div className="logo">
                    <a
                        href="https://fashn.me/"
                        className="simple-text logo-mini"
                    >
                        <div className="logo-img">
                            <img src={logo} alt="logo_image" />
                        </div>
                    </a>
                    <h6 className="m-auto">Fashn Seller Dashboard</h6>
                   
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
                        {this.props.routes.map((prop, key) => {
                            if (prop.invisible)
                                return null;
                            if (!prop.redirect)
                                return (
                                    <li
                                        style={{listStyle: 'none',float: 'left', padding: '5px'}}
                                        className={this.activeRoute(prop.layout + prop.path)}
                                        key={key}
                                    >
                                        <NavLink
                                            style={{color: 'white', verticalAlign: 'middle', width: '100%'}}
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i  style={{ verticalAlign: 'middle'}} className={prop.icon} />
                                            <p style={{display: 'inline'}}>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
