import { get, post } from "../utils/request";
import { lyPrefix } from "../utils/config";

// 其他站点页面 -- 站点下拉
export function otherSite(data) {
  return post(
    lyPrefix + "/deptwave-system/bas-forecast-from-website/getSiteInfoList",
    data
  );
}
// 其他站点页面 -- 来源下拉
export function otherSource() {
  return get(
    lyPrefix + "/deptwave-system/bas-forecast-from-website/getWebInfoList"
  );
}

//常用20站点
export function getChosenSiteInfoList() {
  return get(
    lyPrefix + "/deptwave-system/bas-forecast-from-website/getChosenSiteInfoList"
  );
}


// 其他站点页面 -- 预测水位数据
export function otherforecast(data) {
  return post(
    lyPrefix + "/deptwave-system/bas-forecast-from-website/getOtherWebSiteList",
    data
  );
}
// 其他站点导出功能    http://localhost:8113/api/v1/deptwave-system/bas-forecast-from-website/excel
export function otherExport(data) {
  return post(
    lyPrefix + "/deptwave-system/bas-forecast-from-website/excel",
    data
  );
}
// 人工站点导出功能    http://localhost:8113/api/v1/deptwave-system/bas-forecast-from-website/excel
export function ManExport(data) {
  return post(lyPrefix + "/deptwave-system/bas-forecast-hand/excel", data);
}

// 水位预测结果分析对比对比人工预测 图表
export function forecastByIdlistMan(data) {
  return post(
    lyPrefix + "/deptwave-system/bas-forecast-result/forecastByIdlistMan",
    data
  );
}

// 预测水位站点下拉
export function basInfo() {
  return post(lyPrefix + "/deptwave-system/bas-forecast-hand/bas-site-info");
}
// 获取人工预测水位数据列表
export function basHandList(data) {
  return post(
    lyPrefix + "/deptwave-system/bas-forecast-hand/bas-forecast-hand-list",
    data
  );
}

