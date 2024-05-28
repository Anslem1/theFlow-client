import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderLoading from '../../Components/LoadingPage/RenderLoading'

function SearchPage () {
  const auth = useSelector(state => state.auth)
  const projects = useSelector(state => state.projects.projectBySearch)

  return (
    <>
      <RenderLoading />
      <div className='all-project-container'>
        {projects.length > 0 ? (
          <>
            <div>
              <h1>Hi, {auth.user.username}</h1>
              <div className='project-heading'>
                <p>Your projects:</p>
                <button className='create-project-btn'>
                  <Link
                    to={'/project/create'}
                    className='link'
                    onClick={() => localStorage.removeItem('updateProject')}
                  >
                    <i className='fa-solid fa-plus'></i>
                    Create
                  </Link>
                </button>
              </div>
            </div>
            <div className='all-project-content-container'>
              <div className='project-container'>
                {projects.map(project => (
                  <div className='all-project-content' key={project._id}>
                    <Link
                      to={`/product-details/${project.projectName}/${project._id}`}
                      className='link'
                    >
                      <p>{project.projectName}</p>
                      <img
                        src={
                          project.projectImages.length > 0
                            ? project.projectImages[0].image
                            : null
                        }
                        alt='image'
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1
              style={{
                textAlign: 'center',
                fontFamily: 'Raleway',
                marginTop: '20px'
              }}
            >
              There's no project with that name!
            </h1>

            <button className='create-project-btn no-project-btn'>
              <Link to={'/project/create'} className='link'>
                <i className='fa-solid fa-plus'></i>
                Create
              </Link>
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default SearchPage
