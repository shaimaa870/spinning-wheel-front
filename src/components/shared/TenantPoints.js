import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import transactionWalletActions from "src/store/scibWallet/actions";
import { Alert, Button } from "reactstrap";
import { Trans } from "@lingui/react";
const TenantPoints = ({tenantId}) => {
  const dispatch = useDispatch();

  const { points ,updatedPoints} = useSelector((state) => state.scibWalletTransactions);
  const { getPoints } = transactionWalletActions;
  useEffect(() => {
   dispatch(getPoints(tenantId));
  }, [updatedPoints]);

  return (
    <>
      <Alert color="warning p-1 ">
        <div>
          <Trans id="points" /> :<span className="mx-1">{points}</span>
        </div>
      </Alert>
    </>
  );
};
export default TenantPoints;
