export const get = () => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: 1,
        title: 'Create Api',
        description: 'Create an api to serve this data.',
        done: false,
      },
      {
        id: 2,
        title: 'Update a done status',
        description: 'Create a way to persist updates to complete the Create Api item.'
      },
      {
        id: 3,
        title: 'Create App',
        description: 'Create a react app to display this data'
      }
    ])
  }
}