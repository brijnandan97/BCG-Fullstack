import { useState } from "react";
import { ConnectionContext } from "./connection-context";
import { notification } from "antd";

export const ConnectionContextProvider = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message = "", description = "") => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return (
    <ConnectionContext.Provider
      value={{ contextHolder, openNotificationWithIcon }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};
