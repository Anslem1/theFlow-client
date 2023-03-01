import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RenderLoading from '../../Components/LoadingPage/RenderLoading'
import { addProject, updateProjectById } from '../../Redux/actions'
import './Createproject.css'

function CreateProjectPage () {
  const updateProjectData = JSON.parse(localStorage.getItem('updateProject'))

  const [projectName, setProjectName] = useState(
    updateProjectData ? updateProjectData.projectName : ''
  )
  const [projectDescription, setProjectDescription] = useState(
    updateProjectData ? updateProjectData.projectDescription : ''
  )
  const [projectImages, setProjectImages] = useState([])
  const [projectTechnologies, setProjectTechnologies] = useState(
    updateProjectData
      ? updateProjectData.projectTechnologies
      : [{ technology: '' }]
  )
  const [projectType, setProjectType] = useState(
    updateProjectData ? updateProjectData.projectType : ''
  )
  const [projectGitUrl, setProjectGitUrl] = useState(
    updateProjectData ? updateProjectData.projectGitUrl : ''
  )
  const [projectSite, setProjectSite] = useState(
    updateProjectData ? updateProjectData.projectSite : ''
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const project = useSelector(state => state.projects)

  function handleAddProjectTechnology () {
    setProjectTechnologies([
      ...projectTechnologies,
      {
        technology: ''
      }
    ])
  }
  function handleRemoveProjectTechnology (index) {
    const list = [...projectTechnologies]
    list.splice(index, 1)
    setProjectTechnologies(list)
  }

  function handleTechnologyChange (e, index) {
    const { name, value } = e.target
    const list = [...projectTechnologies]
    list[index][name] = value
    setProjectTechnologies(list)
  }

  function createProject () {
    const form = new FormData()
    if (projectImages.length > 5) {
      alert('Maximum of 5 images')
      return
    } else {
      for (const image of projectImages) {
        form.append('projectImage', image)
      }
    }
    const projectTrchnologyArray = projectTechnologies.map(
      ({ technology }) => technology
    )
    form.append('projectName', projectName)
    form.append('projectDescription', projectDescription)
    form.append('technology', projectTrchnologyArray)
    form.append('projectType', projectType)
    form.append('projectGitUrl', projectGitUrl)
    form.append('projectSite', projectSite)

    dispatch(addProject(form, navigate))
  }

  function updateProject () {
    const form = new FormData()
    if (projectImages.length > 5) {
      alert('Maximum of 5 images')
      return
    } else {
      for (const image of projectImages) {
        form.append('projectImage', image)
      }
    }
    const projectTrchnologyArray = projectTechnologies.map(
      ({ technology }) => technology
    )
    form.append('projectName', projectName)
    form.append('projectDescription', projectDescription)
    form.append('technology', projectTrchnologyArray)
    form.append('projectType', projectType)
    form.append('projectGitUrl', projectGitUrl)
    form.append('projectSite', projectSite)

    dispatch(updateProjectById(updateProjectData._id, form, navigate))
  }

  return (
    <>
      <div className='create-project-container'>
        <RenderLoading />
        {project.error && project.error !== 'Could not find that' && (
          <>
            <p className='error-message'> {project.error}</p>
          </>
        )}
        {updateProjectData ? (
          <h1>Update your project</h1>
        ) : (
          <h1>Add a project</h1>
        )}
        <div>
          <div className='create-project-input-container'>
            <label>Project's name</label>
            <input
              type='text'
              onChange={e => setProjectName(e.target.value)}
              value={projectName}
            />
          </div>
          <div className='create-project-input-container'>
            <label>Project's description</label>
            <input
              placeholder='What is this project about?'
              type='text'
              onChange={e => setProjectDescription(e.target.value)}
              value={projectDescription}
            />
          </div>

          <div className='create-project-input-container'>
            <label>Project's technologies</label>
            {projectTechnologies.map((technology, index) => (
              <>
                <div key={index}>
                  <input
                    type='text'
                    name='technology'
                    placeholder='Php, Python, React, Django'
                    onChange={e => handleTechnologyChange(e, index)}
                    value={technology.technology}
                  />
                  {projectTechnologies.length - 1 === index && (
                    <button
                      className='add-tech-btn'
                      onClick={handleAddProjectTechnology}
                    >
                      <i className='fa-solid fa-plus'></i>
                    </button>
                  )}
                  {projectTechnologies.length - index - 1 && (
                    <button
                      className='remove-tech-btn'
                      onClick={() => handleRemoveProjectTechnology(index)}
                    >
                      <i className='fa-solid fa-ban'></i>
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
          <div className='create-project-input-container'>
            <label>Project's Site</label>
            <input
              type='url'
              placeholder='www.mysite.com'
              onChange={e => setProjectSite(e.target.value)}
              value={projectSite}
            />
          </div>
          <div className='create-project-input-container'>
            <label>Project type</label>
            <input
              type='text'
              placeholder='Containerization, Backend, Shell, e.t.c...'
              onChange={e => setProjectType(e.target.value)}
              value={projectType}
            />
          </div>
          <div className='create-project-input-container'>
            <label>Project's Github</label>
            <input
              type='url'
              placeholder='Github Url'
              onChange={e => setProjectGitUrl(e.target.value)}
              value={projectGitUrl}
            />
          </div>
          {!updateProjectData && (
            <div className='project-file-container'>
              <label>Project's image(s)</label>
              <input
                type='file'
                name='projectImage'
                onChange={e => setProjectImages([...e.target.files])}
                multiple
              />
            </div>
          )}
        </div>
        {updateProjectData ? (
          <button onClick={updateProject}>Update project</button>
        ) : (
          <button onClick={createProject}>Create project</button>
        )}
      </div>
    </>
  )
}

export default CreateProjectPage
