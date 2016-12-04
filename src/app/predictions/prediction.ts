import { ISegment } from './segment';
import { IPredictionData } from './prediction-data';

export interface IPrediction {
    segment: ISegment;
    hourlyData: IPredictionData[];
    dailyData: IPredictionData[];
    windRelevance: number;
}
