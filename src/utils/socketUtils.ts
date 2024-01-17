import WebSocket from "ws";

import { wssAdmin, playerSocket } from "../ws.server";

import {
  ADMIN_ACTION,
  ADMIN_GAME_ACTION,
  PLAYER_ACTION,
  bulkPlayerOnboarded,
  messageFormat,
  playerProfile,
} from "../types";

export function broadcastToAdmin<T>(data: messageFormat<T> | null) {
  wssAdmin.clients.forEach((admin) => {
    if (admin.readyState === WebSocket.OPEN && data) {
      admin.send(JSON.stringify(data));
    }
  });
}

export function sendPlayerListInBulKToAdmin<T>({
  adminSocket,
  message,
  onboardedPlayer,
}: {
  adminSocket: WebSocket;
  message: messageFormat<T>;
  onboardedPlayer: Map<WebSocket, playerProfile>;
}) {
  const { action, payload } = message;

  if (
    action === ADMIN_ACTION.adminOnboarding &&
    payload === "ok" &&
    onboardedPlayer.size > 0
  ) {
    const allOnboardedPlayers = Array.from(onboardedPlayer.values());
    const allOnboardedPlayerMessage: bulkPlayerOnboarded = {
      action: PLAYER_ACTION.bulkPlayerOnboarded,
      payload: allOnboardedPlayers,
    };

    adminSocket.send(JSON.stringify(allOnboardedPlayerMessage));
  }
}

export function sendGameActionToAdmin<T>({
  adminSocket,
  message,
}: {
  adminSocket: WebSocket;
  message: messageFormat<T>;
}) {
  const { action } = message;

  if (
    action === ADMIN_GAME_ACTION.PLAY_GAME ||
    action === ADMIN_GAME_ACTION.PAUSE_GAME ||
    action === ADMIN_GAME_ACTION.SKIP_QUESTION
  ) {
    adminSocket.send(JSON.stringify(message));
    playerSocket.clients.forEach((player) => {
      if (player.readyState === WebSocket.OPEN && message) {
        player.send(JSON.stringify(message));
      }
    });
  }
}
