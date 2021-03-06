import PropTypes from 'prop-types'


const JobShape = {
  id: PropTypes.number,
  name: PropTypes.string,
  state: PropTypes.string,
  appTitle: PropTypes.string,
  workflowTitle: PropTypes.string,
  instanceType: PropTypes.string,
  duration: PropTypes.string,
  energyConsumption: PropTypes.string,
  createdAt: PropTypes.string,
  scope: PropTypes.string,
  links: PropTypes.object,
}

const mapToJob = (data) => {
  return {
    id: data.id,
    name: data.name,
    state: data.state,
    appTitle: data.app_title,
    workflowTitle: data.workflow_title,
    instanceType: data.instance_type,
    duration: data.duration,
    energyConsumption: data.energy_consumption,
    createdAt: data.created_at,
    scope: data.scope,
    links: data.links,
  }
}

export default JobShape

export {
  JobShape,
  mapToJob,
}
