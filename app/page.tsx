"use client";
import Image from "next/image";
import { useState, type FormEvent } from "react";

type NotificationItem = {
  id: number;
  name: string;
  avatar: string;
  action: string;
  target?: string;
  targetType?: "post" | "group";
  unread: boolean;
  time: string;
  message?: string;
  preview?: string;
  reply?: string;
};

export default function Home() {
  const initial: NotificationItem[] = [
    { id: 1, name: "Mark Webber", avatar: "/images/avatar-mark-webber.webp", action: "reacted to your recent post", target: "My first tournament today!", targetType: "post", unread: true, time: "1m ago" },
    { id: 2, name: "Angela Gray", avatar: "/images/avatar-angela-gray.webp", action: "followed you", unread: true, time: "5m ago" },
    { id: 3, name: "Jacob Thompson", avatar: "/images/avatar-jacob-thompson.webp", action: "has joined your group", target: "Chess Club", targetType: "group", unread: true, time: "1 day ago" },
    { id: 4, name: "Rizky Hasanuddin", avatar: "/images/avatar-rizky-hasanuddin.webp", action: "sent you a private message", unread: false, time: "5 days ago", message: "Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game." },
    { id: 5, name: "Kimberly Smith", avatar: "/images/avatar-kimberly-smith.webp", action: "commented on your picture", unread: false, time: "1 week ago", preview: "/images/image-chess.webp" },
    { id: 6, name: "Nathan Peterson", avatar: "/images/avatar-nathan-peterson.webp", action: "reacted to your recent post", target: "5 end-game strategies to increase your win rate", targetType: "post", unread: false, time: "2 weeks ago" },
    { id: 7, name: "Anna Kim", avatar: "/images/avatar-anna-kim.webp", action: "left the group", target: "Chess Club", targetType: "group", unread: false, time: "2 weeks ago" },
  ];
  const [items, setItems] = useState<NotificationItem[]>(initial);
  const [replyItem, setReplyItem] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const unreadCount = items.filter((i) => i.unread).length;
  function markAllAsRead() {
    setItems(items.map((i) => ({ ...i, unread: false })));
  }
  function openReply(id: number) {
    setReplyItem(id);
  }
  function submitReply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (replyItem == null || !replyText.trim()) return;
    setItems(items.map((i) => (i.id === replyItem ? { ...i, reply: replyText.trim() } : i)));
    setReplyText("");
    setReplyItem(null);
  }

  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center px-4 font-sans">
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">Notifications</h1>
            <span className="px-2 py-0.5 rounded-md bg-blue-950 text-white text-sm font-extrabold">{unreadCount}</span>
          </div>
          <button onClick={markAllAsRead} className="text-gray-600 hover:text-blue-950">Mark all as read</button>
        </div>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className={`flex gap-4 rounded-lg p-4 ${item.unread ? "bg-blue-100" : ""}`}>
              <div className="h-10 w-10 aspect-square rounded-full overflow-hidden flex-shrink-0">
                <Image src={item.avatar} alt={item.name} width={40} height={40} sizes="40px" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-navy-950">
                  <span className="font-extrabold cursor-pointer hover:text-blue-950">{item.name}</span>{" "}
                  <span className="text-gray-600">{item.action}</span>{" "}
                  {item.target && (
                    <span className={`font-extrabold cursor-pointer ${item.targetType === "group" ? "text-blue-950" : "text-gray-600 hover:text-blue-950"}`}>{item.target}</span>
                  )}
                  {item.unread && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 align-middle" />}
                </p>
                <p className="text-gray-500 text-sm mt-1">{item.time}</p>
                {item.message && (
                  <button onClick={() => openReply(item.id)} className="mt-3 w-full text-left rounded-md border border-navy-100 bg-white p-4 text-gray-600 hover:bg-navy-50">{item.message}</button>
                )}
                {replyItem === item.id && (
                  <form onSubmit={submitReply} className="mt-3 flex items-center gap-2">
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-600 outline-none focus:border-blue-950" />
                    <button type="submit" className="rounded-md bg-blue-950 px-3 py-2 text-white text-sm">Send</button>
                  </form>
                )}
                {item.reply && (
                  <div className="mt-2 rounded-md bg-blue-100 p-3 text-gray-600">{item.reply}</div>
                )}
              </div>
              {item.preview && (
                <button onClick={() => openReply(item.id)} className="ml-auto rounded-md overflow-hidden">
                  <Image src={item.preview} alt="Chess preview" width={40} height={40} sizes="40px" className="h-10 w-10 object-cover" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
