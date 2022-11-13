import * as signalR from "@microsoft/signalr";
import config from "src/configs";
import { AuthActions } from "src/store/auth/actions";
import { useDispatch } from "react-redux";
const baseName = process.env.REACT_APP_HUB_BASE;
export const useSignalR = () => {
  const hub = new signalR.HubConnectionBuilder();
  let connection;

  const setUpHub = (token) => {
    return hub
      .withUrl(`${baseName}/hub/notification`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug)
      .build();
  };
  const startHub = (token) => {
    if (!config.signalR) return;
    try {
      connection = setUpHub(token);
      connection
        .start()
        .then()
        .catch((err) => {
          // console.log('Error while starting connection' + err)
        });
    } catch (error) {
      // console.log("start the hub error", error)
    }

    connection.onclose((error) => {
      // console.log("connection closed")
      connect(connection);
    });
  };

  async function connect(conn) {
    if (!config.signalR) return;
    conn.start().catch((e) => {
      sleep(5000);
      // console.log("Reconnecting Socket");
      connect(conn);
    });
  }
  async function sleep(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }

  const closeHub = () => {
    if (connection) connection.stop();
  };

  const dispatch = useDispatch();
  const onReceiveNotify = () => {
    if (!config.signalR) return;
    connection.on("ReceiveMessage", (message) => {
      dispatch(AuthActions.updateToken(message));
      // dispatch(AuthActions.addNotification({ ...message, createdDate: new Date() }))
    });
  };
  return {
    startHub,
    onReceiveNotify,
    closeHub,
  };
};
