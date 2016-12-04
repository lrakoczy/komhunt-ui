import { Component, OnChanges, Input } from '@angular/core';

declare var require: any;

import * as Highcharts from 'highcharts';

import { IPrediction } from './prediction';
import { IPredictionData } from './prediction-data';
import { ISegment } from './segment';

@Component({
  selector: 'my-prediction-chart',
  templateUrl: './prediction-chart.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionChartComponent implements OnChanges {

  @Input() prediction: IPrediction;

  private options: Object;

  ngOnChanges(): void {
    console.log('Setting chart properties');
    this.options = {
      title : {
        text : this.getTitle(this.prediction.segment)
      },
      subtitle : {
        text : this.getSubtitle(this.prediction.segment)
      },
      tooltip : {
        shared: true
      },
      xAxis : {
        type: 'datetime'
      },
      yAxis : [
        {
          id : 'speed',
          softMax : 30,
          title : {
            text : 'Wind speed (km/h)'
          }
        },
        {
          id : 'correlation',
          max : 180,
          title : {
            text : 'Wind direction correlation'
          },
          labels : {
            enabled : true
          },
          opposite : true
        }
      ],
      series: [
        {
          yAxis : 'speed',
          showInLegend : false,
          name : 'Wind speed',
          tooltip : {
            valueSuffix : ' km/h',
            valueDecimals : 2
          },
          data : this.getSpeedData(this.prediction.hourlyData)
        },
        {
          type : 'spline',
          yAxis : 'correlation',
          showInLegend : false,
          name : 'Direction correlation (deg)',
          tooltip : {
            valueSuffix : ' deg',
            valueDecimals : 0
          },
          data : this.getCorrelationData(this.prediction.hourlyData),
          marker : {
            symbol : 'circle',
            lineWidth : 1,
            lineColor : Highcharts.getOptions().colors[3],
            fillColor : 'white'
          }
        }
      ]
    };
 }

  private getColor(correlation: number): string {
    if (correlation < 45) {
      return 'red';
    } else if (correlation < 90) {
      return 'orange';
    } else if (correlation < 135) {
      return 'blue';
    } else {
      return 'green';
    }
  }

  private getSpeedData(dataArray: IPredictionData[]): Object {
    return dataArray.map((dp) => {
        return {
          color : this.getColor(dp.correlation),
          x : dp.time * 1000,
          y : dp.windSpeed * 1.609344
        };
      }
    );
  }

  private getCorrelationData(dataArray: IPredictionData[]): Object {
    return dataArray.map((dp) => {
        return {
          color : this.getColor(dp.correlation),
          x : dp.time * 1000,
          y : dp.correlation
        };
      }
    );
  }

  private getTitle(segment: ISegment): string {
    return `<a target="_blank" href="https://strava.com/segments/${segment.id}" title="Go to Strava segment page">${segment.name}</a>`;
  }

  private getSubtitle(segment: ISegment): string {
    let distance: string = (this.prediction.segment.distance / 1000).toFixed(2);
    let relevance: string = this.prediction.windRelevance.toFixed(2);
    return `Segment distance: ${distance} km, wind relevance: ${relevance} (min 0, max 1)`;
  }
}
