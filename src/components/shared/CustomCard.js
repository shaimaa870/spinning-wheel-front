import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip,
} from "reactstrap";
import { Trans } from "@lingui/react";
import { ChevronLeft } from "react-feather";
import { DatePickerField, SelectField } from "src/components";

function CustomCard({
  title,
  showBackButton = true,
  cardHeaderToolbar,
  body,
  backUrl = "",
}) {
  let history = useHistory();
  return (
    <Card>
      <CardHeader className="border-bottom mb-2">
        <CardTitle className=" d-flex align-items-center">
          {showBackButton && (
            <>
              <Button.Ripple
                id="back"
                size="sm"
                color="flat-secondary"
                className="btn-icon"
                onClick={() => {
                  backUrl ? history.push(backUrl) : history.goBack();
                }}
              >
                <ChevronLeft size={18} />
              </Button.Ripple>
              <UncontrolledTooltip placement="top" target="back">
                <Trans id="back" />
              </UncontrolledTooltip>
            </>
          )}
          <span className="mx-1">{title}</span>
        </CardTitle>
        {cardHeaderToolbar}
      </CardHeader>

     {body&& <CardBody>{body}</CardBody>}
    </Card>
  );
}

export default CustomCard;
