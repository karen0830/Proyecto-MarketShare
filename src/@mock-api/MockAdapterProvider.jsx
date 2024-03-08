import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { useAppDispatch } from "app/store/store";
import apiService from "app/store/apiService";
import ExtendedMockAdapter from "./ExtendedMockAdapter";
import { authApiMocks } from "./api/auth-api";
import { notificationsApiMocks } from "./api/notifications-api";
import { messengerApiMocks } from "./api/messenger-api";
import { financeDashboardApiMocks } from "./api/dashboards/finance-api";
import { analyticsDashboardApiMocks } from "./api/dashboards/analytics-api";
import { cryptoDashboardApiMocks } from "./api/dashboards/crypto-api";
import { projectDashboardApiMocks } from "./api/dashboards/project-api";
import { iconsApiMocks } from "./api/ui/icons-api";
import { academyApiMocks } from "./api/academy-api";
import { countriesApiMocks } from "./api/countries-api";
import { eCommerceApiMocks } from "./api/ecommerce-api";
import { fileManagerApiMocks } from "./api/file-manager-api";
import { helpCenterApiMocks } from "./api/help-center-api";
import { mailBoxApiMocks } from "./api/mailbox-api";
import { notesApiMocks } from "./api/notes-api";
import { scrumboardApiMocks } from "./api/scrumboard-api";
import { tasksApiMocks } from "./api/tasks-api";
import { profileApiMocks } from "./api/profile-api";
import { calendarApiMocks } from "./api/calendar-api";

const mockAdapterOptions = {
  delayResponse: 0,
};
const baseURL = "/mock-api";
const mock = new ExtendedMockAdapter(axios, mockAdapterOptions, baseURL);

function MockAdapterProvider(props) {
  const { enabled = true, children } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isInitialMount = useRef(true);
  useEffect(() => {
    const setupAllMocks = () => {
      [
        analyticsDashboardApiMocks,
        cryptoDashboardApiMocks,
        financeDashboardApiMocks,
        projectDashboardApiMocks,
        iconsApiMocks,
        academyApiMocks,
        authApiMocks,
        calendarApiMocks,
        countriesApiMocks,
        eCommerceApiMocks,
        fileManagerApiMocks,
        helpCenterApiMocks,
        mailBoxApiMocks,
        messengerApiMocks,
        notesApiMocks,
        notificationsApiMocks,
        profileApiMocks,
        scrumboardApiMocks,
        tasksApiMocks,
      ].forEach((mockSetup) => {
        mockSetup(mock);
      });
    };

    if (enabled) {
      setupAllMocks();
      mock.onAny().passThrough();
    } else {
      mock.restore();
    }

    setLoading(false);
    return () => {
      if (!enabled && mock) {
        mock.restore();
      }

      setLoading(false);
    };
  }, [enabled]);
  useEffect(() => {
    if (import.meta.hot) {
      if (!isInitialMount.current) {
        dispatch(apiService.util.resetApiState());
      }

      isInitialMount.current = false;
    }
  }, [dispatch]);
  return loading ? <FuseSplashScreen /> : children;
}

export default MockAdapterProvider;
