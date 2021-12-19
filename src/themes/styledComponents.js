import styled from "styled-components";

const SC = {
  // ---------- APP.JS ----------
  ContentContainer: styled.div`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    };
    background-image:${(props) =>
      props.theme.colors.backgroundGradient} !important;
    };
  `,
  ScrollThumb: styled.div`
    ::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.colors.scrollThumbColor} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.primaryColorFaded} !important;
      }
    }
  `,
  ModalWrapper: styled.div`
  background-color: ${(props) =>
    props.theme.colors.modalWrapperBackgroundColor} !important;
  };
  `,
  ModalWrapperDark: styled.div`
  background-color: ${(props) =>
    props.theme.colors.darkModalWrapperBackgroundColor} !important;
  };
  `,

  // ---------- SIDEBAR, FOOTER, NAV ----------
  Sidebar: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
    @media (min-height: 421px) {
      @media (max-width: 768px) {
        background-color: ${(props) =>
          props.theme.colors.sidebarColorMobile} !important;
      }
    }
  `,
  NavFooter: styled.div`
    background-color: ${(props) => props.theme.colors.navbarColor} !important;
  `,
  NotificationBadge: styled.div`
    background-color: ${(props) => props.theme.colors.primaryColor} !important;
    border-color: ${(props) => props.theme.colors.sidebarColor} !important;
  `,
  NotificationBadgeCount: styled.span`
    color: ${(props) => props.theme.colors.notificationCountColor} !important;
    font-size: 10px !important;
  `,
  ShareButton: styled.div`
    background-color: ${(props) =>
      props.theme.colors.primaryColorFaded} !important;
    color: ${(props) => props.theme.colors.primaryColorContrastText} !important;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &.active-share-link {
      color: ${(props) => props.theme.colors.textWhite} !important;
      border-left: solid 4px ${(props) => props.theme.colors.primaryColor} !important;
      background-color: transparent !important;
    }
    @media (max-height: 420px) {
      @media (min-width: 600px) and (max-width: 820px) {
        background-color: ${(props) =>
          props.theme.colors.primaryColor} !important;
      }
    }
  `,
  SidebarLogoTop: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
    @media (min-height: 421px) {
      @media (max-width: 768px) {
        background-color: transparent !important;
      }
    }
  `,
  SidebarLink: styled.div`
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.formInputColor} !important;
    }
    &.active-nav-link {
      border-left: solid 4px ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  SidebarButton: styled.button`
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.formInputColor} !important;
    }
    &.active-nav-link {
      border-left: solid 4px ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  PersonalInfoContainer: styled.span`
    color: ${(props) => props.theme.colors.fadedButtonColor} !important;
    &:hover {
      .made-by {
        color: ${(props) => props.theme.colors.textWhite} !important;
      }
    }
  `,
  MadeBy: styled.span`
    color: ${(props) => props.theme.colors.fadedButtonColor} !important;
    &:hover {
      color: ${(props) => props.theme.colors.textWhite} !important;
    }
  `,
  GitHubA: styled.a`
    color: ${(props) => props.theme.colors.fadedButtonColor} !important;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  Navbar: styled.div`
    background-color: ${(props) => props.theme.colors.navbarColor} !important;
  `,
  Hamburger: styled.div`
    color: ${(props) => props.theme.colors.textWhite} !important;
    &.active {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  ModalSaveButton: styled.button`
    color: ${(props) => props.theme.colors.textWhite} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &:hover {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    display: flex;
  `,
  ModalCancelButton: styled.button`
    color: ${(props) => props.theme.colors.textWhite} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &:hover {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    display: flex;
  `,

  // ---------- PROFILE ----------
  AvatarContainer: styled.div`
    border-color: ${(props) => props.theme.colors.navbarColor} !important;
    background-color: ${(props) => props.theme.colors.navbarColor} !important;
  `,
  ProfileInfoContainer: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    background-image: ${(props) =>
      props.theme.colors.containerBackgroundGradient} !important;
  `,
  ProfileImagesContainer: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
  `,
  ProfileHeader: styled.div`
    background-color: ${(props) => props.theme.colors.navbarColor} !important;
  `,
  ProfileNavButton: styled.button`
    background-color: transparent !important;
    border-color: ${(props) => props.theme.colors.borderColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.formInputColor} !important;
      border-color: ${(props) =>
        props.theme.colors.primaryColorFaded} !important;
    }
    &.pic-active {
      background-color: ${(props) =>
        props.theme.colors.sidebarColor} !important;
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  ProfileNavButtonText: styled.span`
    color: ${(props) => props.theme.colors.fadedTextColor} !important;
  `,
  ProfileNavButtonCount: styled.span`
    color: ${(props) => props.theme.colors.textWhite} !important;
  `,
  ProfileNavButtonIcon: styled.span`
    color: ${(props) => props.theme.colors.profileNavIconColor} !important;
    height: 24px;
    &.icon-active {
      color: ${(props) =>
        props.theme.colors.profileNavIconColorActive} !important;
    }
  `,
  ProfileEditButtonIcon: styled.span`
    color: ${(props) => props.theme.colors.textWhite} !important;
    &:hover {
      color: ${(props) =>
        props.theme.colors.profileNavIconColorActive} !important;
    }
    height: 24px;
  `,
  ProfileCoverEditButtonIcon: styled.span`
    background-color: ${(props) =>
      props.theme.colors.formInputFocusColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.profileNavIconColorActive} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
    }
    height: 24px;
  `,
  ProfileModalMessageContainer: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
  `,
  ProfileModalContainer: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
    box-shadow: 0px 0px 10px 4px ${(props) => props.theme.colors.postGlow} !important;
  `,
  ProfileModalButton: styled.div`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.formInputFocusColor} !important;
    }
  `,
  ProfileModalButtonIcon: styled.div`
    color: ${(props) => props.theme.colors.primaryColor} !important;
    height: 24px;
  `,
  ProfileModalFileIcon: styled.div`
    color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    height: 20px;
  `,
  ProfileImageSaveButton: styled.button`
    color: ${(props) => props.theme.colors.textWhite} !important;
    border-color: ${(props) => props.theme.colors.primaryColor} !important;
    background-color: transparent !important;
    &:hover {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &:focus {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    display: flex;
    &.invalid-save-button {
      color: ${(props) => props.theme.colors.fadedButtonColor} !important;
      border-color: ${(props) =>
        props.theme.colors.fadedButtonColor} !important;
      &:hover {
        color: ${(props) => props.theme.colors.fadedButtonColor} !important;
        background-color: transparent !important;
        border-color: ${(props) =>
          props.theme.colors.fadedButtonColor} !important;
      }
    }
  `,
  ProfileNoContent: styled.span`
    color: ${(props) => props.theme.colors.fadedButtonColor} !important;
    border-color: ${(props) => props.theme.colors.fadedButtonColor} !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 30px;
    font-size: 24px;
    font-weight: 500;
    @media (min-height: 421px) {
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  `,
  ProfileLink: styled.a`
    color: ${(props) => props.theme.colors.textWhite} !important;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  AvatarImageModal: styled.div`
    box-shadow: 0px 0px 10px 4px ${(props) => props.theme.colors.shareGlow} !important;
  `,

  // ---------- UPDATE PROFILE ----------
  UpdateProfileContainer: styled.div`
    border-color: ${(props) => props.theme.colors.primaryColor} !important;
  `,
  UpdateProfileInput: styled.input`
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  UpdateProfileTextarea: styled.textarea`
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,

  // ---------- POSTS, COMMENTS ----------
  PostUpper: styled.div`
    background-color: ${(props) =>
      props.theme.colors.postBackgroundColor} !important;
    color: ${(props) => props.theme.colors.postTextColor} !important;
  `,
  PostUpperLikesPage: styled.div`
    background-color: ${(props) =>
      props.theme.colors.postBackgroundColor} !important;
    box-shadow: 0px 0px 10px 4px ${(props) => props.theme.colors.postGlow} !important;
  `,
  PostContainer: styled.div`
    background-color: ${(props) =>
      props.theme.colors.postContainerBackgroundColor} !important;
    box-shadow: 0px 0px 10px 4px ${(props) => props.theme.colors.postGlow} !important;
  `,
  LikeIconContainer: styled.div`
    color: ${(props) => props.theme.colors.likeColor} !important;
    height: 24px;
    &:hover {
      color: ${(props) => props.theme.colors.likeColor} !important;
    }
    &.liked {
      color: ${(props) => props.theme.colors.likeColor} !important;
    }
  `,
  ViewMoreCommentsButton: styled.button`
    border-color: ${(props) => props.theme.colors.borderColor} !important;
    color: ${(props) => props.theme.colors.likeColorFaded} !important;

    &:hover {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  PostEdit: styled.span`
    background-color: ${(props) =>
      props.theme.colors.editedBackgroundColor} !important;
    color: ${(props) => props.theme.colors.primaryColorFaded} !important;
  `,
  OptionsButtonDeleteColors: styled.button`
    background-color: ${(props) =>
      props.theme.colors.editedBackgroundColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.deleteButtonHoverColor} !important;
    }
  `,
  OptionsButtonEditColors: styled.button`
    background-color: ${(props) =>
      props.theme.colors.editedBackgroundColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.editButtonBackgroundColor} !important;
    }
  `,
  CommentTextarea: styled.textarea`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
    :-ms-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
  `,
  EditCommentTextarea: styled.textarea`
    background-color: ${(props) =>
      props.theme.colors.editTextAreaBackgroundColor} !important;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
    :-ms-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
  `,
  CommentButton: styled.button`
    color: ${(props) => props.theme.colors.textWhite} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    font-size: 28px !important;
    min-width: 45px !important;
    position: relative !important;
    &:hover {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &:focus {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &.invalid-comment-button {
      color: ${(props) => props.theme.colors.borderColor} !important;
      border-color: ${(props) => props.theme.colors.borderColor} !important;
      &:hover {
        color: ${(props) => props.theme.colors.textWhite} !important;
        background-color: transparent !important;
        border-color: ${(props) => props.theme.colors.primaryColor} !important;
      }
    }
    @media (min-height: 421px) {
      @media (max-width: 768px) {
        background-color: transparent !important;
      }
    }
    @media (max-height: 500px) {
      @media (max-width: 500px) {
        background-color: ${(props) =>
          props.theme.colors.backgroundColor} !important;
        &.invalid-comment-button {
          color: ${(props) => props.theme.colors.fadedTextColor} !important;
          background-color: ${(props) =>
            props.theme.colors.commentButtonBackgroundColor} !important;
        }
      }
    }
  `,
  CommentButtonSpan: styled.span`
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  MoreVert: styled.div`
    color: ${(props) => props.theme.colors.textWhite} !important;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
  CommentBody: styled.div`
    background-color: ${(props) =>
      props.theme.colors.postBackgroundColor} !important;
  `,
  ViewPostButton: styled.div`
    color: ${(props) => props.theme.colors.viewPostButtonTextColor} !important;
    background-color: ${(props) =>
      props.theme.colors.viewPostButtonBackgroundColor} !important;
    border-color: transparent !important;
    &:hover {
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
      color: ${(props) => props.theme.colors.textWhite} !important;
    }
  `,
  DeletePostMessage: styled.div`
    border-color: ${(props) => props.theme.colors.primaryColor} !important;
  `,

  // ---------- FOLLOWERS, FOLLOWING, LIKERS ----------
  FollowContainer: styled.div`
    background-color: ${(props) =>
      props.theme.colors.followContainerBackgroundColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.followContainerBackgroundColorHover} !important;
    }
    &.current-user-container {
      box-shadow: 0px 0px 4px 4px
        ${(props) => props.theme.colors.primaryColorGlow} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.followContainerBackgroundColorHover} !important;
        box-shadow: 0px 0px 5px 5px
          ${(props) => props.theme.colors.primaryColorGlow} !important;
      }
    }
  `,
  FollowButton: styled.button`
    font-weight: 600 !important;
    border: 2px solid ${(props) => props.theme.colors.primaryColor} !important;
    border-radius: 25px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 4px 5px 10px;
    min-width: 105px;
    transition: all 0.15s ease;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
    }
    &.Follow {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
    }
    &.Unfollow {
      background-color: transparent !important;
      color: ${(props) => props.theme.colors.textWhite} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.primaryColor} !important;
        color: ${(props) =>
          props.theme.colors.primaryColorContrastText} !important;
      }
    }
  `,

  // ---------- NOTIFICATIONS ----------
  NotificationHeader: styled.div`
    background-color: ${(props) => props.theme.colors.navbarColor} !important;
  `,
  NotificationContainer: styled.div`
    background-color: ${(props) =>
      props.theme.colors.notificationContainerColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.notificationHoverColor} !important;
    }
  `,
  ContentBody: styled.div`
    background-color: ${(props) =>
      props.theme.colors.postBackgroundColor} !important;
  `,
  SeenButton: styled.button`
    background-color: ${(props) =>
      props.theme.colors.notificationSeenButtonFaded} !important;
    color: ${(props) =>
      props.theme.colors.notificationSeenButtonFadedText} !important;
    border-color: ${(props) =>
      props.theme.colors.notificationSeenButtonFadedBorder} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.notificationSeenButton} !important;
      color: ${(props) =>
        props.theme.colors.notificationSeenButtonText} !important;
      border-color: ${(props) =>
        props.theme.colors.notificationSeenButton} !important;
    }
  `,
  DeleteButton: styled.button`
    background-color: ${(props) =>
      props.theme.colors.notificationDeleteButtonFaded} !important;
    color: ${(props) =>
      props.theme.colors.notificationDeleteButtonFadedText} !important;
    border-color: ${(props) =>
      props.theme.colors.notificationDeleteButtonFadedBorder} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.notificationDeleteButton} !important;
      color: ${(props) =>
        props.theme.colors.notificationDeleteButtonText} !important;
      border-color: ${(props) =>
        props.theme.colors.notificationDeleteButton} !important;
    }
  `,
  NotificationWrapper: styled.span`
    a {
      &:hover {
        .content-follow {
          color: ${(props) => props.theme.colors.textWhite} !important;
          border-color: ${(props) =>
            props.theme.colors.primaryColor} !important;
        }
      }
    }
  `,

  // ---------- SHARE ----------
  ShareContainer: styled.div`
    background-color: ${(props) =>
      props.theme.colors.shareContainerColor} !important;
    box-shadow: 0px 0px 10px 4px ${(props) => props.theme.colors.shareGlow} !important;
    ::webkit-resizer {
      border-right: 2px solid ${(props) => props.theme.colors.primaryColorFaded} !important;
      border-bottom: 2px solid
        ${(props) => props.theme.colors.primaryColorFaded} !important;
    }
  `,
  ShareHR: styled.hr`
    border-color: ${(props) => props.theme.colors.primaryColor} !important;
  `,
  ShareOptions: styled.div`
    color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    display: flex;
  `,
  ShareSubmitButton: styled.button`
    color: ${(props) => props.theme.colors.textWhite} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &:hover {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    &:focus {
      color: ${(props) =>
        props.theme.colors.primaryColorContrastText} !important;
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
    display: flex;
    &.invalid-share-button {
      color: ${(props) => props.theme.colors.fadedTextColor} !important;
      &:hover {
        color: ${(props) => props.theme.colors.textWhite} !important;
        background-color: transparent !important;
        border-color: ${(props) => props.theme.colors.primaryColor} !important;
      }
    }
  `,
  // webkit resizer not working
  ShareTextArea: styled.textarea`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;

    color: ${(props) => props.theme.colors.textWhite} !important;
    ::webkit-resizer {
      border-right: 2px solid ${(props) => props.theme.colors.primaryColorFaded} !important;
      border-bottom: 2px solid
        ${(props) => props.theme.colors.primaryColorFaded} !important;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
    :-ms-input-placeholder {
      color: ${(props) => props.theme.colors.placeholderTextColor} !important;
    }
  `,
  ShareIcon: styled.div`
    color: ${(props) => props.theme.colors.primaryColorContrastText} !important;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ShareIconActive: styled.div`
    color: ${(props) => props.theme.colors.primaryColor} !important;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  // ---------- MISC ----------
  Loader: styled.div`
    color: ${(props) => props.theme.colors.primaryColor} !important;
  `,
  KFsvg: styled.svg`
    background-color: ${(props) =>
      props.theme.colors.fadedButtonColor} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
  `,
  KFg: styled.g`
    fill: ${(props) => props.theme.colors.sidebarColor} !important;
  `,
  LogoSvg: styled.svg`
    background-color: ${(props) => props.theme.colors.sidebarColor} !important;
    @media (min-height: 421px) {
      @media (max-width: 768px) {
        background-color: ${(props) =>
          props.theme.colors.sidebarColorMobile} !important;
      }
    }
  `,
  LogoG: styled.g`
    fill: ${(props) => props.theme.colors.primaryColor} !important;
  `,
  ExploreLink: styled.a`
    color: ${(props) => props.theme.colors.fadedTextColor} !important;
    padding: 0px 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: ${(props) => props.theme.colors.primaryColor} !important;
    }
  `,
};

export default SC;
