import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Statistic, Icon, Table, Carousel, Tag } from "antd";
import "antd/dist/antd.css";
import {
  getStocks,
  getSectorPerformance,
  getGainers,
  getLosers
} from "../../actions/companyActions";

const gridStyle = {
  width: "50%",
  textAlign: "center",
  padding: 1
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.getStocks();
    this.props.getSectorPerformance();
    this.props.getGainers();
    this.props.getLosers();
  }
  render() {
    const data = this.props.stockData;
    return (
      <div>
        <div className="wrapper">
          {data &&
            data.map((company, index) => {
              return (
                <div key={index}>
                  <Card
                    style={{ marginBottom: 10 }}
                    title={company.companyName}
                    extra={
                      company.changePercent < 0 ? (
                        <Tag color="red">{company.changePercent}</Tag>
                      ) : (
                        <Tag color="green">{company.changePercent}</Tag>
                      )
                    }
                  >
                    <Card.Grid style={gridStyle}>
                      <Statistic
                        title="high"
                        value={company.high}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<Icon type="arrow-up" />}
                      />
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <Statistic
                        title="low"
                        value={company.low}
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<Icon type="arrow-down" />}
                      />
                    </Card.Grid>
                  </Card>
                </div>
              );
            })}
        </div>
        <div>{this.renderSectorPerformance()}</div>
        <div>{this.renderGainersAndLosers()}</div>
      </div>
    );
  }
  renderSectorPerformance() {
    const sectorData = this.props.sectorPerformance;

    const sectorPerformance =
      sectorData &&
      sectorData.map(item => {
        if (item.performance < 0) {
          return (
            <div style={{ backgroundColor: "blue" }}>
              <h7>{item.name}</h7>{" "}
              <p>
                <Tag color="red">{item.performance}</Tag>
              </p>
            </div>
          );
        } else {
          return (
            <div style={{ backgroundColor: "blue" }}>
              <h7>{item.name}</h7>{" "}
              <p>
                <Tag color="green">{item.performance}</Tag>
              </p>
            </div>
          );
        }
      });

    return (
      <div>
        <h6 className="section-devider">Sector Performance</h6>
        <Carousel title={<h6>sectorPerformance</h6>} autoplay>
          {sectorPerformance}
        </Carousel>
      </div>
    );
  }

  renderGainersAndLosers() {
    const gainers = this.props.gainersList;
    const losers = this.props.losersList;

    const columns = [
      { title: "Name", dataIndex: "companyName", key: "companyName" },
      { title: "Symbol", dataIndex: "symbol", key: "symbol" },
      {
        title: "Latest Price",
        dataIndex: "latestPrice",
        key: "latestPrice"
      },
      {
        title: "changePercent",
        dataIndex: "changePercent",
        key: "changePercent"
      }
    ];

    return (
      <div>
        <Table
          dataSource={gainers}
          columns={columns}
          bordered
          size="middle"
          title={() => <b>Gainers</b>}
        />
        <Table
          dataSource={losers}
          columns={columns}
          bordered
          size="middle"
          title={() => <b>Losers</b>}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  stockData: state.company.stocks,
  sectorPerformance: state.company.sector,
  gainersList: state.company.gainers,
  losersList: state.company.losers
});

export default connect(
  mapStateToProps,
  { getSectorPerformance, getStocks, getGainers, getLosers }
)(Dashboard);
