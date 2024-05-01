export const enum endpoints {
    register = "/auth/signup",
    login = "/auth/login",
    reset_password = "/auth/reset-password",
    verify_email = "/auth/verify-email",
    request_token = "/auth/request-token",
    update_profile = "/auth/update-profile",
    verify_license= "/auth/license-submission",
    toggle_follow = "/auth/toggle-follow",
    acct_details = "/auth/populate/account-details",


    get_profile = "/user/my-profile",
    profile = "/user/profile",
    get_followers = "/user/followers",
    following = "/user/following",
    get_bookmarks = "/user/bookmarks",

    categories = "/categories",
    article_publish = "/article/publish",
    get_articles = "/user/articles",
    get_single_article = "/article/fetch",
    toggle_like = "/article/toggle-like",
    toggle_bookmark = "/article/toggle-bookmark",
    news_feed = "/news-feed",
    discoveries = "/discoveries",

    add_comment = "/comment/add",
    fetch_comment = "/comment/fetch",
    reply_comment = "/comment/reply/add",
    fetch_comment_reply = "/comment/reply/fetch",
    toggle_comment_like = "/comment/toggle-like",

    advert_post = "/advert/post",
    fetch_adverts = "/advert/fetch",

    fetch_forum_messages = "/forum/fetch-messages",
    fetch_forum_requesters = "/forum/requesters",
    fetch_forums = "/user/forums",
    create_forum = "/forum/create",
    send_forum_message = "/forum/send-message",
    request_join_forum = "/forum/request-join",
    manage_join = "/forum/manage-join",

    create_job = "job/post",
    fetch_jobs = "job/fetch",
    delete_job = "job/delete",

    withdraw = "wallet/request-withdrawal",
    banks = "user/banks",
    verify_bank = "user/verify-bank",
    become_member = "wallet/become-memeber"

}