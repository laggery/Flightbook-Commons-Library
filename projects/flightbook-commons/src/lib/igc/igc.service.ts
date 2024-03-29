import { Injectable } from '@angular/core';
import { Flight } from '../flight/flight';
import { Igc } from './igc';
import * as IGCParser from 'igc-parser';
import { scoringRules as scoring, solver } from 'igc-xc-score';
import { GliderService } from '../glider/glider.service';

@Injectable({
  providedIn: 'root'
})
export class IgcService {

  constructor(private gliderService: GliderService) { }

  async getIgcFileContentAndPrefillFlight(flight: Flight, igcFile: File, override = true): Promise<string> {
    const igcData = await this.readFileAsync(igcFile);

    if (typeof igcData === 'string') {
      const igc = new Igc();
      const igcFile: any = IGCParser.parse(igcData, { lenient: true });
      const result = solver(igcFile, scoring.XCScoring, {}).next().value;
      if (result.optimal) {
        if (override) {
          flight.km = result.scoreInfo.distance;
        }
        igc.start = result.scoreInfo.ep?.start;
        igc.landing = result.scoreInfo.ep?.finish;
        igc.tp = result.scoreInfo.tp;
      }

      if (override) {
        flight.date = igcFile.date;
        flight.start.name = igcFile.site;
        const timeInMillisecond = (igcFile.ll[0].landing - igcFile.ll[0].launch) * 1000
        flight.time = new Date(timeInMillisecond).toISOString().substr(11, 8);
        if (igcFile.gliderType && igcFile.gliderType != '') {
          flight.glider = await this.gliderService.getGliderByName(igcFile.gliderType).toPromise();
        }
      }

      flight.igc = igc;

      return igcData;
    }
    return null;
  }

  private readFileAsync(file): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsText(file);
    })
  }
}
