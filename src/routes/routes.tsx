import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import ModalRenderer from 'components/modalRenderer/ModalRenderer';
import ToastRenderer from 'components/toast/ToastRenderer';
import { FullLayout, TitleHeaderLayout } from 'layout';
import { AuthHeaderLayout, AuthTitleHeaderLayout, PublicOnlyLayout } from 'layout/ProtectedRoutes';
import SearchLayout from 'layout/SearchLayout';
import Callback from 'pages/callback/Callback';
import ConcertHallsList from 'pages/concertHallsList/ConcertHallsList';
import Notification from 'pages/notification/Notification';
import Search from 'pages/search/Search';
import SearchMoreConcerts from 'pages/searchMore/SearchMoreConcerts';
import SearchMoreRents from 'pages/searchMore/SearchMoreRents';
import SearchMoreSurveys from 'pages/searchMore/SearchMoreSurveys';

const Home = lazy(() => import('pages/home/Home'));
const Concert = lazy(() => import('pages/concert/Concert'));
const BusRental = lazy(() => import('pages/busRental/BusRental'));
const Surveys = lazy(() => import('pages/surveys/Surveys'));

const ConcertDetail = lazy(() => import('pages/concertDetail/ConcertDetail'));
const SurveyDetail = lazy(() => import('pages/surveyDetail/SurveyDetail'));
const BusRentalDetail = lazy(() => import('pages/busRentalDetail/BusRentalDetail'));
const ConcertHallDetail = lazy(() => import('pages/concertHallDetail/ConcertHallDetail'));

const MyPage = lazy(() => import('pages/myPage/MyPage'));
const SignIn = lazy(() => import('pages/signIn/SignIn'));
const SignUp = lazy(() => import('pages/signUp/SignUp'));

const OpenBusRental = lazy(() => import('pages/openBusRental/OpenBusRental'));
const OpenSurvey = lazy(() => import('pages/openSurvey/OpenSurvey'));
const EditProfile = lazy(() => import('pages/editProfile/EditProfile'));
const MyRentalList = lazy(() => import('pages/myRentalList/MyRentalList'));
const MySurveyList = lazy(() => import('pages/mySurveyList/MySurveyList'));
const MyRentalManagement = lazy(() => import('pages/myRentalManagement/MyRentalManagement'));
const ManagingRentalDetail = lazy(() => import('pages/managingRentalDetail/ManagingRentalDetail'));
const MySurveyManagement = lazy(() => import('pages/mySurveyManagement/MySurveyManagement'));
const ConcertRecord = lazy(() => import('pages/concertRecord/ConcertRecord'));
const CreateConcertRecord = lazy(() => import('pages/createConcertRecord/CreateConcertRecord'));
const CreateSeatReview = lazy(
  () => import('pages/createConcertHallReview/CreateConcertHallReview')
);

const Chat = lazy(() => import('pages/chat/Chat'));

const routes = [
  {
    element: (
      <>
        <Outlet />
        <ModalRenderer />
        <ToastRenderer />
      </>
    ),
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/concerts', element: <Concert /> },
          { path: '/bus-rental', element: <BusRental /> },
          { path: '/surveys', element: <Surveys /> },
          { path: '/concert-halls', element: <ConcertHallsList /> },
        ],
      },
      {
        element: <TitleHeaderLayout />,
        children: [
          {
            path: '/concerts/:id',
            element: <ConcertDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/surveys/:id',
            element: <SurveyDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/bus-rental/:id',
            element: <BusRentalDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/search/concerts/more',
            element: <SearchMoreConcerts />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/search/rents/more',
            element: <SearchMoreRents />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/search/surveys/more',
            element: <SearchMoreSurveys />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/concert-halls/:id',
            element: <ConcertHallDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
        ],
      },

      { element: <SearchLayout />, children: [{ path: '/search', element: <Search /> }] },

      {
        element: <AuthHeaderLayout />,
        children: [
          { path: '/mypage', element: <MyPage /> },
          { path: '/chat', element: <Chat /> },
        ],
      },

      {
        element: <PublicOnlyLayout />,
        children: [
          { path: '/signin', element: <SignIn /> },
          { path: '/signup/callback', element: <Callback /> },
          {
            path: '/signup',
            element: <SignUp />,
            handle: {
              title: '회원가입',
            },
          },
        ],
      },

      {
        element: <AuthTitleHeaderLayout />,
        children: [
          {
            path: '/bus-rental/create',
            element: <OpenBusRental />,
            handle: {
              title: '차량 대절 폼 개설',
            },
          },
          {
            path: '/survey/create',
            element: <OpenSurvey />,
            handle: { title: '수요 조사 폼 개설' },
          },
          {
            path: '/edit-profile',
            element: <EditProfile />,
            handle: { title: '프로필 편집' },
          },
          {
            path: '/survey-management',
            element: <MySurveyManagement />,
            handle: { title: '수요 조사 관리' },
          },
          {
            path: '/rental-management',
            element: <MyRentalManagement />,
            handle: { title: '차량 대절 관리' },
          },
          {
            path: '/rental-management/:id',
            element: <ManagingRentalDetail />,
            handle: { title: '차량 대절 관리 상세' },
          },
          {
            path: '/my-survey-list',
            element: <MySurveyList />,
            handle: { title: '참여 중인 수요 조사' },
          },
          {
            path: '/my-rental-list',
            element: <MyRentalList />,
            handle: { title: '참여 중인 차량 대절' },
          },
          {
            path: '/concert-record',
            element: <ConcertRecord />,
            handle: { title: '공연 기록' },
          },
          {
            path: '/concert-record/create',
            element: <CreateConcertRecord type="create" />,
            handle: { title: '공연 기록 등록' },
          },
          {
            path: '/concert-record/edit/:id',
            element: <CreateConcertRecord type="edit" />,
            handle: { title: '공연 기록 수정' },
          },
          {
            path: '/notifications',
            element: <Notification />,
            handle: { title: '알림' },
          },
          {
            path: '/concert-halls/:id/seat-review/create',
            element: <CreateSeatReview type="create" />,
            handle: { title: '좌석 리뷰 작성' },
          },
          {
            path: '/concert-halls/:id/seat-review/edit/:reviewId',
            element: <CreateSeatReview type="edit" />,
            handle: { title: '좌석 리뷰 수정' },
          },
          {
            path: '/mypage/seat-review/create',
            element: <CreateSeatReview isFromMypage type="create" />,
            handle: { title: '좌석 리뷰 작성' },
          },
          {
            path: '/mypage/seat-review/edit/:reviewId',
            element: <CreateSeatReview isFromMypage type="edit" />,
            handle: { title: '좌석 리뷰 수정' },
          },
        ],
      },
    ],
  },
];

const options = {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
};

export const router = createBrowserRouter(routes, options);
