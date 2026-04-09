// // import axios from "axios";

// // /*
// // ==========================================================
// //   BASE CONFIG
// // ==========================================================
// //   Change this to your backend URL if deployed.
// //   Example:
// //   https://your-backend.onrender.com/api
// // ==========================================================
// // */

// // const API = axios.create({
// //   baseURL: "http://localhost:5000/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   timeout: 1500000,
// // });

// // /*
// // ==========================================================
// //   REQUEST INTERCEPTOR
// //   - Automatically attaches JWT
// // ==========================================================
// // */

// // API.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // /*
// // ==========================================================
// //   RESPONSE INTERCEPTOR
// //   - Handles global errors
// //   - Auto logout on 401
// // ==========================================================
// // */

// // API.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (!error.response) {
// //       console.error("Network Error:", error.message);
// //       return Promise.reject({
// //         message: "Network error. Please check your connection.",
// //       });
// //     }

// //     const { status, data } = error.response;

// //     if (status === 401) {
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //       window.location.href = "/login";
// //     }

// //     return Promise.reject({
// //       status,
// //       message: data?.message || "Something went wrong",
// //     });
// //   }
// // );

// // /*
// // ==========================================================
// //   AUTH API
// // ==========================================================
// // */

// // export const authAPI = {
// //   register: (data) => API.post("/auth/register", data),
// //   login: (data) => API.post("/auth/login", data),
// // };

// // /*
// // ==========================================================
// //   PROFILE API
// // ==========================================================
// // */

// // export const profileAPI = {
// //   createOrUpdate: (data) => API.post("/profile", data),
// //   get: (userId) => API.get(`/profile/${userId}`),
// // };

// // /*
// // ==========================================================
// //   WORKOUT API
// // ==========================================================
// // */

// // export const workoutAPI = {
// //   start: (data) => API.post("/workout/start", data),
// //   complete: (data) => API.post("/workout/complete", data),
// //   getActivePlan: (userId) =>
// //     API.get(`/workout/active/${userId}`),
// //   markAttendance: (userId, data) =>
// //     API.post(`/workout/attendance/${userId}`, data),
// //   updateStructure: (userId, data) =>
// //     API.patch(`/workout/structure/${userId}`, data),
// // };

// // /*
// // ==========================================================
// //   PLAN API
// // ==========================================================
// // */

// // export const planAPI = {
// //   generate: (userId) =>
// //     API.post(`/plan/generate/${userId}`),
// //   regenerate: (userId) =>
// //     API.post(`/plan/regenerate/${userId}`),
// //   regenerateAI: (userId) =>
// //     API.post(`/plan/regenerate-ai/${userId}`),
// // };

// // /*
// // ==========================================================
// //   READINESS API
// // ==========================================================
// // */

// // export const readinessAPI = {
// //   submit: (data) => API.post("/readiness", data),
// //   getHistory: (userId) =>
// //     API.get(`/readiness/${userId}`),
// // };

// // /*
// // ==========================================================
// //   NUTRITION API
// // ==========================================================
// // */

// // export const nutritionAPI = {
// //   generateTarget: (data) =>
// //     API.post("/nutrition/target", data),
// //   generateSummary: (userId, date) =>
// //     API.get("/nutrition-summary/summary", {
// //       params: { userId, date },
// //     }),
// // };

// // /*
// // ==========================================================
// //   FOOD LOG API
// // ==========================================================
// // */

// // export const foodAPI = {
// //   log: (data) => API.post("/food/log", data),
// // };

// // /*
// // ==========================================================
// //   APS API
// // ==========================================================
// // */

// // export const apsAPI = {
// //   getHistory: (userId, days = 30) =>
// //     API.get(`/aps/history/${userId}`, {
// //       params: { days },
// //     }),
// // };

// // export default API;


// import axios from "axios";

// /*
// ==========================================================
//   BASE CONFIG
// ==========================================================
// */

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 1500000,
// });

