// ** React Imports
import { useEffect } from "react";

// ** Third Party Components
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import { InputField, SelectField } from "src/components";
import CustomCard from "src/components/shared/CustomCard";
import { FormAlert } from "src/components/form/FormAlert";
import { Trans, useLingui } from "@lingui/react";
import transactionActions from "src/store/transaction/actions";
import moment from "moment";

const Details = ({
  match: {
    params: { id: TranactionId },
  },
}) => {
  const { i18n } = useLingui();
  const dispatch = useDispatch();
  const { getTransactionWithId, resetDialog, showDialog } = transactionActions;
  const details={pruduct:"pppppppp",balance:555555,result:"done"}

  const {
    transaction,
    transactions_loading,
  } = useSelector((state) => state.transaction);
  useEffect(() => {
    dispatch(getTransactionWithId(TranactionId))
  }, []);

  const initialValues = (transaction) => {
    return {
      transactionDirection: transaction?.transactionDirection || "",
      total: transaction?.total || 0,
      balance: transaction?.balance || "",
      date: transaction ? moment(transaction.date).format("LL") : "",
      status: transaction?.status || "",
      createdBy: transaction?.createdBy || "",
    };
  };

  const validationSchema = yup.object().shape({});

  // ** Function to handle form submit
  const handleDecision = (status) => { }

  // console.log("dddd",JSON.parse(transaction?.details[0].extraData ));
  return (
    <CustomCard
      title={<Trans id="transaction_details" />}
      cardHeaderToolbar={
        <></>
      }
      body={
        <Formik
          enableReinitialize={true}
          initialValues={initialValues(transaction)}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values, errors }) => {
            // console.log(values);
            return (
              <Form autoComplete="nope">
                <Row>
                  <Col lg="9" sm="12">
                    <Row>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="transactionDirection" />}
                          name="transactionDirection"
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="created_by" />}
                          name="createdBy"
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="total" />}
                          name="total"
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="balance" />}
                          name="balance"
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="date" />}
                          name="date"
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <InputField
                          readOnly
                          label={<Trans id="status" />}
                          name="status"
                        />
                      </Col>
                      <Col lg="12">
                        <h5> details</h5>
                        {transaction?.details && transaction?.details.map((d) => {
                          const keys=d?.extraData? Object.keys(JSON.parse(d?.extraData)):[]
                          //const keys=Object.keys(details)
                          //console.log("kkk",keys);

                          return (
                            <div key={d?.id} className="border border-secondary rounded p-2">
                             {keys?.length>0&&keys?.map((k,i)=> <FormGroup key={i}>
                                <Label className="form-label">
                                  <Trans id={k} />
                                </Label>
                                {/* <Input type="text" readOnly value={details[k]} /> */}

                                <Input type="text" readOnly value={JSON.parse(d?.extraData)[k]} />
                              </FormGroup>
                              )}
                              <FormGroup>
                                <Label className="form-label">
                                  <Trans id="status" />
                                </Label>
                                <Input type="text" readOnly value={d?.status} />
                              </FormGroup>
                              {/* <FormGroup>
                                <Label className="form-label">
                                  <Trans id="voucherId" />
                                </Label>
                                <Input type="text" readOnly value={d?.voucherId} />
                              </FormGroup> */}
                            </div>
                          )
                        })}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
};
export default Details;
