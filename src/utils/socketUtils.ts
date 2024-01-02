import WebSocket from "ws";

import { wssAdmin } from "../ws.server";

import { messageFormat } from "../types";

export function broadcastToAdmin(data: messageFormat | null) {
  wssAdmin.clients.forEach((admin) => {
    if (admin.readyState === WebSocket.OPEN && data) {
      admin.send(JSON.stringify(data));
    }
  });
}
