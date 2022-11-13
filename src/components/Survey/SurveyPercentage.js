import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const SurveyPercentage = ({
  labels = ["Total", "Correct", "Wrong"],
  series = [0, 0, 0],
  total,
}) => {
  var options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 10;
            },
          },
        },
      },
    },
    labels: labels,
  };

  return <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
     

};
export default SurveyPercentage;
