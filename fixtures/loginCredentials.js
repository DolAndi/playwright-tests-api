const jsons = {
      loginValid: {
        "email": "fulano@qa.com",
        "password": "teste"
      },
      blankEmail: {
        "email": "",
        "password": "teste"
      },
      blankPassword: {
        "email": "fulano@qa.com",
        "password": ""
      },
      noEmail: {
        "password": "teste"
      },
      noPassword: {
        "email": "fulano@qa.com"
      },
      noFields: {
  
      }
}

export default jsons;