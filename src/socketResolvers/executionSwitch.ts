// import { ADMIN_ACTION, GAME_COUNT_DOWN, ADMIN_GAME_ACTION } from "../types";
// import {
//   sendGameActionToAdmin,
//   sendPlayerListInBulKToAdmin,
//   broadcastGameCountdown,
// } from "../utils/socketUtils";

// const executionSwitch = ({ adminSocket, message, onboardedPlayer }) => {
//   const { action } = message;

//   switch (action) {
//     case ADMIN_ACTION.adminOnboarding:
//       sendPlayerListInBulKToAdmin({
//         adminSocket,
//         message,
//         onboardedPlayer,
//       });
//     case action === ADMIN_GAME_ACTION.PLAY_GAME ||
//       action === ADMIN_GAME_ACTION.PAUSE_GAME ||
//       action === ADMIN_GAME_ACTION.SKIP_QUESTION:
//       sendGameActionToAdmin({ adminSocket, message });
//     case GAME_COUNT_DOWN.START:
//       broadcastGameCountdown({ adminSocket, message });
//   }
// };

// export default executionSwitch;
