

import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
    const user = localStorage.getItem("user") ?JSON.parse(localStorage.getItem("user")):null

  if (user === null) {
    return children
  } else {
    return <Navigate to="/Dashboard" />
  }
}

export default OpenRoute