// 七天水位预测页面 --- 7天模型预测水位数据 (预测指标)
export function get7WaterForecastAnalysisList(data) {
  print("getdata1");
  return (
    // lyPrefix +
    //   "/deptwave-system/bas-7-water-forecast-result/get7WaterForecastAnalysisList",
    // data
    {
      "averageDeviationThan": 0.31,
      "averageDeviationNub": 0.26,
      "averageCoefficient": -73.48,
      "dateList": [
          {
              "measureTime": "2024-01-05 09",
              "siteName": null,
              "measureWater85": 166.79,
              "t": 166.81,
              "t1": 166.83,
              "t2": 166.99,
              "t3": 167.03,
              "t4": 167.12,
              "t5": 167.26,
              "t6": 167.23,
              "deviationNub": 0.25,
              "deviationThan": 0.298328677803525954548291565515683032572269439697265625
          },
          {
              "measureTime": "2024-01-05 10",
              "siteName": null,
              "measureWater85": 166.78,
              "t": 166.8,
              "t1": 166.82,
              "t2": 167.0,
              "t3": 167.02,
              "t4": 167.12,
              "t5": 167.26,
              "t6": 167.22,
              "deviationNub": 0.25,
              "deviationThan": 0.304138126514910955844328555031097494065761566162109375
          },
          {
              "measureTime": "2024-01-05 11",
              "siteName": null,
              "measureWater85": 166.8,
              "t": 166.79,
              "t1": 166.81,
              "t2": 166.99,
              "t3": 167.01,
              "t4": 167.1,
              "t5": 167.25,
              "t6": 167.21,
              "deviationNub": 0.23,
              "deviationThan": 0.278028775489156887434916143320151604712009429931640625
          },
          {
              "measureTime": "2024-01-05 12",
              "siteName": null,
              "measureWater85": 166.79,
              "t": 166.79,
              "t1": 166.8,
              "t2": 166.98,
              "t3": 167.01,
              "t4": 167.1,
              "t5": 167.25,
              "t6": 167.22,
              "deviationNub": 0.23,
              "deviationThan": 0.287228132326901419713038876579958014190196990966796875
          },
          {
              "measureTime": "2024-01-05 13",
              "siteName": null,
              "measureWater85": 166.8,
              "t": 166.79,
              "t1": 166.81,
              "t2": 166.98,
              "t3": 167.0,
              "t4": 167.11,
              "t5": 167.25,
              "t6": 167.2,
              "deviationNub": 0.22,
              "deviationThan": 0.27549954627911821258834379477775655686855316162109375
          },
          {
              "measureTime": "2024-01-05 14",
              "siteName": null,
              "measureWater85": 166.77,
              "t": 166.78,
              "t1": 166.79,
              "t2": 166.98,
              "t3": 167.0,
              "t4": 167.1,
              "t5": 167.23,
              "t6": 167.2,
              "deviationNub": 0.24,
              "deviationThan": 0.293428015022424215629825994255952537059783935546875
          },
          {
              "measureTime": "2024-01-05 15",
              "siteName": null,
              "measureWater85": 166.77,
              "t": 166.78,
              "t1": 166.79,
              "t2": 166.97,
              "t3": 167.01,
              "t4": 167.11,
              "t5": 167.24,
              "t6": 167.2,
              "deviationNub": 0.24,
              "deviationThan": 0.29748949561287030274314702182891778647899627685546875
          },
          {
              "measureTime": "2024-01-05 16",
              "siteName": null,
              "measureWater85": 166.76,
              "t": 166.77,
              "t1": 166.8,
              "t2": 166.97,
              "t3": 167.0,
              "t4": 167.1,
              "t5": 167.24,
              "t6": 167.21,
              "deviationNub": 0.25,
              "deviationThan": 0.305122926047847131680867960312752984464168548583984375
          },
          {
              "measureTime": "2024-01-05 17",
              "siteName": null,
              "measureWater85": 166.76,
              "t": 166.78,
              "t1": 166.79,
              "t2": 166.97,
              "t3": 167.0,
              "t4": 167.09,
              "t5": 167.24,
              "t6": 167.21,
              "deviationNub": 0.25,
              "deviationThan": 0.303479818109870347342393870349042117595672607421875
          },
          {
              "measureTime": "2024-01-05 18",
              "siteName": null,
              "measureWater85": 166.73,
              "t": 166.77,
              "t1": 166.8,
              "t2": 166.98,
              "t3": 167.0,
              "t4": 167.1,
              "t5": 167.24,
              "t6": 167.2,
              "deviationNub": 0.28,
              "deviationThan": 0.329393381840012100525427740649320185184478759765625
          },
          {
              "measureTime": "2024-01-05 19",
              "siteName": null,
              "measureWater85": 166.74,
              "t": 166.78,
              "t1": 166.79,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.09,
              "t5": 167.24,
              "t6": 167.22,
              "deviationNub": 0.27,
              "deviationThan": 0.3212475680841802017084773979149758815765380859375
          },
          {
              "measureTime": "2024-01-05 20",
              "siteName": null,
              "measureWater85": 166.73,
              "t": 166.77,
              "t1": 166.8,
              "t2": 166.97,
              "t3": 167.0,
              "t4": 167.1,
              "t5": 167.24,
              "t6": 167.19,
              "deviationNub": 0.28,
              "deviationThan": 0.326343377441614401757163932416005991399288177490234375
          },
          {
              "measureTime": "2024-01-05 21",
              "siteName": null,
              "measureWater85": 166.74,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.97,
              "t3": 167.0,
              "t4": 167.08,
              "t5": 167.23,
              "t6": 167.19,
              "deviationNub": 0.26,
              "deviationThan": 0.31192947920964442243274561405996792018413543701171875
          },
          {
              "measureTime": "2024-01-05 22",
              "siteName": null,
              "measureWater85": 166.74,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.96,
              "t3": 166.98,
              "t4": 167.09,
              "t5": 167.23,
              "t6": 167.18,
              "deviationNub": 0.26,
              "deviationThan": 0.30822070014844882290816485692630521953105926513671875
          },
          {
              "measureTime": "2024-01-05 23",
              "siteName": null,
              "measureWater85": 166.73,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.95,
              "t3": 166.99,
              "t4": 167.09,
              "t5": 167.23,
              "t6": 167.17,
              "deviationNub": 0.27,
              "deviationThan": 0.314642654451045444830015185289084911346435546875
          },
          {
              "measureTime": "2024-01-06 00",
              "siteName": null,
              "measureWater85": 166.71,
              "t": 166.76,
              "t1": 166.77,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.09,
              "t5": 167.23,
              "t6": 167.17,
              "deviationNub": 0.29,
              "deviationThan": 0.333466640010661341531061907517141662538051605224609375
          },
          {
              "measureTime": "2024-01-06 01",
              "siteName": null,
              "measureWater85": 166.7,
              "t": 166.76,
              "t1": 166.77,
              "t2": 166.96,
              "t3": 166.98,
              "t4": 167.08,
              "t5": 167.23,
              "t6": 167.17,
              "deviationNub": 0.29,
              "deviationThan": 0.3382306905057552715021529365913011133670806884765625
          },
          {
              "measureTime": "2024-01-06 02",
              "siteName": null,
              "measureWater85": 166.69,
              "t": 166.76,
              "t1": 166.78,
              "t2": 166.96,
              "t3": 166.98,
              "t4": 167.08,
              "t5": 167.22,
              "t6": 167.17,
              "deviationNub": 0.3,
              "deviationThan": 0.345108678534747970179097364962217397987842559814453125
          },
          {
              "measureTime": "2024-01-06 03",
              "siteName": null,
              "measureWater85": 166.75,
              "t": 166.76,
              "t1": 166.78,
              "t2": 166.96,
              "t3": 166.99,
              "t4": 167.08,
              "t5": 167.22,
              "t6": 167.17,
              "deviationNub": 0.24,
              "deviationThan": 0.294957624075052493584081503286142833530902862548828125
          },
          {
              "measureTime": "2024-01-06 04",
              "siteName": null,
              "measureWater85": 166.75,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.98,
              "t3": 166.98,
              "t4": 167.07,
              "t5": 167.22,
              "t6": 167.18,
              "deviationNub": 0.25,
              "deviationThan": 0.296479341607471857944489102010265924036502838134765625
          },
          {
              "measureTime": "2024-01-06 05",
              "siteName": null,
              "measureWater85": 166.74,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.08,
              "t5": 167.23,
              "t6": 167.18,
              "deviationNub": 0.26,
              "deviationThan": 0.308706980808662601045710971447988413274288177490234375
          },
          {
              "measureTime": "2024-01-06 06",
              "siteName": null,
              "measureWater85": 166.72,
              "t": 166.76,
              "t1": 166.78,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.09,
              "t5": 167.23,
              "t6": 167.19,
              "deviationNub": 0.28,
              "deviationThan": 0.329241552663086578522921854528249241411685943603515625
          },
          {
              "measureTime": "2024-01-06 07",
              "siteName": null,
              "measureWater85": 166.74,
              "t": 166.78,
              "t1": 166.79,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.08,
              "t5": 167.24,
              "t6": 167.19,
              "deviationNub": 0.27,
              "deviationThan": 0.31336879231984793303666947394958697259426116943359375
          },
          {
              "measureTime": "2024-01-06 08",
              "siteName": null,
              "measureWater85": 166.71,
              "t": 166.77,
              "t1": 166.78,
              "t2": 166.97,
              "t3": 166.99,
              "t4": 167.08,
              "t5": 167.23,
              "t6": 167.18,
              "deviationNub": 0.29,
              "deviationThan": 0.334365069946009729751068562109139747917652130126953125
          }
      ]
  }
  );
}
// 七天水位预测页面 --- 预测水位数据对比图表
export function get7WaterForecastAnalysisListForChart(data) {
  print("getdata2");
  return (
    {
      "returnList": [
          {
              "date": "2024-01-05 09",
              "measureLevel": 166.79,
              "T": 166.81,
              "T_2": 166.99,
              "T_1": 166.83,
              "T_4": 167.12,
              "T_3": 167.03,
              "T_6": 167.23,
              "T_5": 167.26
          },
          {
              "date": "2024-01-05 10",
              "measureLevel": 166.78,
              "T": 166.8,
              "T_2": 167.0,
              "T_1": 166.82,
              "T_4": 167.12,
              "T_3": 167.02,
              "T_6": 167.22,
              "T_5": 167.26
          },
          {
              "date": "2024-01-05 11",
              "measureLevel": 166.8,
              "T": 166.79,
              "T_2": 166.99,
              "T_1": 166.81,
              "T_4": 167.1,
              "T_3": 167.01,
              "T_6": 167.21,
              "T_5": 167.25
          },
          {
              "date": "2024-01-05 12",
              "measureLevel": 166.79,
              "T": 166.79,
              "T_2": 166.98,
              "T_1": 166.8,
              "T_4": 167.1,
              "T_3": 167.01,
              "T_6": 167.22,
              "T_5": 167.25
          },
          {
              "date": "2024-01-05 13",
              "measureLevel": 166.8,
              "T": 166.79,
              "T_2": 166.98,
              "T_1": 166.81,
              "T_4": 167.11,
              "T_3": 167.0,
              "T_6": 167.2,
              "T_5": 167.25
          },
          {
              "date": "2024-01-05 14",
              "measureLevel": 166.77,
              "T": 166.78,
              "T_2": 166.98,
              "T_1": 166.79,
              "T_4": 167.1,
              "T_3": 167.0,
              "T_6": 167.2,
              "T_5": 167.23
          },
          {
              "date": "2024-01-05 15",
              "measureLevel": 166.77,
              "T": 166.78,
              "T_2": 166.97,
              "T_1": 166.79,
              "T_4": 167.11,
              "T_3": 167.01,
              "T_6": 167.2,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 16",
              "measureLevel": 166.76,
              "T": 166.77,
              "T_2": 166.97,
              "T_1": 166.8,
              "T_4": 167.1,
              "T_3": 167.0,
              "T_6": 167.21,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 17",
              "measureLevel": 166.76,
              "T": 166.78,
              "T_2": 166.97,
              "T_1": 166.79,
              "T_4": 167.09,
              "T_3": 167.0,
              "T_6": 167.21,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 18",
              "measureLevel": 166.73,
              "T": 166.77,
              "T_2": 166.98,
              "T_1": 166.8,
              "T_4": 167.1,
              "T_3": 167.0,
              "T_6": 167.2,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 19",
              "measureLevel": 166.74,
              "T": 166.78,
              "T_2": 166.97,
              "T_1": 166.79,
              "T_4": 167.09,
              "T_3": 166.99,
              "T_6": 167.22,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 20",
              "measureLevel": 166.73,
              "T": 166.77,
              "T_2": 166.97,
              "T_1": 166.8,
              "T_4": 167.1,
              "T_3": 167.0,
              "T_6": 167.19,
              "T_5": 167.24
          },
          {
              "date": "2024-01-05 21",
              "measureLevel": 166.74,
              "T": 166.77,
              "T_2": 166.97,
              "T_1": 166.78,
              "T_4": 167.08,
              "T_3": 167.0,
              "T_6": 167.19,
              "T_5": 167.23
          },
          {
              "date": "2024-01-05 22",
              "measureLevel": 166.74,
              "T": 166.77,
              "T_2": 166.96,
              "T_1": 166.78,
              "T_4": 167.09,
              "T_3": 166.98,
              "T_6": 167.18,
              "T_5": 167.23
          },
          {
              "date": "2024-01-05 23",
              "measureLevel": 166.73,
              "T": 166.77,
              "T_2": 166.95,
              "T_1": 166.78,
              "T_4": 167.09,
              "T_3": 166.99,
              "T_6": 167.17,
              "T_5": 167.23
          },
          {
              "date": "2024-01-06 00",
              "measureLevel": 166.71,
              "T": 166.76,
              "T_2": 166.97,
              "T_1": 166.77,
              "T_4": 167.09,
              "T_3": 166.99,
              "T_6": 167.17,
              "T_5": 167.23
          },
          {
              "date": "2024-01-06 01",
              "measureLevel": 166.7,
              "T": 166.76,
              "T_2": 166.96,
              "T_1": 166.77,
              "T_4": 167.08,
              "T_3": 166.98,
              "T_6": 167.17,
              "T_5": 167.23
          },
          {
              "date": "2024-01-06 02",
              "measureLevel": 166.69,
              "T": 166.76,
              "T_2": 166.96,
              "T_1": 166.78,
              "T_4": 167.08,
              "T_3": 166.98,
              "T_6": 167.17,
              "T_5": 167.22
          },
          {
              "date": "2024-01-06 03",
              "measureLevel": 166.75,
              "T": 166.76,
              "T_2": 166.96,
              "T_1": 166.78,
              "T_4": 167.08,
              "T_3": 166.99,
              "T_6": 167.17,
              "T_5": 167.22
          },
          {
              "date": "2024-01-06 04",
              "measureLevel": 166.75,
              "T": 166.77,
              "T_2": 166.98,
              "T_1": 166.78,
              "T_4": 167.07,
              "T_3": 166.98,
              "T_6": 167.18,
              "T_5": 167.22
          },
          {
              "date": "2024-01-06 05",
              "measureLevel": 166.74,
              "T": 166.77,
              "T_2": 166.97,
              "T_1": 166.78,
              "T_4": 167.08,
              "T_3": 166.99,
              "T_6": 167.18,
              "T_5": 167.23
          },
          {
              "date": "2024-01-06 06",
              "measureLevel": 166.72,
              "T": 166.76,
              "T_2": 166.97,
              "T_1": 166.78,
              "T_4": 167.09,
              "T_3": 166.99,
              "T_6": 167.19,
              "T_5": 167.23
          },
          {
              "date": "2024-01-06 07",
              "measureLevel": 166.74,
              "T": 166.78,
              "T_2": 166.97,
              "T_1": 166.79,
              "T_4": 167.08,
              "T_3": 166.99,
              "T_6": 167.19,
              "T_5": 167.24
          },
          {
              "date": "2024-01-06 08",
              "measureLevel": 166.71,
              "T": 166.77,
              "T_2": 166.97,
              "T_1": 166.78,
              "T_4": 167.08,
              "T_3": 166.99,
              "T_6": 167.18,
              "T_5": 167.23
          }
      ]
  }
  );
}

