import { get, post } from "../utils/request";
import {lyPrefix} from "../utils/config"
// 进行水位历史数据分页查询
export function  basWaterLevelPage(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-level/page",data)
}
//进行上传解析文件记录查询
export function  basFileUploadPage(data) {
  return post(lyPrefix+"/deptwave-system/sys-bas-fie-upload/page",data)
}
//进行水位预测记录查询
export function  basWaterLevelForecast(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-level-forecast/page",data)
}
//进行水位预测记录查询
export function  basWaterSiteForecast(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-site-forecast/page",data)
}
//进行其他厂商预测结果导入记录查询
export function  basWaterSiteForecastOther(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-forecast-other-m/page",data)
}
//进行其他厂商预测结果导入明细记录查询
export function  basWaterLevelForecastOther(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-forecast-other/page",data)
}
//进行其他厂商水位预测分析结果查询
export function  resultAnalysisOther(data) {
  return post(lyPrefix+"/deptwave-system/waterlevel-result-analysis/resultAnalysisOther",data)
}
//进行水位预测结果查询
export function  forecastByIdlistOther(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-level-other/forecastByIdlist",data)
}
//删除预测水位，并且删除预测结果
export function  delWaterLevelForecast(data) {
  return get(lyPrefix+"/deptwave-system/bas-water-level-forecast/remove/"+data,"")
}
//进行水位预测
export function  addbasWaterLevelForecast(data) {
  return post(lyPrefix+"/deptwave-system/bas-water-level-forecast/add",data)
}
//进行水位预测结果查询
export function  basForecastResultPage(data) {
  return post(lyPrefix+"/deptwave-system/bas-forecast-result/page",data)
}
//进行水位预测结果修改
export function  modifyBasForecastResult(data) {
  return post(lyPrefix+"/deptwave-system/bas-forecast-result/modify",data)
}
//进行水位预测结果查询
export function  forecastByIdlist(data) {
  return post(lyPrefix+"/deptwave-system/bas-forecast-result/forecastByIdlist",data)
}

//进行水位预测分析结果查询
export function  resultAnalysis(data) {
  return post(lyPrefix+"/deptwave-system/waterlevel-result-analysis/resultAnalysis",data)
}

//进行通用代码查询
export function  queryDataByTypeCode(data) {
  return get(lyPrefix+"/deptwave-system/dtwave-bd-dictionary-data/queryDataByTypeCode",data)
}
/**
 * 获取列表
 * @param {*} page
 */
export function listApi(page) {
  console.log("page", page)
  return get(lyPrefix+"/api/v1/admin/products", { id: page.id, per: 20 });
}