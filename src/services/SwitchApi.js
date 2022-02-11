import http from "./http-common";


class SwitchApi {
  getCalculatorThemeInfo(credentials) {
      return http.get(`/calculator/client/${credentials}`)
  }
  getCalculatorInfo(credentials) {
    return http.get(`/calculator/client/info/${credentials}`)
}

getCalculatorQuestions(credentials) {
  return http.get(`/calculator/client/questions/${credentials}`)
}

sendResults(data) {
  return http.post('/results', data)
}
}

const API = new SwitchApi()
const getCalculatorInfo = API.getCalculatorInfo
const getCalculatorThemeInfo = API.getCalculatorInfo
const getCalculatorQuestions = API.getCalculatorQuestions
const sendResults = API.sendResults

export default API;
export { API as SwitchApi, sendResults, getCalculatorInfo, getCalculatorThemeInfo, getCalculatorQuestions}
