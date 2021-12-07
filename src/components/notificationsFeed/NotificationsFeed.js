import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./NotificationsFeed.scss";
import Loader from "../../components/loader/Loader";
import Notification from "./notification/Notification";

export default function NotificationsFeed({
  fetchNotifications,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);
  const [waitingOnLoad, setWaitingOnLoad] = useState(true);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  setCurrentPage("Notifications");

  const getNotifications = async () => {
    setTimeout(async function () {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/notifications/${user._id}`
        // `http://localhost:3000/api/notifications/${user._id}`
      );
      let seenFilter = res.data.filter((noti) => {
        return noti.seen === true;
      });
      setSeenNotifications(
        seenFilter.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      let newFilter = res.data.filter((noti) => {
        return noti.seen === false;
      });
      setNewNotifications(
        newFilter.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      fetchNotifications();
      setWaitingOnLoad(false);
    }, 1000);
    setLoading(false);
  };

  useEffect(() => {
    getNotifications();
  }, [user._id]);

  const handleSeenStatus = async (status) => {
    const getReadStatus = async () => {
      let updateNotis;
      if (status === "seen") {
        updateNotis = seenNotifications;
      } else {
        updateNotis = newNotifications;
      }
      const updateNotifications = async () => {
        await Promise.all(
          updateNotis.map(async (notificationToUpdate) => {
            await axios.put(
              `https://radiant-oasis-77477.herokuapp.com/api/notifications/${notificationToUpdate._id}`
              // `http://localhost:3000/api/notifications/${notificationToUpdate._id}`
            );
          })
        );
      };

      const refreshNotifications = async () => {
        getNotifications();
      };

      updateNotifications().then(() => refreshNotifications());
    };
    getReadStatus();
    getNotifications();
  };

  const handleDeleteBatch = async (status) => {
    const deleteBatch = async () => {
      let deleteNotis;
      if (status === "seen") {
        deleteNotis = seenNotifications;
      } else {
        deleteNotis = newNotifications;
      }

      const deleteNotifcations = async () => {
        await Promise.all(
          deleteNotis.map(async (notificationToDelete) => {
            await axios.delete(
              `https://radiant-oasis-77477.herokuapp.com/api/notifications/${notificationToDelete._id}`
              // `http://localhost:3000/api/notifications/${notificationToDelete._id}`
            );
          })
        );
      };

      const refreshNotifications = async () => {
        getNotifications();
      };

      deleteNotifcations().then(() => refreshNotifications());
    };
    deleteBatch();
  };

  const NewNotificationsFeed = () => {
    return (
      <div
        className="notifications-container"
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="notification-type-header"
          style={sidebarOpen ? { pointerEvents: "none" } : {}}
        >
          <div className="notification-type-header-wrapper">
            <span className="notification-type-header-title">
              New {"("}
              {newNotifications.length}
              {")"}
            </span>
            {newNotifications.length > 0 && (
              <div className="notification-type-button-container">
                <button
                  className="notification-read-button desktop-button"
                  onClick={() => handleSeenStatus("new")}
                >
                  Mark all as seen
                </button>
                <button
                  className="notification-delete-button desktop-button"
                  onClick={() => handleDeleteBatch("new")}
                >
                  Delete all new
                </button>
                <button
                  className="notification-read-button mobile-button"
                  onClick={() => handleSeenStatus("new")}
                >
                  All seen
                </button>
                <button
                  className="notification-delete-button mobile-button"
                  onClick={() => handleDeleteBatch("new")}
                >
                  Delete all
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="notifications-holder"
          style={sidebarOpen ? { pointerEvents: "none" } : {}}
        >
          {newNotifications.length > 0 ? (
            newNotifications.map((notification) => (
              <Notification
                notification={notification}
                key={notification._id}
                status="new"
                getNotifications={getNotifications}
              />
            ))
          ) : (
            <div className="full-width-wrapper">
              <span className="no-notifications-message">
                No new notifications
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SeenNotificationsFeed = () => {
    return (
      <div className="notifications-container">
        <div className="notification-type-header">
          <div className="notification-type-header-wrapper">
            <span className="notification-type-header-title ">
              Seen {"("}
              {seenNotifications.length}
              {")"}
            </span>
            {seenNotifications.length > 0 && (
              <div className="notification-type-button-container">
                <button
                  className="notification-read-button desktop-button"
                  onClick={() => handleSeenStatus("seen")}
                >
                  All new
                </button>
                <button
                  className="notification-delete-button desktop-button"
                  onClick={() => handleDeleteBatch("seen")}
                >
                  Delete all
                </button>
                <button
                  className="notification-read-button mobile-button"
                  onClick={() => handleSeenStatus("seen")}
                >
                  All new
                </button>
                <button
                  className="notification-delete-button mobile-button"
                  onClick={() => handleDeleteBatch("seen")}
                >
                  Delete all
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="notifications-holder">
          {seenNotifications.length > 0 ? (
            seenNotifications.map((notification) => (
              <Notification
                notification={notification}
                key={notification._id}
                status="seen"
                getNotifications={getNotifications}
              />
            ))
          ) : (
            <div className="full-width-wrapper">
              <span className="no-notifications-message">
                No seen notifications
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="notifications-feed-page">
      <>
        {loading ? (
          <Loader type={"full-screen"} />
        ) : (
          <>
            {seenNotifications.length + newNotifications.length > 0 ? (
              <>
                <NewNotificationsFeed />
                <SeenNotificationsFeed />
              </>
            ) : waitingOnLoad ? (
              <Loader type={"full-screen"} />
            ) : (
              <span className="no-notifications-message">No notifications</span>
            )}
          </>
        )}
      </>
    </div>
  );
}
