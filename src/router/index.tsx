import { Outlet, createBrowserRouter } from "react-router-dom";
import {
  AccountCreationSuccess,
  CreateAccount,
  ForgotPassword,
  Login,
  ResetPassword,
  VerifyEmail,
} from "@src/pages/auth";
import { AuthLayout } from "@src/components/layouts";
import { NotFound } from "@src/pages/NotFound";
import { lazyImport } from "@src/lib/utils";
import { Header, Protected } from "@src/components";
import { Suspense } from "react";
import { Spinner } from "@src/components/icons";
import { Footer } from "@src/components/Footer";

const fallback = (
  <div className="h-screen grid place-items-center">
    <Spinner size={28} />
  </div>
);

const App = () => {
  return (
    <Protected>
      <Header />
      <Suspense fallback={fallback}>
        <Outlet />
      </Suspense>
      <Footer />
    </Protected>
  );
};

const { Home } = lazyImport(() => import("@src/pages/app"), "Home");
const { ArticleDetails } = lazyImport(
  () => import("@src/pages/app"),
  "ArticleDetails"
);
const { VerifyAccount } = lazyImport(
  () => import("@src/pages/app"),
  "VerifyAccount"
);
const { VerifyPending } = lazyImport(
  () => import("@src/pages/app"),
  "VerifyPending"
);
const { WritePost } = lazyImport(() => import("@src/pages/app"), "WritePost");
const { PublishConfirmation } = lazyImport(
  () => import("@src/pages/app"),
  "PublishConfirmation"
);
const { Profile } = lazyImport(() => import("@src/pages/app"), "Profile");
const { AccountProfile } = lazyImport(
  () => import("@src/pages/app"),
  "AccountProfile"
);
const { UserSingleArticle } = lazyImport(
  () => import("@src/pages/app"),
  "UserSingleArticle"
);
const { AddAdvert } = lazyImport(() => import("@src/pages/app"), "AddAdvert");
const { BoostArticle } = lazyImport(
  () => import("@src/pages/app"),
  "BoostArticle"
);

const { AccountDetails } = lazyImport(
  () => import("@src/pages/app"),
  "AccountDetails"
);
const { Withdraw } = lazyImport(() => import("@src/pages/app"), "Withdraw");

const { SearchResult } = lazyImport(
  () => import("@src/pages/app"),
  "SearchResult"
);
const { Forum } = lazyImport(() => import("@src/pages/app"), "Forum");
const { ForumViewMessage } = lazyImport(
  () => import("@src/pages/app"),
  "ForumViewMessage"
);
const { CreateForum } = lazyImport(
  () => import("@src/pages/app"),
  "CreateForum"
);
const { CreateJob } = lazyImport(() => import("@src/pages/app"), "CreateJob");

const { AccountSettings } = lazyImport(
  () => import("@src/pages/app"),
  "AccountSettings"
);

const { DonationPlan } = lazyImport(
  () => import("@src/pages/app"),
  "DonationPlan"
);
const { MarketPlace } = lazyImport(
  () => import("@src/pages/app"),
  "MarketPlace"
);

const { Articles } = lazyImport(() => import("@src/pages/app"), "Articles");

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/article-details/:id", element: <ArticleDetails /> },
    ],
  },
  {
    element: <App />,
    children: [
      { path: "/add-advert", element: <AddAdvert /> },
      { path: "/verify-account", element: <VerifyAccount /> },
      { path: "/verify-pending", element: <VerifyPending /> },
      { path: "/write-post", element: <WritePost /> },
      { path: "/publish-confirmation", element: <PublishConfirmation /> },
      { path: "/create-job", element: <CreateJob /> },

      { path: "/write-post", element: <WritePost /> },
      { path: "/account-details", element: <AccountDetails /> },

      { path: "/profile", element: <Profile /> },
      {
        path: "/account-profile/:username",
        element: <AccountProfile />,
        children: [
          { path: "articles", index: true, element: <h1>Articles</h1> },
          { path: "adverts", index: true, element: <h1>Adverts</h1> },
        ],
      },
      {
        path: "/articles",
        element: <Articles />,
        children: [
          { path: "for_you", index: true, element: <h1>For you</h1> },
          { path: "following", index: true, element: <h1>Following</h1> },
        ],
      },
      { path: "/user-single-article/:id", element: <UserSingleArticle /> },
      { path: "/boost-article", element: <BoostArticle /> },
      { path: "/withdraw", element: <Withdraw /> },
      { path: "/search-results", element: <SearchResult /> },
      { path: "/forum", element: <Forum /> },
      { path: "/forum-message/:id", element: <ForumViewMessage /> },
      { path: "/create-forum", element: <CreateForum /> },
      {
        path: "/account",
        element: <AccountSettings />,
        children: [
          { path: "settings", index: true, element: <h1>Settings</h1> },
          { path: "notification", index: true, element: <h1>Settings</h1> },
          { path: "donation", index: true, element: <h1>Settings</h1> },
          { path: "security", index: true, element: <h1>Settings</h1> },
        ],
      },
      { path: "/donation-plan", element: <DonationPlan /> },
      { path: "/marketplace", element: <MarketPlace /> },
    ],
  },
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: "/signup", element: <CreateAccount /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      {
        path: "/account-creation-success",
        element: <AccountCreationSuccess />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/*", element: <NotFound /> },
]);
