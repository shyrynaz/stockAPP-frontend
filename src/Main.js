import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import { Layout, Menu, Icon, Button, Affix } from "antd";

import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-routes/privateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Technology from "./components/dashboard/technology";
import Finance from "./components/dashboard/finance";
import HealthCare from "./components/dashboard/health";
import Energy from "./components/dashboard/energy";
import ConsumerServices from "./components/dashboard/consumer";

const { Header, Content, Sider } = Layout;

class Main extends Component {
  state = {
    collapsed: false,
    mode: "inline"
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  toggle = collapsed => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: collapsed ? "vertical" : "inline"
    });
  };

  render() {
    let userAuth;
    const auth = this.props.auth;
    if (auth.isAuthenticated === true) {
      userAuth = (
        <Button
          style={{ margin: 10 }}
          className="button1"
          type="primary"
          onClick={this.onLogoutClick}
        >
          Logout
        </Button>
      );
    } else {
      userAuth = (
        <Button
          href="/login"
          className="button1"
          type="secondary"
          style={{ margin: 10 }}
        >
          Login
        </Button>
      );
    }
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              height: "100vh"
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="vertical-left">
              <Menu.Item key="1">
                <Icon type="home" />
                <span>Dashboard</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Technology</span>
                <Link to="/technology" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="bank" />
                <span>Finance</span>
                <Link to="/finance" />
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="bulb" />
                <span>Energy</span>
                <Link to="/energy" />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="medicine-box" />
                <span>Health Care</span>
                <Link to="/healthCare" />
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="customer-service" />
                <span>Consumer Services</span>
                <Link to="/consumerServices" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: "100vh", overflow: "scroll" }}>
            <Affix offsetTop={1}>
              <Header
                style={{
                  background: "#fff",
                  padding: 0
                }}
              >
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  style={{ cursor: "pointer" }}
                  onClick={this.toggle}
                />
                Stock<b>Recommendation</b>
                {userAuth}
              </Header>
            </Affix>
            <Content
              style={{
                margin: "24px 16px 10px",
                paddingTop: 30,
                overflow: "initial"
              }}
            >
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/technology" component={Technology} />
                <PrivateRoute path="/finance" component={Finance} />
                <PrivateRoute path="/energy" component={Energy} />
                <PrivateRoute path="/healthCare" component={HealthCare} />
                <PrivateRoute
                  path="/consumerServices"
                  component={ConsumerServices}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
Main.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Main);