// /*
// ==========================================================
//   REQUEST INTERCEPTOR
//   - Attach JWT automatically
// ==========================================================
// */

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /*
// ==========================================================
//   RESPONSE INTERCEPTOR
//   - Global error handling
// ==========================================================
// */

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (!error.response) {
//       return Promise.reject({
//         message: "Network error. Please check your connection.",
//       });
//     }

//     const { status, data } = error.response;

//     if (status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }

//     return Promise.reject({
//       status,
//       message: data?.message || "Something went wrong",
//     });
//   }
// );

// /*
// ==========================================================
//   AUTH API
// ==========================================================
// */

// export const authAPI = {
//   register: (data) => API.post("/auth/register", data),
//   login: (data) => API.post("/auth/login", data),
// };

// /*
// ==========================================================
//   PROFILE API
// ==========================================================
// */

// export const profileAPI = {
//   create: (data) => API.post("/profile", data),
//   get: (userId) => API.get(`/profile/${userId}`),
//   update: (userId, data) => API.patch(`/profile/${userId}`, data),
// };

// /*
// ==========================================================
//   PLAN API (RULE-BASED)
// ==========================================================
// */

// export const planAPI = {
//   generate: (userId) =>
//     API.post(`/plan/generate/${userId}`),

//   getActive: (userId) =>
//     API.get(`/plan/active/${userId}`),
// };

// /*
// ==========================================================
//   AI API (ENHANCEMENT LAYER)
// ==========================================================
// */

// export const aiAPI = {
//   generateWeekly: (userId) =>
//     API.post(`/ai-session/generate-weekly/${userId}`),
// };

// /*
// ==========================================================
//   READINESS API
// ==========================================================
// */

// export const readinessAPI = {
//   submit: (data) => API.post("/readiness", data),
//   getHistory: (userId) =>
//     API.get(`/readiness/${userId}`),
// };

// /*
// ==========================================================
//   NUTRITION API
// ==========================================================
// */

// export const nutritionAPI = {
//   generateTarget: (data) =>
//     API.post("/nutrition/target", data),

//   // Get today's saved plan (GET)
//   getToday: (userId, date) =>
//     API.get("/nutrition/today", {
//       params: { userId, date },
//     }),

//   generateSummary: (userId, date) =>
//     API.get("/nutrition-summary/summary", {
//       params: { userId, date },
//     }),
// };

// /*
// ==========================================================
//   FOOD LOG API
// ==========================================================
// */

// export const foodAPI = {
//   log: (data) => API.post("/food/log", data),
// };

// /*
// ==========================================================
//   APS API
// ==========================================================
// */

// export const apsAPI = {
//   getHistory: (userId, days = 30) =>
//     API.get(`/aps/history/${userId}`, {
//       params: { days },
//     }),
// };

// export default API;


import axios from "axios";

  // BASE CONFIG
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1500000,
});

const API2 = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1500000,
});

  // REQUEST INTERCEPTOR — attach JWT automatically

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

  // RESPONSE INTERCEPTOR — global error handling

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = error.response;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject({
      status,
      message: data?.message || "Something went wrong",
    });
  }
);

  // AUTH API

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
};


  // PROFILE API

export const profileAPI = {

  create: (data) => API.post("/profile", data),

  createOrUpdate: (data) => API.post("/profile", data),

  
  get: (userId) => API.get(`/profile/${userId}`),

  update: (userId, data) => API.patch(`/profile/${userId}`, data),
};


  // PLAN API

export const planAPI = {
  generate: (userId) => API.post(`/plan/generate/${userId}`),
  getActive: (userId) => API.get(`/plan/active/${userId}`),
};

  // AI API

export const aiAPI = {
  generateWeekly: (userId) =>
    API.post(`/ai-session/generate-weekly/${userId}`),
};



export const readinessAPI = {
  submit: (data) => API.post("/readiness", data),
  getHistory: (userId) => API.get(`/readiness/${userId}`),
};



export const nutritionAPI = {
  generateTarget: (data) =>
    API.post("/nutrition/target", data),

  getToday: (userId, date) =>
    API.get("/nutrition/today", {
      params: { userId, date },
    }),

  getTodaySummary: (userId, date) =>
    API.get("/nutrition-summary/summary", {
      params: { userId, date },
    }),

  generateSummary: (userId, date) =>
    API.post("/nutrition-summary/summary", {
      userId,
      date,
    }),
};

// export const nutritionAPI = {
//   generateTarget: (data) =>
//     API.post("/nutrition/target", data),

  
//   getToday: (userId, date) =>
//     API.get("/nutrition/today", {
//       params: { userId, date },
//     }),

//   getTodaySummary: (userId, date) =>
//     API.get("/nutrition-summary/summary", {
//       params: { userId, date },
//     }),

