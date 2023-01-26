import React from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from './LoadingPage'

function RenderLoading () {
  const auth = useSelector(state => state.auth)
  const project = useSelector(state => state.projects)

  return (
    (auth.authenticating ||
      project.loading ||
      auth.signingOut ||
      auth.loading) && <LoadingPage />
  )
}

export default RenderLoading
