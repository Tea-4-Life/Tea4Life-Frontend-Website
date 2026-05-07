import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { postDriverLocationApi } from "@/services/orderApi";

export default function DriverLocationTracker({
  orderId,
  onLocationUpdate,
}: {
  orderId: string;
  onLocationUpdate?: (location: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  }) => void;
}) {
  const [lastPosition, setLastPosition] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const sendPosition = async (pos: GeolocationPosition) => {
    const payload = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
    };

    if (!mountedRef.current) return;

    setLastPosition(payload);
    onLocationUpdate?.(payload);

    try {
      setSending(true);
      await postDriverLocationApi(orderId, payload);
      if (mountedRef.current) {
        setPermissionError(null);
      }
    } catch (err) {
      console.error("Failed to post driver location", err);
    } finally {
      if (mountedRef.current) {
        setSending(false);
      }
    }
  };

  const captureAndSend = () => {
    if (!navigator.geolocation) {
      if (mountedRef.current) {
        setPermissionError("Trình duyệt không hỗ trợ định vị.");
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => sendPosition(pos),
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Cần cấp quyền vị trí để theo dõi shipper."
            : "Không thể lấy vị trí hiện tại.";
        if (mountedRef.current) {
          setPermissionError(message);
        }
        console.error("geolocation error", err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  useEffect(() => {
    mountedRef.current = true;
    captureAndSend();
    intervalRef.current = window.setInterval(captureAndSend, 1 * 60 * 1000);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [orderId]);

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
            Vị trí shipper
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống tự động lấy vị trí mỗi 1 phút cho tới khi bạn xác nhận đã
            giao hàng.
          </p>
        </div>
        {sending && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
      </div>

      {lastPosition && (
        <div className="text-xs text-slate-600">
          Vị trí gần nhất: {lastPosition.latitude.toFixed(6)},{" "}
          {lastPosition.longitude.toFixed(6)} (±
          {Math.round(lastPosition.accuracy || 0)}m)
        </div>
      )}

      {permissionError && (
        <div className="rounded-2xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {permissionError}
        </div>
      )}
    </div>
  );
}