// 七天水位预测页面 --- 7天水位人工预测对比 （预测指标）
export function ListMan(data) {
  print("getdata3");
  return (
    {
      "averageDeviationThan": 0.33,
      "averageDeviationNub": 0.29,
      "averageCoefficient": "--",
      "dateList": [
          {
              "measureTime": "2024-01-06 08",
              "siteName": "万州站",
              "measureWater85": 166.71,
              "deviationNub": 0.29,
              "deviationThan": 0.1118,
              "t1": 166.77,
              "t2": 166.78,
              "t3": 166.97,
              "t4": 166.99,
              "t5": 167.08,
              "t6": 167.23,
              "t7": 167.18
          }
      ]
    }
  );
}
//  7天水位预测页面 --- 7天水位人工预测对比 图表
export function ForChartMan(data) {
  print("getdata4");
  return (
    {
      "returnList": [
          {
              "date": "2024-01-06 08",
              "measureLevel": 166.71,
              "T_2": 166.78,
              "T_1": 166.77,
              "T_4": 166.99,
              "T_3": 166.97,
              "T_6": 167.23,
              "T_5": 167.08,
              "T_7": 167.18
          }
      ]
  }
  );
}

// 7天人工表格数据
export function get7WaterForecastAnalysisListManFormat(data) {
  print("getdata5");
  return (
    [
      {
          "measureTime": "2024-01-06 08",
          "siteName": "万州站",
          "measureWater85": 166.71,
          "deviationNub": 0.29,
          "deviationThan": 0.1118,
          "t1": 166.77,
          "t2": 166.78,
          "t3": 166.97,
          "t4": 166.99,
          "t5": 167.08,
          "t6": 167.23,
          "t7": 167.18
      }
  ]
  );
}
// 7天模型表格数据
export function get7WaterForecastAnalysisListFormat(data) {
  print("getdata6");
  return (
    [
      {
          "measureTime": "2024-01-05 09",
          "siteName": null,
          "measureWater85": 166.79,
          "t": 166.81,
          "t1": 166.83,
          "t2": 166.99,
          "t3": 167.03,
          "t4": 167.12,
          "t5": 167.26,
          "t6": 167.23,
          "deviationNub": 0.25,
          "deviationThan": 0.089
      },
      {
          "measureTime": "2024-01-05 10",
          "siteName": null,
          "measureWater85": 166.78,
          "t": 166.8,
          "t1": 166.82,
          "t2": 167.0,
          "t3": 167.02,
          "t4": 167.12,
          "t5": 167.26,
          "t6": 167.22,
          "deviationNub": 0.25,
          "deviationThan": 0.0925
      },
      {
          "measureTime": "2024-01-05 11",
          "siteName": null,
          "measureWater85": 166.8,
          "t": 166.79,
          "t1": 166.81,
          "t2": 166.99,
          "t3": 167.01,
          "t4": 167.1,
          "t5": 167.25,
          "t6": 167.21,
          "deviationNub": 0.23,
          "deviationThan": 0.0773
      },
      {
          "measureTime": "2024-01-05 12",
          "siteName": null,
          "measureWater85": 166.79,
          "t": 166.79,
          "t1": 166.8,
          "t2": 166.98,
          "t3": 167.01,
          "t4": 167.1,
          "t5": 167.25,
          "t6": 167.22,
          "deviationNub": 0.23,
          "deviationThan": 0.0825
      },
      {
          "measureTime": "2024-01-05 13",
          "siteName": null,
          "measureWater85": 166.8,
          "t": 166.79,
          "t1": 166.81,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.11,
          "t5": 167.25,
          "t6": 167.2,
          "deviationNub": 0.22,
          "deviationThan": 0.0759
      },
      {
          "measureTime": "2024-01-05 14",
          "siteName": null,
          "measureWater85": 166.77,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.23,
          "t6": 167.2,
          "deviationNub": 0.24,
          "deviationThan": 0.0861
      },
      {
          "measureTime": "2024-01-05 15",
          "siteName": null,
          "measureWater85": 166.77,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 167.01,
          "t4": 167.11,
          "t5": 167.24,
          "t6": 167.2,
          "deviationNub": 0.24,
          "deviationThan": 0.0885
      },
      {
          "measureTime": "2024-01-05 16",
          "siteName": null,
          "measureWater85": 166.76,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.21,
          "deviationNub": 0.25,
          "deviationThan": 0.0931
      },
      {
          "measureTime": "2024-01-05 17",
          "siteName": null,
          "measureWater85": 166.76,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.09,
          "t5": 167.24,
          "t6": 167.21,
          "deviationNub": 0.25,
          "deviationThan": 0.0921
      },
      {
          "measureTime": "2024-01-05 18",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.2,
          "deviationNub": 0.28,
          "deviationThan": 0.1085
      },
      {
          "measureTime": "2024-01-05 19",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.24,
          "t6": 167.22,
          "deviationNub": 0.27,
          "deviationThan": 0.1032
      },
      {
          "measureTime": "2024-01-05 20",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.19,
          "deviationNub": 0.28,
          "deviationThan": 0.1065
      },
      {
          "measureTime": "2024-01-05 21",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.19,
          "deviationNub": 0.26,
          "deviationThan": 0.0973
      },
      {
          "measureTime": "2024-01-05 22",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.26,
          "deviationThan": 0.095
      },
      {
          "measureTime": "2024-01-05 23",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.95,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.27,
          "deviationThan": 0.099
      },
      {
          "measureTime": "2024-01-06 00",
          "siteName": null,
          "measureWater85": 166.71,
          "t": 166.76,
          "t1": 166.77,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.29,
          "deviationThan": 0.1112
      },
      {
          "measureTime": "2024-01-06 01",
          "siteName": null,
          "measureWater85": 166.7,
          "t": 166.76,
          "t1": 166.77,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.29,
          "deviationThan": 0.1144
      },
      {
          "measureTime": "2024-01-06 02",
          "siteName": null,
          "measureWater85": 166.69,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.08,
          "t5": 167.22,
          "t6": 167.17,
          "deviationNub": 0.3,
          "deviationThan": 0.1191
      },
      {
          "measureTime": "2024-01-06 03",
          "siteName": null,
          "measureWater85": 166.75,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.22,
          "t6": 167.17,
          "deviationNub": 0.24,
          "deviationThan": 0.087
      },
      {
          "measureTime": "2024-01-06 04",
          "siteName": null,
          "measureWater85": 166.75,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.98,
          "t3": 166.98,
          "t4": 167.07,
          "t5": 167.22,
          "t6": 167.18,
          "deviationNub": 0.25,
          "deviationThan": 0.0879
      },
      {
          "measureTime": "2024-01-06 05",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.26,
          "deviationThan": 0.0953
      },
      {
          "measureTime": "2024-01-06 06",
          "siteName": null,
          "measureWater85": 166.72,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.19,
          "deviationNub": 0.28,
          "deviationThan": 0.1084
      },
      {
          "measureTime": "2024-01-06 07",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.24,
          "t6": 167.19,
          "deviationNub": 0.27,
          "deviationThan": 0.0982
      },
      {
          "measureTime": "2024-01-06 08",
          "siteName": null,
          "measureWater85": 166.71,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.29,
          "deviationThan": 0.1118
      }
  ]
  );
}

// 用户管理 -- 角色下拉
export function getRoleList() {
  return get(lyPrefix + "/deptwave-system/sys-user/getRoleList");
}
// 用户管理  用户列表
export function getUserList(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/getUserList", data);
}
// 用户管理 删除用户
export function deleteUser(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/deleteUser", data);
}
// 用户管理 修改角色
export function updateUserRole(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/updateUserRole", data);
}
// 用户管理 修改密码
export function updateUserPwd(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/updateUserPwd", data);
}
// 用户管理 新增用户
export function insertUser(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/insertUser", data);
}
// 用户列表  导出
export function UserExcel(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/excel", data);
}
// 用户管理  修改用户开启状态
export function updateUserValid(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/updateUserValid", data);
}

// 获取验证码
export function captchaImage() {
  return get(lyPrefix + "/deptwave-system/bas-kaptcha/captchaImage");
}
// 登陆
export function loginGo(data) {
  return post(lyPrefix + "/deptwave-auth/login/login", data);
}
// 获取当前用户
export function getUser() {
  return get(lyPrefix + "/deptwave-system/sys-user/getUser");
}
// 验证旧密码
export function checkUserPwd(data) {
  return post(lyPrefix + "/deptwave-system/sys-user/checkUserPwd", data);
}
