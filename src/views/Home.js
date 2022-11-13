import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  CardLink,
  Form,
  Button,
  Row,
  Col,
  Media,
} from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import UiBlocker from "src/components/shared/UiBlocker";
import { useLanguage } from "src/utility/hooks/useLanguage";
import { useLingui } from "@lingui/react";

const Home = () => {
  const { i18n } = useLingui();
  const { locale } = useLanguage();
  const [filter, setFilter] = useState({});
  const { colors } = useContext(ThemeColors);
  return (
    <div>

    </div>
  );
};

export default Home;

const ChartCard = ({ body, footer, loading = false }) => (
  <Card>
    <UiBlocker loading={loading}>
      <CardBody>{body}</CardBody>
      <CardFooter>{footer}</CardFooter>
    </UiBlocker>
  </Card>
);

