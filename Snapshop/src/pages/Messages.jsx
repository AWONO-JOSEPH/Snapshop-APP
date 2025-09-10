import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetConversationsQuery,
  useGetConversationMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} from '../components/store/store/api/MessagingApi';
import '../PagesStyle/Messages.css';
import { FaEllipsisH, FaChevronLeft, FaSearch, FaPaperPlane, FaComments } from 'react-icons/fa';
import { useDeleteConversationMutation } from '../components/store/store/api/MessagingApi';

const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw)?.token?.user || null;
  } catch (_) {
    return null;
  }
};

export default function Messages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: conversations = [], isLoading: convLoading, refetch: refetchConvos } = useGetConversationsQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: conversationDetail, isLoading: detailLoading, refetch: refetchDetail } = useGetConversationMessagesQuery(id, {
    skip: !id,
    pollingInterval: id ? 3000 : 0,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteConversation] = useDeleteConversationMutation();
  const [text, setText] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);

  const currentUser = useMemo(() => getCurrentUser(), []);
  const currentUserId = currentUser?.id;

  useEffect(() => {
    // If no conversation selected, navigate to first one if available
    if (!id && conversations.length > 0) {
      navigate(`/messages/${conversations[0].id}`, { replace: true });
    }
  }, [id, conversations, navigate]);

  useEffect(() => {
    if (!conversationDetail || !conversationDetail.messages) return;
    // Mark unread messages from other users as read
    conversationDetail.messages.forEach((msg) => {
      if (!msg.read && msg.sender?.id !== currentUserId) {
        markAsRead({ id: msg.id });
      }
    });
  }, [conversationDetail, currentUserId, markAsRead]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [conversationDetail]);

  const filteredConversations = useMemo(() => {
    if (!search) return conversations;
    const term = search.toLowerCase();
    return conversations.filter((c) => {
      const title = c.product ? c.product.name : 'Direct chat';
      const lastSender = c.last_message?.sender?.first_name || c.last_message?.sender?.username || '';
      const lastContent = c.last_message?.content || '';
      return (
        String(title).toLowerCase().includes(term) ||
        String(lastSender).toLowerCase().includes(term) ||
        String(lastContent).toLowerCase().includes(term)
      );
    });
  }, [conversations, search]);

  const onSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || !id) return;
    
    setIsTyping(true);
    try {
      await sendMessage({ data: { conversation: id, content: trimmed } }).unwrap();
      setText('');
      // ensure thread and list are refreshed immediately
      refetchDetail();
      refetchConvos();
      requestAnimationFrame(() => {
        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
      });
    } catch (e) {
      console.error('Failed to send', e);
      alert('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  }, [text, id, sendMessage]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null);
    if (menuOpenId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenId]);

  useEffect(() => {
    const close = () => setChatMenuOpen(false);
    if (chatMenuOpen) {
      document.addEventListener('click', close);
      return () => document.removeEventListener('click', close);
    }
  }, [chatMenuOpen]);

  return (
    <div className="messages-layout">
      <aside className="messages-sidebar" aria-label="Conversations list">
        <div className="messages-sidebar-header">
          <div className="sidebar-title">
            <FaComments className="title-icon" />
            Conversations
          </div>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="sidebar-search"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search conversations"
            />
          </div>
        </div>
        {convLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <span>Loading conversations...</span>
          </div>
        ) : (
          <ul className="conversation-list">
            {filteredConversations.length ? (
              filteredConversations.map((c) => (
                <li key={c.id} className={`conversation-item ${c.id === id ? 'active' : ''}`}>
                  <Link to={`/messages/${c.id}`} className="conversation-link">
                    <div className="conversation-avatar">
                      {(c.product?.name || 'Direct chat').charAt(0).toUpperCase()}
                    </div>
                    <div className="conversation-content">
                      <div className="conversation-header">
                        <div className="title">
                          {c.product ? c.product.name : 'Direct chat'}
                        </div>
                        {c.unread_count > 0 && (
                          <span className="badge small pulse">{c.unread_count}</span>
                        )}
                      </div>
                      <div className="preview">
                        {c.last_message ? (
                          <>
                            <span className="sender">{c.last_message.sender?.first_name || c.last_message.sender?.username}</span>
                            <span className="snippet">: {c.last_message.content}</span>
                          </>
                        ) : (
                          <span className="empty">No messages yet</span>
                        )}
                      </div>
                      {c.last_message && (
                        <div className="timestamp">
                          {new Date(c.last_message.created_at).toLocaleDateString() === new Date().toLocaleDateString() 
                            ? new Date(c.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : new Date(c.last_message.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })
                          }
                        </div>
                      )}
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="thread-menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === c.id ? null : c.id);
                    }}
                    aria-label="Conversation menu"
                  >
                    <FaEllipsisH />
                  </button>
                  {menuOpenId === c.id && (
                    <div className="thread-menu-popover">
                      <button
                        type="button"
                        className="menu-item danger"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            await deleteConversation(c.id).unwrap();
                            setMenuOpenId(null);
                            if (id === c.id) {
                              const next = conversations.find((x) => x.id !== c.id);
                              navigate(next ? `/messages/${next.id}` : '/messages', { replace: true });
                            }
                          } catch (err) {
                            console.error('Delete failed', err);
                            alert('Failed to delete conversation');
                          }
                        }}
                      >
                        Delete conversation
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="empty-state">
                <FaComments className="empty-icon" />
                <span>No conversations{search ? ' match your search' : ''}</span>
              </li>
            )}
          </ul>
        )}
      </aside>

      <main className="messages-main">
        {!id ? (
          <div className="placeholder">
            <FaComments className="placeholder-icon" />
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the sidebar to start messaging</p>
          </div>
        ) : detailLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <span>Loading messages...</span>
          </div>
        ) : conversationDetail ? (
          <div className="chat">
            <div className="chat-header">
              <button className="back-button" onClick={() => navigate('/messages')} aria-label="Back to conversations">
                <FaChevronLeft />
              </button>
              <div className="chat-header-content">
                <div className="chat-avatar">
                  {(conversationDetail.product?.name || 'Direct chat').charAt(0).toUpperCase()}
                </div>
                <div className="chat-title">
                  {conversationDetail.product ? conversationDetail.product.name : 'Direct chat'}
                </div>
              </div>
              <div className="chat-header-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="chat-menu"
                  aria-label="Conversation menu"
                  onClick={() => setChatMenuOpen(!chatMenuOpen)}
                >
                  <FaEllipsisH />
                </button>
                {chatMenuOpen && (
                  <div className="chat-menu-popover">
                    <button
                      type="button"
                      className="menu-item danger"
                      onClick={async () => {
                        try {
                          await deleteConversation(id).unwrap();
                          setChatMenuOpen(false);
                          const next = conversations.find((x) => x.id !== id);
                          navigate(next ? `/messages/${next.id}` : '/messages', { replace: true });
                          refetchConvos();
                        } catch (err) {
                          console.error('Delete failed', err);
                          alert('Failed to delete conversation');
                        }
                      }}
                    >
                      Delete conversation
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="chat-messages" ref={chatMessagesRef} role="log" aria-live="polite">
              {conversationDetail.messages.map((msg, index) => {
                const isOwn = msg.sender?.id === currentUserId;
                const prevMsg = conversationDetail.messages[index - 1];
                const showSender = !prevMsg || prevMsg.sender?.id !== msg.sender?.id;
                
                return (
                  <div
                    key={msg.id}
                    className={`chat-message ${isOwn ? 'own' : ''} ${showSender ? 'first-in-group' : ''}`}
                    title={new Date(msg.created_at).toLocaleString()}
                  >
                    {showSender && !isOwn && (
                      <div className="message-avatar">
                        {(msg.sender?.first_name || msg.sender?.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="message-bubble">
                      {showSender && (
                        <div className="sender">
                          {isOwn ? 'You' : (msg.sender?.first_name || msg.sender?.username)}
                        </div>
                      )}
                      <div className="content">{msg.content}</div>
                      <div className="meta">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={isTyping}
              />
              <button 
                onClick={onSend} 
                disabled={!text.trim() || isTyping}
                className={`send-button ${text.trim() ? 'active' : ''}`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          <div className="placeholder error">
            <FaComments className="placeholder-icon" />
            <h3>Conversation not found</h3>
            <p>This conversation may have been deleted or doesn't exist</p>
          </div>
        )}
      </main>
    </div>
  );
}