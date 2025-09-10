import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetConversationsQuery } from "../components/store/store/api/MessagingApi";

const ArticlesBought = () => {
  const navigate = useNavigate();
  const { data: conversations = [], isLoading } = useGetConversationsQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return conversations;
    const q = query.toLowerCase();
    return conversations.filter((c) => {
      const title = c.product?.name || "Direct chat";
      const last = c.last_message?.content || "";
      return title.toLowerCase().includes(q) || last.toLowerCase().includes(q);
    });
  }, [conversations, query]);

  return (
    <div className="my-conversations-page" style={{ padding: "16px" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>My Conversations</h2>
        <button
          onClick={() => navigate("/messages")}
          style={{ background: "#4f46e5", color: "white", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
        >
          Open Messages
        </button>
      </div>

      <div className="toolbar" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search conversations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: 6 }}
        />
      </div>

      {isLoading ? (
        <div>Loading conversations...</div>
      ) : filtered.length ? (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {filtered.map((c) => (
            <li
              key={c.id}
              onClick={() => navigate(`/messages/${c.id}`)}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{c.product ? c.product.name : "Direct chat"}</span>
                  {c.unread_count > 0 && (
                    <span style={{ background: "#ef4444", color: "white", borderRadius: 10, fontSize: 12, padding: "2px 6px" }}>
                      {c.unread_count} new
                    </span>
                  )}
                </div>
                <div style={{ color: "#666", fontSize: 13 }}>
                  {c.last_message ? (
                    <>
                      <span style={{ fontWeight: 500 }}>{c.last_message.sender?.first_name || c.last_message.sender?.username}</span>
                      <span>: {c.last_message.content}</span>
                    </>
                  ) : (
                    <span>No messages yet</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No conversations found.</div>
      )}
    </div>
  );
};

export default ArticlesBought;
