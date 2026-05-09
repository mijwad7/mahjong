import { useSelector, useDispatch } from 'react-redux';
import {
  setDealing,
  toggleHistory,
  openModal,
  closeModal,
  setPendingBet,
  setLastRoundResult,
} from '../game/state/uiSlice';

/**
 * useUI — provides UI state and action dispatchers.
 * Keeps component code free of raw dispatch calls.
 */
export function useUI() {
  const dispatch = useDispatch();
  const ui = useSelector((s) => s.ui);

  return {
    // state
    isDealing: ui.isDealing,
    showHistory: ui.showHistory,
    pendingBet: ui.pendingBet,
    lastRoundResult: ui.lastRoundResult,
    activeModal: ui.activeModal,

    // actions
    startDealing: () => dispatch(setDealing(true)),
    stopDealing: () => dispatch(setDealing(false)),
    toggleHistory: () => dispatch(toggleHistory()),
    openModal: (name) => dispatch(openModal(name)),
    closeModal: () => dispatch(closeModal()),
    setPendingBet: (bet) => dispatch(setPendingBet(bet)),
    setLastRoundResult: (result) => dispatch(setLastRoundResult(result)),
  };
}
