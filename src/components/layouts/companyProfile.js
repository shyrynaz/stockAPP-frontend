import React, { Component } from "react";
import { List } from "antd";

class CompanyProfile extends Component {
  render() {
    const profile = Object.values(this.props.profileData);
    console.log(profile);
    return (
      <List
        size="small"
        header={<div>Company Profile</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={profile}
        renderItem={item => <List.Item>{item.companyName} </List.Item>}
      />
    );
  }
}

export default CompanyProfile;
