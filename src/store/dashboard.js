import { create } from 'zustand';

export const useDashboardStore = create((set, get) => ({
  notifications: [],
  pushNotification: (notification) => set((state) => ({
    notifications: [...state.notifications.slice(-4), notification]
  })),
  clearNotifications: () => set({ notifications: [] }),
}));
