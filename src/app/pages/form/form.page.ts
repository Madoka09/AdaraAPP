import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { CallApiService } from '../../services/call-api.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  name: string;
  age: string;
  size: any;
  weight: any;
  date: string;
  reason: any;
  pregnant: any;
  lactancy: any;
  menopause: any;
  illness: any;
  medication: any;
  surgery: any;
  alergies: any;
  noAlergies: any;
  alergyReason: any;
  exercise: any;
  noExercise: any;
  exerciseType: any;
  exerciseFreq: any;
  exerciseTime: any;
  alcohol: any;
  noAlcohol: any;
  alcoholFreq: any;
  tobacco: any;
  noTobacco: any;
  drugs: any;
  hatedFood: any;
  foodHome: any;
  noFoodHome: any;
  period: any;
  birth: any;
  email: any;
  pregWeeks: any;
  agoControl: any;

  formulary: any = [];

  pdfObj = null;

  constructor(private platform: Platform, private file: File, private fileOpener: FileOpener,
              public loading: LoadingController, public toastC: ToastController, public callApi: CallApiService,
              private router: Router) { }

  ngOnInit() {
  }

  createJson() {
    this.booleanFilter();
  }

  calculatePregnancyWeeks() {
    const todayDate = new Date();

    // Crear fechas
    const periodDate = new Date(this.period);

    // Obtener diferencia de milisegundos entre dos fechas
    let weekDiff = (todayDate.getTime() - periodDate.getTime()) / 1000;
    weekDiff /= (60 * 60 * 24 * 7);
    this.pregWeeks = Math.abs(Math.round(weekDiff));

  }

  booleanFilter() {
    // Para valores de AGO
    if (this.pregnant === true) {
      this.pregnant = 'POSITIVO';
    } else {
      this.pregnant = 'NEGATIVO';
      this.birth = '-';
      this.pregWeeks = '-';
    }

    if (this.lactancy === true) {
      this.lactancy = 'POSITIVO';
    } else {
      this.lactancy = 'NEGATIVO';
    }

    if (this.menopause === true) {
      this.menopause = 'POSITIVO';
    } else {
      this.menopause = 'NEGATIVO';
    }

    // Para valores de Alergias
    if (this.alergies === true || this.noAlergies === false || this.noAlergies === undefined) {
      this.alergies = 'POSITIVO';
    } else {
      this.alergies = 'NEGATIVO';
      this.alergyReason = 'Sin alergias en específico';
    }

    // Para valores de Ejercicio
    if (this.exercise === true || this.noExercise === false || this.noExercise === undefined) {
      this.exercise = 'POSITIVO';
    } else {
      this.exercise = 'NEGATIVO';
      this.exerciseTime = '-';
      this.exerciseType = '-';
      this.exerciseFreq = '-';
    }

    // Para valores de Alcohol
    if (this.alcohol === true || this.noAlcohol === false || this.noAlcohol === undefined) {
      this.alcohol = 'POSITIVO';
    } else {
      this.alcohol = 'NEGATIVO';
      this.alcoholFreq = '-';
    }

    // Para valores de Tabaco
    if (this.tobacco === true || this.noTobacco === false || this.noTobacco === undefined) {
      this.tobacco = 'POSITIVO';
    } else {
      this.tobacco = 'NEGATIVO';
    }

    // Para valores de desayuno en casa
    if (this.foodHome === true || this.noFoodHome === false || this.noFoodHome === undefined) {
      this.foodHome = 'POSITIVO';
    } else {
      this.foodHome = 'NEGATIVO';
    }
  }

  calculateBirth() {
    // Extraer dia, mes y año de la fecha del periodo
    const periodDayStep1 = this.period.split('-')[2];
    const periodDayStep2 = periodDayStep1.split('T')[0];
    const periodMonth = this.period.split('-')[1];
    const periodYear = this.period.split('-')[0];

    // Aplicar regla de Naegele

    // Comprobar maximo de dias
    if (periodDayStep2 >= 24 ) {
      const birthDay = ((parseInt(periodDayStep2) + 7) - 30 ) + 1;
      const birthYear = parseInt(periodYear) + 1;
      const birthMonth = parseInt(periodMonth) - 2;
      this.birth = `${birthDay}-${birthMonth}-${birthYear}`;
    } else {
      if (periodMonth >= 4) {
        const birthDay = parseInt(periodDayStep2) + 7;
        const birthYear = parseInt(periodYear) + 1;
        const birthMonth = parseInt(periodMonth) - 3;
        this.birth = `${birthDay}-${birthMonth}-${birthYear}`;
      } else {
        const birthDay = parseInt(periodDayStep2) + 7;
        const birthYear = parseInt(periodYear);
        const birthMonth = parseInt(periodMonth) + 9;
        this.birth = `${birthDay}-${birthMonth}-${birthYear}`;
      }
    }

    // Calcular semanas de Embarazo
    this.calculatePregnancyWeeks();
  }

  async createPdf() {
    const loading = await this.loading.create({
      message: 'Generando Documento...'
    });
    await loading.present();
    this.createJson();

    // Manipulación de valores a valores entendibles para el usuario
    // Dar formato a la fecha (yyyyMMdd)
    const formattedDate = this.date.split('T');

    var docDef = {
      pageSize: 'LETTER',
      content: [
        { text: 'RESUMEN DE ASESORIA', style: 'header', alignment: 'center' },
        { lineHeight: 2, text: 'Fecha: ' + new Date().toLocaleDateString('ddMMyyyy'), alignment: 'right', style: 'date' },
        {
          lineHeight: 2, text: [
            { text: 'Nombre: ', style: 'infoHeader' },
            { text: `${this.name}\n`, alignment: 'left', style: 'headerText' },
            { text: 'Edad: ', style: 'infoHeader' },
            { text: `${this.age}\n`, style: 'headerText' },
            { text: 'Talla: ', style: 'infoHeader' },
            { text: `${this.size}\n`, style: 'headerText' },
            { text: 'Peso: ', style: 'infoHeader' },
            { text: `${this.weight}\n`, style: 'headerText' },
            { text: 'Fecha de Nacimiento: ', style: 'infoHeader' },
            { text: `${formattedDate[0]}\n`, style: 'headerText' },
            { text: 'Motivo de Consulta: ', style: 'infoHeader' },
            { text: `${this.reason}\n`, style: 'headerText' },
            { text: `Antecendentes Ginecológicos y Obstétricos\n`, style: 'secondaryHeader', alignment: 'center' },
            { text: 'Embarazo: ', style: 'infoHeader' },
            { text: `${this.pregnant}\n`, style: 'headerText' },
            { text: 'Fecha probable de Parto: ', style: 'infoHeader' },
            { text: `${this.birth}\n`, style: 'headerText' },
            { text: 'Semanas de Embarazo: ', style: 'infoHeader' },
            { text: `${this.pregWeeks}\n`, style: 'headerText' },
            { text: 'Lactancia: ', style: 'infoHeader' },
            { text: `${this.lactancy}\n`, style: 'headerText' },
            { text: 'Menopausia: ', style: 'infoHeader' },
            { text: `${this.menopause}\n`, style: 'headerText' },
            { text: `Estado General\n`, style: 'secondaryHeader', alignment: 'center' },
            { text: 'Enfermedades: ', style: 'infoHeader' },
            { text: `${this.illness}\n`, style: 'headerText' },
            { text: 'Medicamentos: ', style: 'infoHeader' },
            { text: `${this.medication}\n`, style: 'headerText' },
            { text: 'Cirugías: ', style: 'infoHeader' },
            { text: `${this.surgery}\n`, style: 'headerText' },
            { text: 'Alergias: ', style: 'infoHeader' },
            { text: `${this.alergies}\n`, style: 'headerText' },
            { text: 'Listado de Alergias: ', style: 'infoHeader' },
            { text: `${this.alergyReason}\n`, style: 'headerText' },
            { text: `Hábitos y Estilo de Vida\n`, style: 'secondaryHeader', alignment: 'center' },
            { text: 'Ejercicio: ', style: 'infoHeader' },
            { text: `${this.exercise}\n`, style: 'headerText' },
            { text: 'Tipo de Ejercicio: ', style: 'infoHeader' },
            { text: `${this.exerciseType}\n`, style: 'headerText' },
            { text: 'Frecuencia del Ejercicio: ', style: 'infoHeader' },
            { text: `${this.exerciseFreq}\n`, style: 'headerText' },
            { text: 'Duración del Ejercicio: ', style: 'infoHeader' },
            { text: `${this.exerciseTime}\n`, style: 'headerText' },
            { text: 'Consumo de Alcohol: ', style: 'infoHeader' },
            { text: `${this.alcohol}\n`, style: 'headerText' },
            { text: 'Frecuencia de Consumo de Alcohol: ', style: 'infoHeader' },
            { text: `${this.alcoholFreq}\n`, style: 'headerText' },
            { text: 'Consumo de Tabaco: ', style: 'infoHeader' },
            { text: `${this.tobacco}\n`, style: 'headerText' },
            { text: 'Alimentos que no le agraden o no es habitual que consuma: ', style: 'infoHeader' },
            { text: `${this.hatedFood}\n`, style: 'headerText' },
            { text: '¿Realiza su desayuno y comida en casa?: ', style: 'infoHeader' },
            { text: `${this.foodHome}\n`, style: 'headerText' },
            { text: 'E-mail de contacto: ', style: 'infoHeader' },
            { text: `${this.email}\n`, style: 'headerText' }
          ]
        },
      ],

      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        date: {
          fontSize: 13,
          italics: true,
        },
        heading: {
          fontSize: 14,
          bold: true,
        },
        infoHeader: {
          fontSize: 13,
          bold: true,
        },
        secondaryHeader: {
          fontSize: 12.5,
          bold: true,
          italics: true,
        },
        headerText: {
          fontSize: 12,
          italics: true,
        }
      }
    };
    this.pdfObj = pdfMake.createPdf(docDef);
    await loading.dismiss();
  }

  async downloadPdf() {
    this.createPdf();
    const loading = await this.loading.create({
      message: 'Guardando Documento...',
    });
    await loading.present();
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });

        // Guardar en raíz de dispositivo
        this.file.writeFile(this.file.externalRootDirectory, `resumen_${this.name}_1.pdf`, blob, { replace: true }).then( async fileEntry => {
          this.callApi.uploadDoc(this.file.externalRootDirectory + `resumen_${this.name}_1.pdf`, `resumen_${this.name}_1.pdf`);
          await loading.dismiss();
          // Abrir el PDF con el visor nativo de android
          //this.fileOpener.open(this.file.externalRootDirectory + `resumen_${this.name}_1.pdf`, 'application/pdf');
        });
      });
    } else {
      // Descargar si no se está en cordova
      this.pdfObj.download(`resumen_${this.name}_1.pdf`);
    }
    const toast = await this.toastC.create({
      message: `Si desea visualizar el archivo: resumen_${this.name}_1.pdf se encuentra en la raíz del dispositivo, nos pondremos en contacto contigo pronto.`,
      duration: 5500,
    });
    toast.present();
    this.router.navigateByUrl('/login');
  }

}
