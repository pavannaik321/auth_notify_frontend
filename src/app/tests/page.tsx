"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";

type Test = {
  id: string;
  testName: string;
  startTime: string; // ISO string
  createdAt?: string;
};

export default function StudentTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const [now, setNow] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Firestore real-time listener
  useEffect(() => {
    const q = query(collection(db, "tests"), orderBy("startTime", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Test[] = snapshot.docs
        .map((doc) => {
          const raw: DocumentData = doc.data();
          return {
            id: doc.id,
            testName: raw.testName ?? "Untitled",
            startTime: raw.startTime?.toDate?.().toISOString() ?? new Date(0).toISOString(),
            createdAt: raw.createdAt?.toDate?.().toISOString(),
          };
        })
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

      setTests(data);
    });

    return () => unsub();
  }, []);

  const formatCountdown = (diffMs: number) => {
    if (diffMs <= 0) return "🟢 Test is Live!";

    const totalSeconds = Math.floor(diffMs / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");

    return `⏳ Starts in: ${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🧪 All Scheduled Tests</h2>

      {tests.length === 0 ? (
        <p className="text-center text-gray-500">No tests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {tests.map((test) => {
            const start = new Date(test.startTime);
            const diff = start.getTime() - now.getTime();

            return (
              <div
                key={test.id}
                className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {test.testName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Start Time: {start.toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 text-indigo-600 font-bold text-lg">
                  {formatCountdown(diff)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