//   generateSummary: (userId, date) =>
//     API.post("/nutrition-summary/summary", {
//       params: { userId, date },
//     }),
// };



export const foodAPI = {
  log: (data) => API.post("/food/log", data),
};



export const workoutAPI = {
  // Complete workout session
  complete: (data) =>
    API.post("/workout/complete", data),

  // (Optional future)
  start: (data) =>
    API.post("/workout/start", data),

  // Get active weekly plan (if needed)
  getActivePlan: (userId) =>
    API.get(`/workout/active/${userId}`),

  // Mark attendance (if implemented)
  markAttendance: (userId, data) =>
    API.post(`/workout/attendance/${userId}`, data),
};



export const remindersAPI = {
  // GET  /reminders/status/:userId  — check latest APS score + tier (no email)
  getStatus: (userId) => API.get(`/reminders/status/${userId}`),

  // POST /reminders/test/:userId    — fire test email instantly
  sendTest: (userId) => API.post(`/reminders/test/${userId}`),

  // POST /reminders/enable/:userId  — re-enable reminders after stop
  enable: (userId) => API.post(`/reminders/enable/${userId}`),

  // GET  /reminders/stop/:userId    — unsubscribe
  stop: (userId) => API.get(`/reminders/stop/${userId}`),
};



export const waterRemindersAPI = {
  // POST /water-reminders/setup  — register user + initial hydration state
  // Body: { userId, email, target, consumed?, status? }
  setup: (data) => API2.post("/water-reminders/setup", data),

  // POST /water-reminders/sync   — update consumed/target from frontend
  // Body: { target, consumed, status }
  sync: (data) => API2.post("/water-reminders/sync", data),

  // POST /water-reminders/test   — fire test email instantly
  // Body: { userId, email, target, consumed }
  sendTest: (data) => API2.post("/water-reminders/test", data),

  // POST /water-reminders/toggle — enable / disable notifications
  toggle: () => API2.post("/water-reminders/toggle"),

  // GET  /water-reminders/status — check current hydration state
  getStatus: () => API2.get("/water-reminders/status"),

  // GET  /water-reminders/stop/:userId — unsubscribe
  stop: (userId) => API2.get(`/water-reminders/stop/${userId}`),
};




export const apsAPI = {
  getHistory: (userId, days = 30) =>
    API.get(`/aps/history/${userId}`, {
      params: { days },
    }),
};



export const rehabAPI = {
  // Calculate RRS and persist the session
  // body must include userId + all domain data
  calculate: (data) =>
    API.post("/rehab/rrs/calculate", data),

  // Fetch all sessions for a user (paginated + filterable)
  // options: { limit, page, phase, sort }
  getSessions: (userId, options = {}) =>
    API.get(`/rehab/rrs/sessions/${userId}`, { params: options }),

  // Fetch a single session by sessionId (includes rawInput)
  getSession: (userId, sessionId) =>
    API.get(`/rehab/rrs/sessions/${userId}/${sessionId}`),

  // Fetch progress summary + score trend for a user
  getSummary: (userId) =>
    API.get(`/rehab/rrs/summary/${userId}`),

  // Fetch the four phase definitions (no auth needed usually)
  getPhases: () =>
    API.get("/rehab/rrs/phases"),
};



export const functionalTestAPI = {
  // Create & store new functional test record
  create: (data) =>
    API.post("/functional-test", data),

  // Get all functional tests for a user
  getUserRecords: (userId) =>
    API.get(`/functional-test/user/${userId}`),

  // Get specific day test
  getByDate: (userId, date) =>
    API.get(`/functional-test/user/${userId}/${date}`),
};



export const painAPI = {
  // Submit new pain analysis
  create: (data) =>
    API.post("/pain-analysis", data),

  // Get all pain records for user
  getUserRecords: (userId) =>
    API.get(`/pain-analysis/user/${userId}`),

  // Get specific day record
  getByDate: (userId, date) =>
    API.get(`/pain-analysis/user/${userId}/${date}`),
};




export const trainingAPI = {
  // Submit training session analysis
  create: (data) =>
    API.post("/training-analysis", data),

  // Get all sessions for user
  getUserRecords: (userId) =>
    API.get(`/training-analysis/user/${userId}`),

  // Get specific day session
  getByDate: (userId, date) =>
    API.get(`/training-analysis/user/${userId}/${date}`),
};

export default API;