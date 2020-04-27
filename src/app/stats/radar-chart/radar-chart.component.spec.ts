import {RadarChartComponent} from './radar-chart.component';
import {StatsService} from '../stats.service';

class MockStatsService {
  convertToWinPercentages() {
  }
}

describe('RadarChartComponent', () => {

  it('should create', () => {
    const component = new RadarChartComponent(new MockStatsService() as any as StatsService);
    expect(component).toBeTruthy();
  });
});
