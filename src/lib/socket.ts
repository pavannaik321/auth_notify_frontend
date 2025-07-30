import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    path: "/socket.io",
    transports: ["websocket"],
    auth: { token },
  });

  socket.on("connect", () => console.log("✅ WebSocket connected"));
  socket.on("disconnect", () => console.log("🔌 WebSocket disconnected"));
  socket.on("notification", (data) => {
    console.log("🔔 Notification received:", data);
    toast.success(data.message, {
      icon: "📢",
      duration: 6000,
      className: "animate-bounce duration-700"
    });
  });
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};