import React, { Component } from "react";
// import Moment from "react-moment";
import moment from "moment";
import { Chart, Tooltip, Axis, Line, Point, Legend } from "viser-react";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  BarChart,
  Resizable
} from "react-timeseries-charts";
import {
  Collection,
  TimeSeries,
  TimeEvent,
  IndexedEvent,
  TimeRange
} from "pondjs";

class ChartDisplay extends Component {
  constructor() {
    super();
    this.state = {
      mode: "log",
      timerange: new TimeRange([1553374800000, 1556053200000])
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("props recieved:", nextProps);
  }
  handleTimeRangeChange = timerange => {
    this.setState({ timerange });
  };

  setModeLinear = () => {
    this.setState({ mode: "linear" });
  };

  setModeLog = () => {
    this.setState({ mode: "log" });
  };
  renderDayChart() {
    const chartData = this.props.chartData;
    const scale = chartData.map(item => {
      return [{ dataKey: item.vwap, min: 0 }, { dataKey: item.label, min: 0 }];
    });

    const data = chartData.map(item => {
      return { label: item.label, price: item.vwap };
    });

    return (
      <Chart forceFit height={400} data={data} scale={scale}>
        <Tooltip />
        <Axis />
        <Legend />
        <Line position="label*price" />
        <Point position="label*price" shape="circle" />
      </Chart>
    );
  }
  renderChart() {
    const chartData = this.props.chartData;
    const name = "Stock";
    const columns = ["time", "open", "close", "low", "high"];
    const events = chartData.map(item => {
      const timestamp = moment(new Date(item.date));
      const { open, close, low, high } = item;
      return new TimeEvent(timestamp.toDate(), {
        open: +open,
        close: +close,
        low: +low,
        high: +high
      });
    });
    const collection = new Collection(events);
    const sortedCollection = collection.sortByTime();
    const series = new TimeSeries({
      name,
      columns,
      collection: sortedCollection
    });

    const volumeEvents = chartData.map(item => {
      const index = item.date.replace(/\//g, "-");
      const { volume } = item;
      return new IndexedEvent(index, { volume: +volume });
    });
    const volumeCollection = new Collection(volumeEvents);
    const sortedVolumeCollection = volumeCollection.sortByTime();

    const seriesVolume = new TimeSeries({
      name: "Stock",
      utc: false,
      collection: sortedVolumeCollection
    });

    const { timerange } = this.state;
    const croppedSeries = series.crop(timerange);
    const croppedVolumeSeries = seriesVolume.crop(timerange);

    return (
      <ChartContainer
        timeRange={timerange}
        hideWeekends={true}
        enablePanZoom={true}
        onTimeRangeChanged={this.handleTimeRangeChange}
        timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
      >
        <ChartRow height="300">
          <Charts>
            <LineChart
              axis="y"
              style={{ close: { normal: { stroke: "blue" } } }}
              columns={["close"]}
              series={croppedSeries}
              interpolation="curveBasis"
            />
          </Charts>
          <YAxis
            id="y"
            label="Price ($)"
            min={croppedSeries.min("close")}
            max={croppedSeries.max("close")}
            format=",.0f"
            width="60"
            type={this.state.mode}
          />
        </ChartRow>
        <ChartRow height="200" axisMargin={0}>
          <Charts>
            <BarChart
              axis="y"
              style={{ volume: { normal: { stroke: "blue" } } }}
              columns={["volume"]}
              series={croppedVolumeSeries}
            />
          </Charts>
          <YAxis
            id="y"
            label="Volume"
            min={croppedVolumeSeries.min("volume")}
            max={croppedVolumeSeries.max("volume")}
            width="60"
          />
        </ChartRow>
      </ChartContainer>
    );
  }
  render() {
    const linkStyle = {
      fontWeight: 600,
      color: "grey",
      cursor: "default"
    };

    const linkStyleActive = {
      color: "steelblue",
      cursor: "pointer"
    };
    return (
      <div>
        <div className="section-devider" style={{ textAlign: "center" }}>
          <h6>Stock price</h6>
        </div>

        <div>{this.renderDayChart()}</div>
        {/* <div>
          <div className="row">
            <div className="col-md-12">
              <h6>Stock price</h6>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-12" style={{ fontSize: 14, color: "#777" }}>
              <span
                style={this.state.mode === "log" ? linkStyleActive : linkStyle}
                onClick={this.setModeLinear}
              >
                Linear
              </span>
              <span> | </span>
              <span
                style={
                  this.state.mode === "linear" ? linkStyleActive : linkStyle
                }
                onClick={this.setModeLog}
              >
                Log
              </span>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-12">
              <Resizable>{this.renderChart()}</Resizable>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ChartDisplay;
