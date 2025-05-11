import {
  UPDATE_CURRENT_HOTEL,
  UPDATE_ROOM_DATA,
  UPDATE_USER_DATA,
} from './actionType';
export function AppReducer(state, action) {
  switch (action.type) {
    case UPDATE_CURRENT_HOTEL:
      return {
        ...state,
        currentHotelData: action.currentHotelData,
      };
    case UPDATE_ROOM_DATA:
      return {
        ...state,
        currentRoomData: action.currentRoomData,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        currentUserData: action.currentUserData,
      };

    default:
      return state;
  }
}
export default AppReducer;
