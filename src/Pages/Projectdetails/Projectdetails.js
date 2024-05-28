import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import RenderLoading from '../../Components/LoadingPage/RenderLoading'
import { deleteProjectById, getProjectById } from '../../Redux/actions'
import './Projectdetails.css'

function Projectdetails () {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const projects = useSelector(state => state.projects)
  const { project } = projects

  useEffect(() => {
    dispatch(getProjectById(params.id))
  }, [])

  function deleteProject () {
    dispatch(deleteProjectById(params.id, navigate))
  }

  function updateProject () {
    localStorage.setItem('updateProject', JSON.stringify(project))
    navigate('/project/create')
  }

  return (
    <>
      <RenderLoading />
      {Object.keys(project).length > 0 ? (
        <div className='single-project-container'>
          <p>{project.projectName}</p>
          <div className='single-project-content'>
            {project.projectImages && project.projectImages.length > 0 && (
              <img src={project.projectImages[0].image} alt='' />
            )}
            <div className='other-image-container'>
              {project.projectImages &&
                project.projectImages.length > 0 &&
                project.projectImages.map(image => (
                  <a href={image.image} key={image._id}>
                    <img src={image.image} alt='' />
                  </a>
                ))}
            </div>
            <p className='project-description'>{project.projectDescription}</p>
            {project.projectTechnologies && (
              <p className='project-technology'>
                built with:
                {project.projectTechnologies.map((technology, index) => {
                  return (
                    <span key={index}>
                      {(index ? ', ' : '') + technology.technology}
                    </span>
                  )
                })}
              </p>
            )}

            <a href={`${project.projectSite}`} style={{ marginBottom: '20px' }}>
              Your project site
            </a>

            <p className='project-technology'>
              <span>Type:</span> {project.projectType}
            </p>
            {project.projectGitUrl === 'N/A' ? (
              <p>Github: {project.projectGitUrl}</p>
            ) : (
              <a href={project.projectGitUrl} className='git-link'>
                <i className='fa-brands fa-github'></i>
              </a>
            )}
          </div>
          <div className='update-delete-container'>
            <div>
              <button onClick={updateProject}>Update</button>
              <button onClick={deleteProject}>Delete</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {projects.loading ? (
            <RenderLoading />
          ) : (
            <p className='no-project'>
              We couldn't find that <i className='fa-solid fa-face-frown'></i>
            </p>
          )}
        </>
      )}
    </>
  )
}

export default Projectdetails
