import { Fragment } from "react";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
import { Label, FormFeedback } from "reactstrap";
import { Trans } from "@lingui/react";

const DatePicker = ({ label, filteredDate, setFilter, ...props }) => {
    const [flag, setFlag] = useState(false)
    const setFilterCheckDate = (val) => {
        if (!val) {
            setFlag(true)
            setFilter((prev) => ({ ...prev }))
        }
        setFilter((prev) => ({ ...prev, startDate: val }))
    }
    return (
        <Fragment>
            <Label for="fromDate">{label}</Label>
            <Flatpickr
                className={classnames("form-control", {
                    "is-invalid": flag,
                })}
                id="fromDate"
                onChange={(date) => {
                    setFilterCheckDate(date[0])
                }}
            />
            {flag && <FormFeedback>{<Trans id="plz_select_date" />}</FormFeedback>}
        </Fragment>

    );
}
export default DatePicker;