import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./NotificationsFeed.scss";
import Loader from "../../components/loader/Loader";
import Notification from "./notification/Notification";
import DeleteNotificationsModal from "../Modals/NotificationModal/DeleteNotificationsModal";
import SC from "../../themes/styledComponents";
import {
  deleteNotification,
  fetchNotificationsFeed,
  updateNotificationStatus,
} from "../../helpers/apiCalls";

export default function NotificationsFeed({
  fetchNotifications,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);
  const [waitingOnLoad, setWaitingOnLoad] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  // set current page to "Notifications" on load
  useEffect(() => {
    setCurrentPage("Notifications");
  });

  const getNotifications = async () => {
    setTimeout(async function () {
      const res = await fetchNotificationsFeed(user._id);
      let seenFilter = res.filter((noti) => {
        return noti.seen === true;
      });
      setSeenNotifications(
        seenFilter.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      let newFilter = res.filter((noti) => {
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
            await updateNotificationStatus(notificationToUpdate._id);
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
        for (let notificationToDelete of deleteNotis) {
          await deleteNotification(notificationToDelete._id);
        }
      };

      const refreshNotifications = async () => {
        getNotifications();
      };

      deleteNotifcations()
        .then(() => refreshNotifications())
        .then(() => setShowDeleteModal(false));
    };
    deleteBatch();
  };

  const [deleteType, setDeleteType] = useState("");
  const handleDeleteModal = (type) => {
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const NewNotificationsFeed = () => {
    return (
      <div className="notifications-container">
        <SC.NotificationHeader
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
                <SC.SeenButton
                  className="notification-read-button desktop-button"
                  onClick={() => handleSeenStatus("new")}
                >
                  Mark all as seen
                </SC.SeenButton>
                <SC.DeleteButton
                  className="notification-delete-button desktop-button"
                  onClick={() => handleDeleteModal("new")}
                >
                  Delete all new
                </SC.DeleteButton>
                <SC.SeenButton
                  className="notification-read-button mobile-button"
                  onClick={() => handleSeenStatus("new")}
                >
                  All seen
                </SC.SeenButton>
                <SC.DeleteButton
                  className="notification-delete-button mobile-button"
                  onClick={() => handleDeleteModal("new")}
                >
                  Delete all
                </SC.DeleteButton>
              </div>
            )}
          </div>
        </SC.NotificationHeader>
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
        <SC.NotificationHeader className="notification-type-header">
          <div className="notification-type-header-wrapper">
            <span className="notification-type-header-title ">
              Seen {"("}
              {seenNotifications.length}
              {")"}
            </span>
            {seenNotifications.length > 0 && (
              <div className="notification-type-button-container">
                <SC.SeenButton
                  className="notification-read-button desktop-button"
                  onClick={() => handleSeenStatus("seen")}
                >
                  Mark all as new
                </SC.SeenButton>
                <SC.DeleteButton
                  className="notification-delete-button desktop-button"
                  onClick={() => handleDeleteModal("seen")}
                >
                  Delete all seen
                </SC.DeleteButton>
                <SC.SeenButton
                  className="notification-read-button mobile-button"
                  onClick={() => handleSeenStatus("seen")}
                >
                  All new
                </SC.SeenButton>
                <SC.DeleteButton
                  className="notification-delete-button mobile-button"
                  onClick={() => handleDeleteModal("seen")}
                >
                  Delete all
                </SC.DeleteButton>
              </div>
            )}
          </div>
        </SC.NotificationHeader>
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
    <SC.ScrollThumb
      className="notifications-feed-page"
      onClick={() => setSidebarOpen(false)}
    >
      <>
        {showDeleteModal && (
          <DeleteNotificationsModal
            handleDeleteBatch={handleDeleteBatch}
            setShowDeleteModal={setShowDeleteModal}
            deleteType={deleteType}
          />
        )}
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
              <div className="full-width-wrapper">
                <span className="no-notifications-message">
                  No notifications
                </span>
              </div>
            )}
          </>
        )}
      </>
    </SC.ScrollThumb>
  );
}
