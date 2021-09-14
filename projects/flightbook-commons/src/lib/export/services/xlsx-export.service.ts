import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Flight } from '../../flight/flight';
import { Glider } from '../../glider/glider';
import { Place } from '../../place/place';
import { HoursFormatPipe } from '../../commons/application-pipes/hours-format/hours-format.pipe';
import { TranslateService } from '@ngx-translate/core';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxExportService {

  constructor(private translate: TranslateService) { }

  public generateFlightsXlsxFile(flights: Flight[], writeOptions: XLSX.WritingOptions): any {
    return this.generateFlightbookXlsxFile(flights, null, null, writeOptions);
  }

  public generateGlidersXlsxFile(gliders: Glider[], writeOptions: XLSX.WritingOptions): any {
    return this.generateFlightbookXlsxFile(null, gliders, null, writeOptions);
  }

  public generatePlacesXlsxFile(places: Place[], writeOptions: XLSX.WritingOptions): any {
    return this.generateFlightbookXlsxFile(null, null, places, writeOptions);
  }

  public generateFlightbookXlsxFile(flights: Flight[], gliders: Glider[], places: Place[], writeOptions: XLSX.WritingOptions): any {
    if (!flights && !gliders && !places) {
      return null;
    }
    let workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    if (flights) {
      workbook.Sheets.flights = this.flightSheet(flights);
      workbook.SheetNames.push('flights');
    }

    if (gliders) {
      workbook.Sheets.gliders = this.gliderSheet(gliders);
      workbook.SheetNames.push('gliders');
    }

    if (places) {
      workbook.Sheets.places = this.placeSheet(places);
      workbook.SheetNames.push('places');
    }

    const data: any = XLSX.write(workbook, writeOptions);
    return data;
  }

  public saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private flightSheet(flights: Flight[]): XLSX.WorkSheet {
    let list: any = [];
    flights.forEach((flight: Flight) => {
      let flatFlight: any = [];
      flatFlight[this.translate.instant('flight.number')] = flight.number;
      flatFlight[this.translate.instant('flight.date')] = moment(flight.date).format('DD.MM.YYYY');
      flatFlight[this.translate.instant('flight.start')] = flight.start?.name;
      flatFlight[this.translate.instant('flight.landing')] = flight.landing?.name;
      flatFlight[this.translate.instant('flight.time')] = flight.time;
      flatFlight[this.translate.instant('flight.km')] = flight.km;
      flatFlight[this.translate.instant('flight.price')] = flight.price;
      flatFlight[this.translate.instant('flight.description')] = flight.description;
      flatFlight[this.translate.instant('flight.glider')] = `${flight.glider.brand} ${flight.glider.name}`;
      flatFlight[this.translate.instant('glider.tandem')] = (flight.glider.tandem) ? this.translate.instant('buttons.yes') : this.translate.instant('buttons.no');
      flatFlight[this.translate.instant('flight.igcFile')] = flight.igc?.filepath;
      list.push(flatFlight);
    })

    return XLSX.utils.json_to_sheet(list);
  }

  private gliderSheet(gliders: Glider[]): XLSX.WorkSheet {
    let list: any = [];
    gliders.forEach((glider: Glider) => {
      let flatGlider: any = [];
      flatGlider[this.translate.instant('glider.brand')] = glider.brand;
      flatGlider[this.translate.instant('glider.name')] = glider.name;
      flatGlider[this.translate.instant('glider.buydate')] = (glider.buyDate) ? moment(glider.buyDate).format('DD.MM.YYYY') : "-";
      flatGlider[this.translate.instant('glider.tandem')] = (glider.tandem) ? this.translate.instant('buttons.yes') : this.translate.instant('buttons.no');
      flatGlider[this.translate.instant('statistics.nbflight')] = glider.nbFlights;
      flatGlider[this.translate.instant('statistics.flighthour')] = new HoursFormatPipe().transform(glider.time);
      list.push(flatGlider);
    })

    return XLSX.utils.json_to_sheet(list);
  }

  private placeSheet(places: Place[]): XLSX.WorkSheet {
    let list: any = [];
    places.forEach((place: Place) => {
      let flatPlace: any = [];
      flatPlace[this.translate.instant('place.name')] = place.name;
      flatPlace[this.translate.instant('place.altitude')] = place.altitude;
      list.push(flatPlace);
    })

    return XLSX.utils.json_to_sheet(list);
  }
}
