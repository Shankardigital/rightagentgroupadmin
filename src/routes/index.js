import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"


// Right Agent Group

import Users from "pages/CAMarketing/Users"
import Customers from "pages/CAMarketing/Customers"
import Banners from "pages/CAMarketing/Banners"
import Termsandconditions from "pages/CAMarketing/TermsandConditions"
import Privacy from "pages/CAMarketing/PrivacyPolicy"
import Refering from "pages/CAMarketing/ReferingPolicy"
import Withdraw from "pages/CAMarketing/Withdraw"
import Customerdetails from "pages/CAMarketing/Customerdetails"
import Userdetails from "pages/CAMarketing/Userdetails"
import Cities from "pages/CAMarketing/Cities"
import Category from "pages/CAMarketing/Category"

// reports

import Customersrep from "pages/CAMarketing/reports/Customer"
import Agentpayout from "pages/CAMarketing/reports/Agentpayout"
import Transactions from "pages/CAMarketing/reports/Transactions"
import Geteligibility from "pages/CAMarketing/reports/Geteligibility"
import Insurance from "pages/CAMarketing/reports/Insurance"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Partnermore from "pages/CAMarketing/Partnermore"
import Editrealestate from "pages/CAMarketing/Editrealestate"

import Otp from "pages/Authentication/Otp"
import Setpwd from "pages/Authentication/Setpwd"
import Realestatefeatures from "pages/CAMarketing/Realestatefeatures"
import Basicdetails from "pages/CAMarketing/Basicdetails"
import Faq from "pages/CAMarketing/Faq"
import Reviews from "pages/CAMarketing/Reviews"
import Banner from "pages/CAMarketing/Banner"


const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/partners", component: Users },
  { path: "/users_details", component: Userdetails },
  { path: "/customers", component: Customers },
  { path: "/customer_details", component: Customerdetails },
  { path: "/loans", component: Banners },
  { path: "/termsandconditions", component: Termsandconditions },
  { path: "/privacy", component: Privacy },
  { path: "/refering", component: Refering },  
  { path: "/withdraw", component: Withdraw },  
  { path: "/cities", component: Cities },
  { path: "/realestate", component: Partnermore },  
  { path: "/editrealestate", component: Editrealestate },  
  { path: "/realestatefeatures", component: Realestatefeatures },  
  { path: "/category", component:  Category},  
  { path: "/basic_details", component:  Basicdetails},  
  { path: "/faq", component:  Faq},  
  { path: "/reviews", component:  Reviews},  
  { path: "/banners", component:  Banner},  

  // Reports
  { path: "/loan_reports", component: Customersrep },
  { path: "/insurance_reports", component: Agentpayout },  
  { path: "/realestate_reports", component: Transactions },  
  { path: "/insuranceform_reports", component: Insurance  },  
  { path: "/geteligibility_reports", component: Geteligibility },  

  // //profile
  { path: "/profile", component: UserProfile },
  

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/otp", component: Otp },
  { path: "/setpassword", component: Setpwd },
]

export { publicRoutes, authProtectedRoutes }
